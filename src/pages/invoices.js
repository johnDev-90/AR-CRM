import Link from "next/link";
import Styles from "../styles/customers.module.css";
import Layout from "../../components/Layout";
import styles from "../styles/inoices.module.css";
import { formatearDinero } from "@/helpers";
import DropDown from "../../components/dropDown";
import { Router,useRouter } from "next/router";

import { useEffect, useState } from "react";
import ModalEdit from "../../components/modalEdit";
import PDF from "../../components/PDF";
import { G, PDFDownloadLink } from "@react-pdf/renderer";
import customers from "./customers";
import ModalInvoices from "../../components/modalInvoices";
import Spinner from "../../components/spinner";
import Modal from "../../components/modal";
import Success from "../../components/success,";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";




const Invoices = () => {

  const [arrayloDeFacturas, SetArregloDEfacturas] = useState([]);
  const [invoiceDate, setinvoiceDate] = useState("");
  const [dueDate, setDuedate] = useState("");
  const [totalInvoice, setTotalInvoice] = useState("");
  const [invoiceNumber, setInvNumber] = useState("");
  const [removeDuplicate, setRemoveDuplicate] = useState([]);

  const [invoiceSltatus, setInvoiceStaus] = useState(true);
  const [isHovered, setIshovered] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [objtEdit, setObjEdit] = useState({});

  const [pdf, setPf] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [checkdInvoices, setCheckedInvocies] = useState([]);
 

  const [chekedInvoiceDb, setInvoiceChekc] = useState('')

  const [action, setAction] = useState('')

  const [invoicesFromDB, setInvoicesFromDB] = useState([])

  const [modaWarning, setModalWarnin] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [invoiceToDelete, setInvoiceToDelete] = useState('')
  const [mensaje, setMensaje] = useState('')

  const [spiner, setSpinner] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [responseStatus, setResponseStatus] = useState()
  const [invoiceNumberToDelete, setInvoiceNumberToDelete] = useState('')
  const [mensajeDesuccess, setMesajeSuccess] = useState('')
  const [success, setSuccess] = useState(false)
  const [customerName, setCustomerNAme] = useState('')
  const [invoiceEntered, setInvoiceEntered] = useState('')

  const [paymentDB, setPaymentsFromDb] = useState([])

  const [paidIvnoices, setPaidInvoices] = useState({})
  const [balanceOpen, setBalanceOpen] = useState(0)

  const [customers, sertCustomers] = useState([])
  const [customerID, setCustomerID] = useState('')



  const [custid, setCustId] = useState('')
  const [paidAMount,setPaidAmount] = useState([])
  const [paymentIdDB, setPaymentIDDB] = useState()
  const [objetodeFactura, setObjetodeFactura] = useState({})
  const [invoiceIdDb, setInvoiceIdDB] = useState('')
 
  const [updatedopenBalance, setupdatedOpenalance] = useState(0)
  const [paymentArrays, setArregloDepagos] = useState([])

 

  const [customerList, setCustomerList] = useState([]);


console.log(invoicesFromDB)

 useEffect(() => {

    getPaymentsFromDB()

    
  
 },[])

let arrayPaidinvoices =[];
 useEffect(() => {
 
  paymentDB.map((pagos,index) => {
    if (Object.keys(pagos.attributes.payments[0].invoicesTopay).length) {
       if (!isNaN(+Object.keys(pagos.attributes.payments[0].invoicesTopay))) {
        const objeto = pagos.attributes.payments[0].invoicesTopay
        const invoicePaidId = Number(Object.keys(objeto)[0])
        const value = objeto[invoicePaidId]
        
        const objetoFiltered = {invoicePaidId,value}
        arrayPaidinvoices = [...arrayPaidinvoices, objetoFiltered]
        

        if (arrayPaidinvoices.length) {
          arrayPaidinvoices.map(invoiPaid => {
            
            const {invoicePaidId, value} = invoiPaid;
      
            console.log(invoicesFromDB.map(invoiceDb => {
              if (invoiceDb.id === invoicePaidId ) {
                const invoiTobeeditedId = invoiceDb.id 
                const {charges} = invoiceDb.attributes;
                
             
                let newOpenBalance = invoiceDb.attributes.charges[1].total;
                let statusInvoices = ''
                
                 newOpenBalance -= value

                 if (newOpenBalance > 0 && newOpenBalance< invoiceDb.attributes.charges[1].total) {
                   statusInvoices = 'PARTIAL'
                 }else if (newOpenBalance === 0 && invoiceDb.attributes.charges[1].total > 0) {
                  statusInvoices = 'PAID'
                 }else if (newOpenBalance === invoiceDb.attributes.charges[1].total) {
                  statusInvoices = 'OPEN'
                 }

                 customerList.map(customer => {
                  if (customer.attributes.name === invoiceDb.attributes.charges[1].customerName ) {
                    const customerId = customer.id;
                    setCustomerID(customerId)
                   
                  }
                 } )

                
                
                // const updatedInvoiceObj ={
                //   customerName: invoiceDb.attributes.charges[1].customerName,
                //   dueDate: invoiceDb.attributes.charges[1].dueDate,
                //   invoiceNumber: invoiceDb.attributes.charges[1].invoiceNumber,
                //   invoiceStatus:statusInvoices,
                //   issueDate:invoiceDb.attributes.charges[1].issueDate,
                //   openbalance:newOpenBalance,
                //   total:invoiceDb.attributes.charges[1].total,
                //   type:invoiceDb.attributes.charges[1].type,
                // }
      
                // updateInvoiceAMount(invoiTobeeditedId,invoiceDb,newOpenBalance,statusInvoices)
      
      
              }
            }))
          })
        }
      
       }
    }
  })

  getCustomers()

 },[paymentDB])


 
 
 async function getCustomers(){
  const url = `http://localhost:1337/api/customers?populate=*`;

     try {
       const respuesta = await fetch(url);
       const list = await respuesta.json();

       setCustomerList(list.data);
      console.log(list.data)
   
       
     } catch (error) {
       console.log(error)
       
       
     }
  }
 





 
 async function getPaymentsFromDB() {

  const respuesta = await fetch('http://localhost:1337/api/charges');
  const resultado = await respuesta.json();
  setPaymentsFromDb(resultado.data);
      
  }


  useEffect(() => {

    if (customerName !== '') {
  
      filterByCustomerName()
    }else{
      
      getInvoices();
    }
   
    
   
  }, [customerName]);


 

    
    
 


  useEffect(() => {

      if (action) {
        batActions()
 
      }
  },[action])

  useEffect(() => {

   async function deletAsyn() {



    if (invoiceToDelete && confirmation) {
     setModalWarnin(false)
     setAction('')
     try {
      setSpinner(true)
      const respuesta = await fetch(`http://localhost:1337/api/invoices/${invoiceToDelete.id}`,{
        method:'DELETE',

        
        
       })
       if (respuesta.status) {
        
        setSpinner(false)
        toast.success('Successfully Deleted!',{
          duration:3000,
          style: {
            fontSize: '2rem', 
            padding: '16px', 
          }
          
        })

        setCheckedInvocies([])
       }
       
      
     } catch (error) {
      console.log(error)
      
     }


   
     
    
  
      
      const updatedInvociesArray = invoicesFromDB.filter(invoices => invoices.id !== invoiceToDelete.id)
 
      setInvoicesFromDB(updatedInvociesArray)
 
      setConfirmation(false);
      setInvoiceToDelete({});
      setModalWarnin(false);
     
 
     }else{
       setModalWarnin(false);
   
     }

    
    
   }

   deletAsyn()

   
    deleteAllInvocies()
    setAction(0)
    
    if (confirmation) {
      setSpinner(true)
    }
   
   
},[confirmation])



 
async function  deleteAllInvocies(){
  
  if (confirmation) {
    
    for (let index = 0; index < checkdInvoices.length; index++) {
      const element = checkdInvoices[index];
      
      const respuesta = await fetch(`http://localhost:1337/api/invoices/${element}`,{
        method:'DELETE',
        
       })

       console.log(respuesta)

      if (respuesta.status === 200) {
        
        setSpinner(false)
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 2000);
        setConfirmation(false)
    
        toast.success('Successfully Deleted!')
        
        setCheckedInvocies([])
      }else{
        setSuccess(true)
        setMesajeSuccess(respuesta.statusText)
        setSpinner(false)
        setConfirmation(false)
        setTimeout(() => {
          setSuccess(false)
        }, 2000);
      }
  }
   
    
  }
   
  const filteredInvoices = invoicesFromDB.filter(invoice => !checkdInvoices.includes(invoice.id));
  setInvoicesFromDB(filteredInvoices);
}

  async function batActions(){

    if (action === 'Delete') {
      setModalWarnin(true)
  
       
    }else if (action === 'Voide') {
      console.log('Voideando las facturas seleccionadas', checkdInvoices)
    }else if (action === 'Send') {
      console.log('Enviando las facturas seleccionadas', checkdInvoices)
    }else{
      console.log('NO haciendo nada', checkdInvoices)
    }

 
  }


 // FUNCTION TO GET ALL INOICES FROM DB
  async function getInvoices() {
    const url = `http://localhost:1337/api/invoices`;
    const respuesta = await fetch(url);
    const result = await respuesta.json();


    result.data.sort((a,b) => {
      const dateA = new Date(a.attributes.charges[1].issueDate)
      const dateB = new Date(b.attributes.charges[1].issueDate)
      return dateA - dateB
    })
    setInvoicesFromDB(result.data)
  }

   // FUNCTION TO GET ALL INOICES FROM DB EDN

   //FUNCTION TO DELETE INVOICES INDIVIDUALLY
   function deleteInvoice(invoice) {
    const invoiceNumber = invoice.attributes.charges[1].invoiceNumber
    setInvoiceNumberToDelete(invoiceNumber)
    setInvoiceToDelete(invoice);
    setModalWarnin(true);
    setMensaje('Deseas Eliminar la factura')

 
  }
   

  //FUNCTION TO DELETE INVOICES INDIVIDUALLY END


