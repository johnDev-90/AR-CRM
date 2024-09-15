import React from 'react'


import styles from '../styles/payments.module.css';
import Link from 'next/link';
import { formatearDinero } from '@/helpers';
import { useEffect, useState } from 'react';

import {Router,useRouter} from 'next/router';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Modal from '../../components/modal';
import Spinner from '../../components/spinner';
import { actualizarInvoices } from '@/helpers';




const PaymentEdit = ({ setMakeApayment, makeApayment, setTogglemenu }) => {


    const route = useRouter()
  const [customers, setCustomers] = useState([])
  const [invocices, setInvoices] = useState([])
  const [customerSelected, setCustomerSelected] = useState('')
  const [filetredInvoices, setFilteredinvoices] = useState([])
  const [total, setTotal] = useState(0)

  const [customerName, setCustomerNAme] = useState('')
  const [TransactionType, setTransactionType] = useState('')
  const [dateReceived, setDateReceived] = useState('')
  const [referenceNumber, setReferenceNumber] = useState('')
  let [paymentAMount, setPaymentAmount] = useState(0)
  const [invoicesTopay, setInvoicesTopay] = useState([])
  const [error, setError] = useState(false)
  const [spinner, setSpinner] = useState(false)

  const [checkedInvoices, setSelectedInvoices] = useState([])
  const [checkedInvoices2, setSelectedInvoices2] = useState([])

  const [invObjeto, setInvObjeto] = useState([])
  const [credit, setCredit] = useState(0)
  const [applied, setAppplied] = useState(0)
  const [openBalnace, setOpenBalance] = useState(0)
  const [remaining, setRemainingAmount] = useState(0)

  const [appliedPayments, setAppliedPayments] = useState({});
  const [modalConfirmation, setModalConfirmation] = useState(false)
  const [confirmation, setConfirmation] = useState(false)

  const [idToEdit, setIdToDelete] = useState('')

  const [paymentDb, setPaymentDb] = useState({})
  const [idToeit, setIddToEdit] = useState('')
  const [paymentToEdit, setPaymentToEdit] = useState({})


console.log(appliedPayments)

useEffect(() => {
    const paymentID = Object.keys(route.query).find(id => id)
    setIddToEdit(paymentID)
  
    obtenerClientes()

    getPaymentDb(paymentID)
    obtenerInvoices()
    

  },[])




async function getPaymentDb(paymentID) {

    const url = `http://localhost:1337/api/charges/${paymentID}`;

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        if (resultado.data.attributes.payments[0]) {
            setPaymentDb(resultado.data.attributes.payments[0])

            
        }


    } catch (error) {
        console.log(error)
    }



  }


  useEffect(() => {

    
    if (paymentDb) {
        
        
        invociesByCustomers()
       
        setCustomerSelected(paymentDb.name)
        setTransactionType(paymentDb.type)
        setDateReceived(paymentDb.dateReceived)
        setReferenceNumber(paymentDb.refence)
        setPaymentAmount(paymentDb.amount)
        

      if (paymentDb.invoicesTopay) {
        distributePayment()
        setAppliedPayments(paymentDb.invoicesTopay);
        Object.keys(paymentDb.invoicesTopay).find(invoiceId => {
          
            setSelectedInvoices2(prevState => [...prevState,+invoiceId])
           })
      }

    }

    
    // setAppliedPayments
    
  },[paymentDb])




  useEffect(() => {
    
    setCustomerNAme(customerSelected)
    if (customerSelected) {

      console.log(customerSelected)
      
        
        invociesByCustomers()

    }
  },[customerSelected])

// Show customers name in the dropdown menu

