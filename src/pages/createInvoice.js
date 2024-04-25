import Layout from "../../components/Layout";
import styles from "../styles/newInvoice.module.css"
import { FaRegFilePdf } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import TrTags from "../../components/trTags";
import { v4 as uuidv4 } from 'uuid';
import { generarNumeroFactura, calcularFechaVencimiento } from "@/helpers";
import Errores from "../../components/error";
import CustomAlert from "../../components/alert";
import Modal from "../../components/modal";
import Spinner from "../../components/spinner";







const CreateInvoice = () => {
    const [customers, setCustomers] = useState([])
    const [customerSelected, setSelected] = useState('---Select---')
  
    const [custObj, setCustObj] = useState([])
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [terms, setTerms] = useState(0)
    const [issueDate, setIssueDate] = useState('MM/DD/YY')
    const [dueDate, setDueDate] = useState('MM/DD/YY')
    const [newLine, setNewLine] = useState([])
    const [id, setId] = useState()

   

  
    const [contador, setContador] = useState(1)
    const [chargesArray, setArrayCharges] = useState([])
    const [chargesObjets, setChargesObjets] = useState({})
    const [totalBilled, setTotalBilled] = useState(0)


    const [chargesDetailsstate, setChargesDetails] = useState([])
    const [getnewChargesArray, steNewChargesArray] = useState([])
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [responseStatus, setResponseStatus] = useState(false)

    const [error, setError] = useState(false)
    const [errorMessage, setErroMessage] = useState('')

    const [issueDudateEmpty, setIssueDudateEmpty] = useState(false)
    const [quantityisEmpty, setQuantityisEmpty] = useState(false)
    const [descriptionEmpty, setDescriptionEmpty] = useState(false)
    const [amountEmpty, setAmountEmpty] = useState(false)

    const [modal, setModal] = useState(false);
    const [spinner, setSpinner] = useState(false)




    const [newID, setNEwID] = useState(0)
    

  const CustomerID = uuidv4()
   
  const inviceNumber = generarNumeroFactura()



useEffect(() =>{

  saveInvoices();


},[chargesArray, issueDate, dueDate])


    useEffect(() =>{
      obtenerID()
      
      
    },[customerSelected])

    useEffect(() => {
      setInvoiceNumber(inviceNumber);
    },[customerSelected])

    useEffect(() =>{
      obtenerClientes()
    
      validarSubmit()
      
    
    },[customerSelected])

    useEffect(() =>{
      setNewLine([...newLine, contador])
    

      console.log(contador)
    
    },[contador])

    useEffect(() => {
      calcularFechaVencimiento(issueDate, terms);

    }, [issueDate,terms, dueDate]);
    

  

    function validarSubmit(){
      if (customerSelected === '---Select---') {

        setCustObj({});
        setName('');
        setAddress('');
        setEmail('');
        setTerms(0);
     
        return
        
      }

    }

    const resetFormFields = () => {
      setSelected('---Select---');
      setCustObj({});
      setName('');
      setAddress('');
      setEmail('');
      setTerms(0);
      setIssueDate('MM/DD/YY');
      setDueDate('MM/DD/YY');
     
      setId('');
      setContador(0)
      setArrayCharges([]);
      setTotalBilled(0);
 
      setNewLine([])
      setInvoiceNumber('')
  };

  function validawrCaposdelForm() {

    if (Object.values(custObj).includes('')) {

      console.log('todos los campos son obligatorios')
      
    }
    
  }

     function calcularFechaVencimiento(issueDate, terms) {
      // Convierte la cadena de fecha a objeto Date
      const fechaFactura = new Date(issueDate);
  
      // Copia la fecha de la factura para no modificarla directamente
      const fechaVencimiento = new Date(fechaFactura);
  
      // Agrega los días de términos a la fecha de vencimiento
      fechaVencimiento.setDate(fechaVencimiento.getDate() + terms);
  
      // Formatea la fecha de vencimiento como una cadena "YYYY-MM-DD"
      const year = fechaVencimiento.getFullYear();
      const month = String(fechaVencimiento.getMonth() + 1).padStart(2, '0');
      const day = String(fechaVencimiento.getDate()).padStart(2, '0');
      const fechaVencimientoFormateada = `${year}-${month}-${day}`;
      console.log(fechaVencimientoFormateada)
      setDueDate(fechaVencimientoFormateada) 
  }


  
    function obtenerID() {
      if (customerSelected && customerSelected !== 'Select') {
          const customerID = customers.find(customer => customer.attributes && customer.attributes.name === customerSelected);
          if (customerID) {
              crearObjetoDeclientes(customerID);
          } else {
              console.log('Cliente no encontrado');
          }
      } else {
          console.log('Cliente no seleccionado');
      }
  }

      function crearObjetoDeclientes(customerID){

   
       
        const {name, billingAddress, email, terms, phone,} = customerID.attributes;
        setName(name)
        setEmail(email)
        setAddress(billingAddress)
        setTerms(terms)
        setId(customerID.id)
        setCustObj(customerID.attributes)

      }



    function incrementar() {

      setContador(contador +1)
      
    }

    function decrease() {
      const contActulzado = contador -1
      setContador(contActulzado)
      
      
    }

   

    async function obtenerClientes(){

      const url = 'http://localhost:1337/api/customers'
      
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setCustomers(resultado.data)
      
      
      
    }

    



    function saveInvoices() {

      const newChargesArray = chargesArray.filter(charges => {
        if (charges.amount === 0 || charges.subTotal === 0) {
          setNEwID(charges.id)
         return
         
        }


        return charges
    })

     
     

    setCustObj({
      invoiceNumber: invoiceNumber,
       name, 
       address, 
       email, 
       terms, 
       issueDate:issueDate,
       dueDate:dueDate,
       chargesDetails:newChargesArray
  
       
      })

    if (newChargesArray.length) {
     const totalInvoice = newChargesArray.reduce((acumulador, charges) => {
       return acumulador + charges.subTotal
     },0)

     setTotalBilled(totalInvoice);
     
    }
     


    }

 
   
   
    async function handleSubmit(e){
      e.preventDefault()

      

      const {chargesDetails, name, address, terms } = custObj

      if (chargesDetails === undefined || chargesDetails.length === 0) {
         
        setErroMessage('All fields in the Invoice Details section are mandatory.')
        setError(true)

        setDescriptionEmpty(true)
        
        setTimeout(() => {
          setError(false)
        }, 3000);
        
      }else if (issueDate === 'MM/DD/YY') {
        setErroMessage('Issue Date no puede estar vacio')
        setIssueDudateEmpty(true)
        setError(true)

        setTimeout(() => {
          setError(false)
        }, 4000);

         
      }else{
        setSpinner(true)
          
        const respuesta = await fetch(`http://localhost:1337/api/invoices`,{
            
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             
            data:  {
              
              customer:id,
    
              charges: [
                
                chargesDetails,
                {
                  issueDate:issueDate,
                  dueDate: dueDate,
                  total:totalBilled,
                  invoiceNumber:invoiceNumber
                }
              ],
              
              
                }

                
  
          } )
        
          
        })
     
        setSpinner(false)
        setResponseStatus(respuesta.status)
        finishedProcessed()
    
      }
    
     
    }

    function finishedProcessed(){
      resetFormFields();
      setIssueDudateEmpty(false)
      setDescriptionEmpty(false)

      setModal(true)

      setTimeout(() => {
        setModal(false)
      }, 3000);
    }

   return (
    <div>
    
        <Layout>
        
       <div className={styles.grid_1}>
       {error && <CustomAlert
         errorMessage = {errorMessage}
    
       />}
       {modal && <Modal
       responseStatus = {responseStatus}
       setSpinner = {setSpinner}
 
       />}
       {spinner && <Spinner />}
          <div className={styles.contenido_left}>
            
              <p className={styles.inviceNumnber}>Invoice Number <span className={styles.number}>{customerSelected === '---Select---' ? '': invoiceNumber}</span></p>
            <div className={styles.pdf}>
            <div className={styles.border1}>
            <FaRegFilePdf
            size={40}
            color="#6680a1"
            
            /> 
            </div>

          <div  className={styles.border2}>
          <MdEmail
            size={40}
            color="#6680a1"
            
            />
            <span className={styles.send}>Send</span>
          </div>
            </div>

        
          </div>

          <div className={styles.contenido_right}>
           
        

           <div className={styles.contenedorSelect}>
           <label className={styles.label}>Customers</label>
              <select value={customerSelected} onChange={(e)=> setSelected(e.target.value) }  className={styles.select}>
               <option >---Select---</option> 
               {customers?.map(clientes => {

                  return(
                  <option >{clientes.attributes.name}</option>
                )
                })}
              </select>
           </div>

           <div className={styles.btnContainer}>
           <button className={styles.btnCancel}>Cancel</button>
           </div>
             
        
          </div>

          <form type='submit' onSubmit={ (e) => handleSubmit(e)} className={styles.form}>
              <h2 className={styles.details}>Customer Information</h2>
            <div className={styles.cajasContainer}>

                <div className={styles.caja1} >
                   <div className={styles.divInput}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <input value={name}  type="text" placeholder="Name"></input>
                   </div>

                   <div className={styles.divInput}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                   
                    <input value={address}  type="text" placeholder="Billing Address"></input>
                   </div>

                   <div className={styles.divInput}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>

                    <input value={email}  type="text" placeholder="Email address"></input>
                   </div>
                </div>

                <div className={styles.caja2} >
                   <div className={styles.divInput2}>
                   <label>Invoice Date</label>
                   <input type="date"
                    className={`${issueDudateEmpty === true ? styles.redBorder : ''}`}
                   onChange={(e) =>  setIssueDate(e.target.value)}
                   value={issueDate}
                   ></input>
                   
                   </div>
                   <div className={styles.divInput2}>
                   <label>Due Date</label>
                   <input type="date" value={terms === 0? '': dueDate}></input>
                   </div>
                   <div className={styles.divInput2}>
                   <label>Order Number</label>
                   <input type="text"></input>
                   </div>
                </div>
                <h2 className={styles.details}>Invoice Details</h2>
              <div className={`${styles.caja3} ${descriptionEmpty ===true ? styles.redBorder2: ''}`}>
                   
                   <table className={styles.table}>
                       <thead>
                           <tr>
                              <th><label className={styles.labels}>QTY</label></th>
                              <th><label className={styles.labels}>Description</label></th>
                              <th><label className={styles.labels}>Amount</label></th>
                              <th><label className={styles.labels}>Subtotal</label></th>
                           </tr>
                       </thead>
                       <tbody>

                     
      
                       {newLine.map((items) => (

                        
                        <TrTags
               
                        setChargesObjets = {setChargesObjets}
                        setArrayCharges = {setArrayCharges}
                        chargesArray = {chargesArray}
                        chargesObjets = {chargesObjets}
                        newLine = {newLine}
                        contador = {contador}
                        setContador = {setContador}
                        decrease = {decrease}
                        chargesDetailsstate = {chargesDetailsstate}
                        totalBilled = {totalBilled}
                        responseStatus = {responseStatus}
                        setError = {setError}
                        error = {error}

                        
         
                        
                     
                        />
                    ))}
                            
                    
     
                       </tbody>

                       
                      
                   </table>

                   
              </div>
               
              
               <div className={styles.btnContaner}>
               <input type="submit" className={customerSelected === '---Select---' ? styles.buttonDisabled : styles.btnInvoice} value="Submit" />

               <button
               onClick={(e) => incrementar()}
               type="button" className={styles.btnInvoice}>Add new item</button>
               </div>

            </div>
           
          </form>

        
        
       </div>

        </Layout>
      
    </div>
  )
}





export default CreateInvoice;
