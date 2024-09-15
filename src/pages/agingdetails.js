import React from 'react'
import {Router, useRouter} from 'next/router'
import { useEffect,useState } from 'react'
import styles from '../styles/aging.module.css'
import { formatearDinero } from '@/helpers'



const agingdetails = () => {


//     const [invoicesFromDb, setInvoicesFromDB] =useState([])
//     const [updatedInvoiceArray, setupdatedInvoiceArray] =  useState([])

//     const router = useRouter()
// const {data} = router.query 

// useEffect(() => {
//     getInvoices()
// },[])

// useEffect(() => {

//     filerByage()

// },[invoicesFromDb])

// const totdaysDay = new Date()





// function daysBetween(date1, date2) {
//     const differenceInTime = date2 - date1;
//     return Math.floor(differenceInTime / (1000 * 3600 * 24)); // Convertir de ms a días
//   }


// async function getInvoices() {
//     const url = `http://localhost:1337/api/invoices`;
//     const respuesta = await fetch(url);
//     const result = await respuesta.json();


//     result.data.sort((a,b) => {
//       const dateA = new Date(a.attributes.charges[1].dueDate)
//       const dateB = new Date(b.attributes.charges[1].dueDate)
//       return  dateA - dateB 
//     })
//     setInvoicesFromDB(result.data)
//   }

//   function filerByage() {
//     const filteredInvoices = invoicesFromDb.map(invoice => {
//       // Check if charges exist and has at least two elements
//       if (invoice.attributes.charges && invoice.attributes.charges.length > 1) {
//         if (invoice.attributes.charges[1].openbalance > 0) {
//           const dueDate = invoice.attributes.charges[1].dueDate;
//           const fechaVencio = new Date(dueDate);
//           const dasyPastDue = daysBetween(fechaVencio, totdaysDay);
//           invoice.attributes.charges[1].days = dasyPastDue;
//           return invoice;
//         }
//       }
//       return null; // Return null if the conditions are not met
//     }).filter(invoice => invoice !== null); // Remove null values from the array
  
//     setupdatedInvoiceArray(filteredInvoices);
//   }

  



//   return (
//     <div className={styles.agingContainer}>
//     <div className={styles.subContainer2}>
//     <h2>AR aging Details as of:</h2>
//       <div className={styles.headersDetails}>
        
        
//         <p>Invoice Date</p>
//         <p>Transaction type</p>
//         <p>Num</p>
//         <p>Customer</p>
//         <p>Due Date</p>
//         <p>Amount</p>
//         <p>Open Balance</p>
//         <p>Past Due</p>
//       </div>

//       {updatedInvoiceArray && updatedInvoiceArray.length > 0 ? (
//   updatedInvoiceArray.map((invoices, index) => {
//     // Check if charges exist and has at least two elements
//     if (invoices.attributes.charges && invoices.attributes.charges.length > 1) {
//       const { issueDate, type, invoiceNumber, dueDate, total, openbalance, days, customerName } = invoices.attributes.charges[1];
//       return (
//         <div key={index} className={styles.dataRow2}>
//           <p>{issueDate}</p>
//           <p>{type}</p>
//           <p>{invoiceNumber}</p>
//           <p>{customerName}</p>
//           <p>{dueDate}</p>
//           <p>{formatearDinero(total)}</p>
//           <p>{formatearDinero(openbalance)}</p>
//           <p>{days}</p>
//         </div>
//       );
//     }
//     return null; // Return null if charges[1] does not exist
//   })
// ) : (
//   <p>No hay facturas disponibles.</p>
// )}


    
//     </div>
//   </div>
//   )
}

export default agingdetails