//FUNCTION TO SELECT ALL INVOICES FROM ONE CHECKBOX

function selecteAllInvoices(e) {

  if (e.target.checked) {
    invoicesFromDB.map( invoices => {
      setCheckedInvocies(prevState => [...prevState,invoices.id])
     })
  }else{
    setCheckedInvocies([])
  }
   
}

//FUNCTION TO SELECT ALL INVOICES FROM ONE CHECKBOX END





function handleChage(e) {
  const invoiceSelected = parseInt(e.target.id);
  const isChecked = e.target.checked;

  if (isChecked) {
    setCheckedInvocies([...checkdInvoices, invoiceSelected]); // Add ID if checked
  } else {
    setCheckedInvocies(checkdInvoices.filter((id) => id !== invoiceSelected)); // Remove ID if unchecked
  }
}


// FILTRAR POR NUMERO DE FACTURA

useEffect(() => {

  if (invoiceEntered) {
    filterByinvoiceNumber()
    
  }else{
    getInvoices()
  }

},[invoiceEntered])



function filterByinvoiceNumber() {

  invoicesFromDB.map(invoices => {

    if (invoices.attributes.charges[1].invoiceNumber === invoiceEntered) {
      
      setInvoicesFromDB([invoices])
  
     return
    }

  })

  

}
 