async function obtenerClientes() {
    const url = "http://localhost:1337/api/customers";

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    setCustomers(resultado.data);
  }

  // Show customers name in the dropdown menu end

  // Get Data entered by the user
  async function obtenerInvoices() {
    setSpinner(true)
    const url = "http://localhost:1337/api/invoices";

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    if (respuesta.status === 200) {
      setSpinner(false)
      setInvoices(resultado.data);
      
    }
    
  }

   // Get Data entered by the user

   // filter invoices by customer
   function invociesByCustomers() {
    const arrayInvoicesByCustomers = invocices && invocices.filter(invoice => {
         if (invoice.attributes.charges[1].customerName === customerSelected) {
            return invoice
         }

    })

   arrayInvoicesByCustomers.sort((a,b) => {
    const dateA = new Date(a.attributes.charges[1].issueDate )
    const dateB = new Date(b.attributes.charges[1].issueDate )
    return dateA - dateB
   })



    setFilteredinvoices(arrayInvoicesByCustomers)

   }
   // filter invoices by customer

   //Get total per customers



   useEffect(() => {
    function totalByCustomers() {

       if (filetredInvoices.length) {
        const totalArray = filetredInvoices.map((invoices) => invoices.attributes.charges[1].total)
        const totalPerCustomers = totalArray.reduce((amount, counter) => amount + counter, 0 )
        setTotal(totalPerCustomers);


       }
    }

       totalByCustomers()



   },[filetredInvoices])




 function selecAllinvoices(e) {

  if (e.target.checked) {
     const selectedInvoices = filetredInvoices.map(invoices => invoices)
     const selectedInvoices2 = filetredInvoices.map(invoices => invoices.id)


     setSelectedInvoices2(selectedInvoices2)
     setSelectedInvoices(selectedInvoices)



  }else{
    setSelectedInvoices([])
    setSelectedInvoices2([])
    setAppliedPayments({});


  }

 }


 function selectSingleInvoices(e,invoiceObj) {
  const idSelected = +e.target.value

  if (e.target.checked) {

    setSelectedInvoices([...checkedInvoices,invoiceObj])
    setSelectedInvoices2([...checkedInvoices2,invoiceObj.id])
  }else{

    setSelectedInvoices(checkedInvoices.filter(invoice => invoice.id !== idSelected))
    setSelectedInvoices2(checkedInvoices2.filter(invoice => invoice !== idSelected))

    const newAppliedPayments = { ...appliedPayments };
    delete newAppliedPayments[idSelected];
    setAppliedPayments(newAppliedPayments);


  }
 }



 useEffect(() => {
     distributePayment()

 },[checkedInvoices])

 let remainingBalance = Number(paymentAMount)

 let invoiceAmpount = 0
 let arreglodePago = []



 function distributePayment() {
  const newAppliedPayments = { ...appliedPayments };
  checkedInvoices.forEach(invoice => {

    if (Number(paymentAMount) < 0) {
      return

    }

    invoiceAmpount = invoice.attributes.charges[1].total;
    const amountApplied = Math.min(invoiceAmpount, paymentAMount)
    paymentAMount -= amountApplied
   
     newAppliedPayments[invoice.id] = amountApplied




  })




  setAppliedPayments(newAppliedPayments)
  calculatElTotalaplicado(newAppliedPayments)

 }



 function calculatElTotalaplicado(appliedPaymentsObj = appliedPayments) {

const cargos = Object.values(appliedPaymentsObj)
const totalAplicado = cargos.reduce((invoice,counter) => invoice + counter,0)
setAppplied(totalAplicado)

if (applied > paymentAMount) {
  console.log('La suma de las facturas seleccionadas es mayor al pago recibido...')
  return
}


 }

 useEffect(() => {
  
  if (confirmation === true) {
    
    setSpinner(true)
    submitPayment()
   

  }


 },[confirmation])



 const [custid, setCustId] = useState('')
 let [paidAMount,setPaidAmount] = useState(0)
 const [paymentIdDB, setPaymentIDDB] = useState()
 const [objetodeFactura, setObjetodeFactura] = useState({})
 const [invoiceIdDb, setInvoiceIdDB] = useState('')

 const [updatedopenBalance, setupdatedOpenalance] = useState(0)
 



