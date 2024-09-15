import React from 'react'
import Layout from '../../components/Layout'
import { useEffect, useState } from 'react';
import Invoices from './invoices';
import styles from '../styles/aging.module.css'
import { formatearDinero, formatDateToUS } from '@/helpers';
import Link from 'next/link';



const aging = () => {

//   const [invoicesArray, setinvoicesArray] = useState([])
//   const [butkectcurrent, setBuckectCurrent] = useState([])
//   const [butkect1to30days, setBuckect1to30days] = useState([])
//   const [butkect31to60days, setBuckect31to60days] = useState([])
//   const [butkect61to90days, setBuckect61to90days] = useState([])
//   const [butkect90, setBuckect90] = useState([])
//   const [fechaActual, setFecha] = useState('')

//   const [customerList, setCustomerList] =useState([])

//   const [renderArraay, setRenderArray] = useState({})
 

// useEffect(() => {
//   getCustomers()

//   const fecha = new Date()

//   const formatedDate = formatDateToUS(fecha)


//   setFecha(formatedDate)
// },[])

// useEffect(() => {


//   splitbalancesinBuckets()


// },[customerList])

// useEffect(() => {

//   invoiceAging()

// },[invoicesArray])







// async function getCustomers(){
//   const url = `http://localhost:1337/api/invoices`;

//      try {
//        const respuesta = await fetch(url);
//        const list = await respuesta.json();

      
//        setCustomerList(list.data)

     
       
//      } catch (error) {
//        console.log(error)
       
       
//      }

    
//   }




//  function splitbalancesinBuckets() {
  

//   let tempArrayinvoices = []
  
//   for (let index = 0; index < customerList.length; index++) {
//     const element = customerList[index];
//     const name = customerList[index].attributes.charges[1].customerName
//     const dueDate = element.attributes.charges[1].dueDate;
//     const openBalnce = element.attributes.charges[1].openbalance

 

//     if (openBalnce > 0) {
//       const objetoDefacturas = {
//         name,
//         dueDate,
//         openBalnce
        
//       }
//       tempArrayinvoices.push(objetoDefacturas)
//     }

  

    

//   }

//   setinvoicesArray(tempArrayinvoices)
  
//  }

//  const todaysDate = new Date()

//  function daysBetween(date1, date2) {
//   const differenceInTime = date2 - date1;
//   return Math.floor(differenceInTime / (1000 * 3600 * 24)); // Convertir de ms a días
// }

// function invoiceAging() {
//   const todaysDate = new Date(); // La fecha actual
//   let tempCurrent = [];
//   let temp30Days = [];
//   let temp60Days = [];
//   let temp90Days = [];
//   let tempOver90Days = [];

//   const agruparInvoices = invoicesArray.reduce((acc, item) => {
//     const { name, dueDate, openBalnce } = item;
//     console.log(item)


    

//     const fechaVencio = new Date(dueDate);
//     const daysOverdue = daysBetween(fechaVencio, todaysDate); // Función para calcular días entre fechas

//     if (!acc[name]) {
//       acc[name] = {
//         name,
//         current: 0, // Facturas no vencidas
//         '1-30': 0, // Facturas vencidas de 1-30 días
//         '31-60': 0, // Facturas vencidas de 31-60 días
//         '61-90': 0, // Facturas vencidas de 61-90 días
//         '90+': 0, // Facturas vencidas de más de 90 días
//       };
//     }

//     // Clasificar facturas según los días vencidos
//     if (daysOverdue <= 0) {
//       acc[name].current += openBalnce; // Factura no vencida
//     } else if (daysOverdue <= 30) {
//       acc[name]['1-30'] += openBalnce; // Factura vencida de 1 a 30 días
//     } else if (daysOverdue <= 60) {
//       acc[name]['31-60'] += openBalnce; // Factura vencida de 31 a 60 días
//     } else if (daysOverdue <= 90) {
//       acc[name]['61-90'] += openBalnce; // Factura vencida de 61 a 90 días
//     } else {
//       acc[name]['90+'] += openBalnce; // Factura vencida de más de 90 días
//     }

//     return acc;
//   }, {});

//   setRenderArray(agruparInvoices)
// }


// function clasifyInvoices(filteredIvoices) {

//   // filteredIvoices.map(invoice => {
//   //   const {dueDate, name, openBalnce} = invoice
//   // })
  
// }


  

// return (
//   <Layout>
//     <div className={styles.agingContainer}>
//       <div className={styles.subContainer}>
//       <h2>AR aging summary {fechaActual}</h2>
//         <div className={styles.headers}>
          
//           <p>Customers</p>
//           <p>Current</p>
//           <p>1 - 30</p>
//           <p>31 - 60</p>
//           <p>61 - 90</p>
//           <p>90+</p>
//           <p>Total</p>
//         </div>

//        {Object.values(renderArraay).map(items => {
        
       
        
//         const name = renderArraay[items.name].name
//         const current = renderArraay[items.name].current
//         const days30 = renderArraay[items.name]['1-30']
//         const days30To60 = renderArraay[items.name]['31-60']
//         const days361To90 = renderArraay[items.name]['61-90']
//         const days390andAbove = renderArraay[items.name]['90+']
//         const total = current +days30 +days30To60 + days361To90 + days390andAbove

//         return(
//           <div className={styles.dataRow}>
//              <p>{name}</p>
//             <p><Link href={`/agingdetails?data=${encodeURIComponent(name)}`} target='blank'>{formatearDinero(current)}</Link></p>
//             <p>{formatearDinero(days30)}</p>
//             <p>{formatearDinero(days30To60)}</p>
//             <p>{formatearDinero(days361To90)}</p>
//             <p>{formatearDinero(days390andAbove)}</p>
//             <p className={total}>{formatearDinero(total)}</p>
//           </div>
          

          
//         )
        

        
//        })}
//        <div className={styles.totalsRow}>
//              <p>Total</p>
//             <p>{formatearDinero(Object.values(renderArraay).reduce((counter,item)=> counter+item.current,0))}</p>
//             <p>{formatearDinero(Object.values(renderArraay).reduce((counter,item)=> counter+item['1-30'],0))}</p>
//             <p>{formatearDinero(Object.values(renderArraay).reduce((counter,item)=> counter+item['31-60'],0))}</p>
//             <p>{formatearDinero(Object.values(renderArraay).reduce((counter,item)=> counter+item['61-90'],0))}</p>
//             <p>{formatearDinero(Object.values(renderArraay).reduce((counter,item)=> counter+item['90+'],0))}</p>
//             <p>{formatearDinero(
         
//          Object.values(renderArraay).reduce((counter,item)=> counter+item.current,0) +
//          Object.values(renderArraay).reduce((counter,item)=> counter+item['1-30'],0)+
//          Object.values(renderArraay).reduce((counter,item)=> counter+item['31-60'],0) +
//          Object.values(renderArraay).reduce((counter,item)=> counter+item['90+'],0)


//             )}</p>
//           </div>
//       </div>
//     </div>
//   </Layout>
// );
}

export default aging