// FILTRAR POR NUMERO DE FACTURA END


//FITRAL FACTURA POR NOMBRE

function filterByCustomerName() {
  const filteredInvoices = invoicesFromDB.filter(invoices => {
    return invoices.attributes.charges[1].customerName.toLowerCase().includes(customerName.toLowerCase())
  });
  
  setInvoicesFromDB(filteredInvoices.length? filteredInvoices: invoicesFromDB)
  
}



//FITRAL FACTURA POR NOMBRE END







  return (
    <div  >
        <div><Toaster
        position="top-right"
        reverseOrder={false}
        /></div>
      <Layout>
        
        {modalStatus && <Modal
        responseStatus = {responseStatus}
        />}
      
        <div className={styles.contenedorGlobal}>
          {pdf && <PDF />}

          {editMode && (
            <ModalEdit setEditMode={setEditMode} objtEdit={objtEdit} />
          )}

          
         {modaWarning && <ModalInvoices 
         mensaje = {mensaje}
         setModalWarnin = {setModalWarnin}
         setConfirmation = {setConfirmation}
         invoiceNumberToDelete = {invoiceNumberToDelete}
         incoicesChequeados = {checkdInvoices}
         invoicesFromDB = {invoicesFromDB}
         setAction = {setAction}
         />}

    {spiner && <Spinner />}

          <div className={styles.encabezado}>

          <div className={styles.actions}>
              {spiner && <Spinner />}
      
              <select value={action} disabled={!checkdInvoices.length} onChange={(e) => setAction(e.target.value) }>
                <option value={''}>--- Select Action ---</option>
                <option value={'Delete'}>Delete</option>
                <option value={'Voide'}>Voide</option>
                <option value={'Send'}>Send</option>
                 
              </select>
            </div>

            <div className={styles.searchBar}>
              <label>Search</label>
              <input
              value={customerName}
              onChange={(e) => setCustomerNAme(e.target.value.toLocaleLowerCase()) }
              type="search" placeholder="Customer name" />
              </div>

              <div className={styles.searchBar}>
              <label>Find an invoice:</label>
              <input
              onChange={(e) => setInvoiceEntered(e.target.value) }
              type="search" placeholder="Invoice#" />
              </div>
            

            <div className={styles.newInvoiceBtn}>

              <Link href={"/createInvoice"}>+ New Invoice</Link>
            </div>

            
          </div>

          

          <div className={Styles.invoicesContainers}>

       


            <div className={Styles.titles}>
              <input
              
                className={Styles.checkBox}
                type="checkbox"
                onClick={(e) => selecteAllInvoices(e)}
              />
              <p>NO.</p>
              <p>date</p>
              <p>Customer</p>
              <p>amount</p>
              <p>Open balance</p>
              <p>status</p>
              <p>Actions</p>
              
            </div>
          <div className={Styles.contenedorPrimario}>


          
            {invoicesFromDB?.length &&
              invoicesFromDB.map((invoices) => {

                const {customerName,dueDate,invoiceNumber,issueDate,total, openbalance, invoiceStatus } = invoices.attributes.charges[1]

                
               
                return(

                  <div className={styles.contenedorDefacturas} >
                  <div
                
                className={Styles.dataInvoice}
              >
   
                <input
                
                  id={invoices.id}
                  onChange={(e) => handleChage(e)}
                  value={invoices.id}
                  checked={checkdInvoices.includes(
                    invoices.id
                  )}
                  type="checkbox"
                  className={Styles.checkBox}
                ></input>

                <p>{invoiceNumber}</p>
                <p>{issueDate}</p>
                <p>{customerName}</p>
                <span>{formatearDinero(total)}</span>
                <p>{formatearDinero(openbalance)}</p>
                <p>{invoiceStatus}</p>

                <div  className={`${Styles.btnsActions} ${checkdInvoices.length > 1 ? Styles.slideOut : Styles.btnsActions}`}>
                  <div className={Styles.editDivs}>
                    <input
                    
                      className={Styles.edit}
                      type="button"
                      value={"View/Edit"}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </div>

                  <div 
                  disabled={checkdInvoices.length}
                  className={Styles.deleteDivs}>
                    <input
                       disabled={checkdInvoices.length > 1}
                      onClick={(e) => deleteInvoice( invoices)}
                      className={Styles.delete}
                      type="button" 
                      value={"Delete"}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>

                  <div className={Styles.sendDivs}>
                    <PDFDownloadLink
                      document={<PDF />}
                      fileName="invoice.pdf"
                      type="button"
                      value={"Send"}
                    >
                      {({ loading, url, error }) =>
                        loading ? (
                          <button className={Styles.send}>
                            Loading Document...
                          </button>
                        ) : (
                          <button className={Styles.send}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                              />
                            </svg>
                          </button>
                        )
                      }
                    </PDFDownloadLink>
                  </div>
                </div>
              </div>
                </div>
                
                )
})}       </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Invoices;