useEffect(() => {
  for(let i = 0; i <= Object.keys(appliedPayments).length; i++ ){
    const idpaid = +Object.keys(appliedPayments)[i]
    
    
    filetredInvoices.map(invoices => {
     if (invoices.id === idpaid) {
      setPaymentIDDB(idpaid)
      setInvoiceIdDB(invoices.id)
      setObjetodeFactura(invoices)
      setPaidAmount(appliedPayments[invoices.id])
       if (invoices.attributes.charges[1]) {
         customers.map(customer => {
             if (customer.attributes.name === invoices.attributes.charges[1].customerName ) {
              setCustId(customer.id)
             }
         })
         
       }
     }
    })
  
 }

 
},[appliedPayments])

useEffect(() =>{
  if (objetodeFactura && objetodeFactura.attributes && objetodeFactura.attributes.charges.length > 1) {


   
    if ( updatedopenBalance > 0 && updatedopenBalance < objetodeFactura.attributes.charges[1].total ) {
      objetodeFactura.attributes.charges[1].invoiceStatus = 'PARTIAL'
    }else if (updatedopenBalance === objetodeFactura.attributes.charges[1].total) {
      objetodeFactura.attributes.charges[1].invoiceStatus = 'OPEN'
    }else if(updatedopenBalance === 0){
      objetodeFactura.attributes.charges[1].invoiceStatus = 'PAID'
    }
    return
  } 

},[objetodeFactura])





 async function submitPayment() {


  setModalConfirmation(true)
  
  const respuesta = await fetch(`http://localhost:1337/api/charges/${idToeit}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        payments: [
        {
        name:customerName,
        type:TransactionType,
        dateReceived:dateReceived,
        refence:referenceNumber,
        amount:paymentAMount,
        invoicesTopay:appliedPayments,
        unnapplied:applied - paymentAMount
        }

        ],
      },
    }),
  });


       console.log(respuesta.status)
   if (respuesta.status === 200) {
    actualizarInvoices()
         setSpinner(false)
          toast.success(`Changes saved ${formatearDinero(paymentAMount)}`,{
            duration: 3000,
            style: {
              fontSize: '2rem',
                  padding: '16px',
      }
         })


      setCustomerNAme('')
      setTransactionType('')
      setDateReceived('')
      setReferenceNumber('')
      setPaymentAmount('')
      setCustomerSelected('')
      setFilteredinvoices('')

      setTimeout(() => {
        route.push('/moneyReceived');
      }, 3000);


   }

 }



    function handleSubmit(e){
    e.preventDefault()


    const inputs = {customerName,TransactionType,dateReceived,referenceNumber,paymentAMount}



   if (!Object.values(inputs).includes('')) {

    if (!checkedInvoices2.length) {
      setModalConfirmation(true)


    }else{
      submitPayment()
      setModalConfirmation(false)
    }


   }else{
    toast.error(`All fields are mandatories`,{
      duration: 3000,
      style: {
        fontSize: '2rem',
        padding: '16px',
        fontWeight: 'bold',
      }
    })
   }




   }

  return (
        <div>
          {spinner && <Spinner />}
         {modalConfirmation && <Modal
         setModalConfirmation = {setModalConfirmation}
         setConfirmation={setConfirmation}
         mensaje={`You didn't select any invoice, this will generate a credit to this account for ${formatearDinero(paymentAMount)}`}
         /> }


           <Toaster />

          <div className={styles.closeBtnDiv}>
             <h2>Edit payment</h2>
           <p><Link href={'/moneyReceived'}>X</Link></p>
          </div>

          <form onSubmit={(e) => handleSubmit(e)} className={styles.formulario}>

             <div className={styles.contendor1}>
                 <div className={styles.selectInput}>
                    <select
                    value={customerName}
                    onChange={(e) => setCustomerSelected(e.target.value)}>
                        <option>--Customer--</option>
                        <option>
                            <Link href={'#'}>Add new customer</Link>
                        </option>
                        {customers && customers.map(customer => (
                            <option key={customer.id} id={customer.id}>{customer.attributes.name}</option>
                        ))}
                    </select>

                    <select
                    id='selectInput'

                    value={TransactionType}
                    onChange={(e) => setTransactionType(e.target.value)}>
                        <option>Transaction type</option>
                        <option>ACH</option>
                        <option>Wire transfer</option>
                        <option>Check</option>
                        <option>Cash</option>
                    </select>

                    <div className={styles.dateinput}>
                    <label>Date Received</label>
                    <input
                    value={dateReceived}
                    onChange={(e) => setDateReceived(e.target.value)}
                    type='date'></input>
                    </div>

                    <div
                    className={styles.dateinput}>
                    <label>Reference number</label>
                    <input
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    type='text' placeholder='Reference number'></input>
                    </div>

                 </div>

                 <div className={styles.section2}>
                      <div className={styles.inputSection2}>
                          <div>
                          <p>{formatearDinero(paymentAMount)}</p>
                          <span>Customer balance: {formatearDinero(total)}</span>
                          </div>
                          <div className={styles.paymentInput}>
                            <label>Payment amount</label>
                          <input
                          value={paymentAMount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          type='number'></input>
                          </div>
                      </div>
                 </div>

             </div>

             <div className={styles.btnsPayment}>
                   <div className={styles.submitBtn}>
                    <input type='submit' value={'Save changes'}/>
                    </div>
                    <div className={styles.clearBtn}>
                    <input type='button' value={'Cancel'}/>
                    </div>

                   </div>

          </form>

          <section className={styles.invoicesSection}>
            <div className={styles.invociesContainers}>
                <div className={styles.invoicesContainer}>

                  <div className={styles.invoicesHeader}>
                  <div className={styles.checkBoxDiv}>
                    <input
                    onChange={(e) => selecAllinvoices(e)}
                    checked={checkedInvoices2.length>1?true:false}
                    className={styles.check} type='checkBox'></input>
                    </div>
                    <p>NO.</p>
                    <p>Issue date</p>
                    <p>Due date</p>
                    <p>Amount</p>
                    <p>Open balance</p>
                    <p>Payment</p>
                   </div>

                    {filetredInvoices.length? (filetredInvoices.map(invoices => (

                         <div key={invoices.id} id={invoices.id} className={styles.invoicesData}>
                         <div className={styles.checkBoxDiv}>
                         <input

                         value={invoices.id}
                         checked={checkedInvoices2.includes(invoices.id)}
                         onChange={(e) => selectSingleInvoices(e,invoices)}
                        className={styles.check} type='checkBox'></input>
                         </div>
                         <p>{invoices.attributes.charges[1].invoiceNumber}</p>
                         <p>{invoices.attributes.charges[1].issueDate}</p>
                         <p>{invoices.attributes.charges[1].dueDate}</p>
                         <p>{formatearDinero(invoices.attributes.charges[1].total)}</p>

                         <p>{formatearDinero(invoices.attributes.charges[1].total)}</p>
                         <input
                           id={invoices.id}

                          value={appliedPayments[invoices.id] || ''}
                         className={styles.paymentAmount} type='number'></input>

                        </div>

                    ))):(
                        <p className={styles.invoicesNotfound}>There are no invoices to display for the selected customer.</p>
                    )}
                    <div className={ `${paymentAMount <= 0? styles.hide: styles.paymentFooter}`}>

                        <div className={styles.creditamount}>
                          <div className={styles.appliedP}>
                          <p>Applied:</p><span> {formatearDinero(applied)}</span>
                          </div>

                          <div className={styles.creditP}>
                          <p>{credit > 0? 'Under payment':'Credit'}:</p><span> {formatearDinero(applied - paymentAMount)}</span>
                          </div>

                          </div>

                    </div>


                </div>

            </div>
          </section>
        </div>
      );
};

export default PaymentEdit;
