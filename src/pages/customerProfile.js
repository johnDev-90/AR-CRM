import React from 'react'
import Layout from '../../components/Layout'
import styles from '../styles/customers.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { formatearDinero } from '@/helpers'
import Spinner from '../../components/spinner'

const customerProfile = () => {
    const [customerName, setCustomerName] = useState('');
    const [CustomerAddress, setAddress] = useState('');
    const [customerTerms, setCustomerTerms] = useState(0);
    const [spinner, setSpinner] = useState(false)
    const [responseStaus, setResponseStatus] = useState(0)
    const [invoicesArray, setInvoicesSarray] = useState([])

    const [balanceOpen, setBalanceOpen] = useState(0)

    const location = useRouter()

console.log(invoicesArray)
   
    

    useEffect(() => {

        if(location.query.id){

            const custId = location.query.id; 

            console.log(location)
            getCustomerByname(custId)
            setSpinner(true)
        }

        if (responseStaus === 200) {
            setSpinner(false)
        }

        
    },[location.query.id])

    useEffect(() => {

        if (invoicesArray) {
            caalculaateOpenBalancce()
            
        }

    },[invoicesArray])
    

    async function getCustomerByname(custId) {
        const url = `http://localhost:1337/api/customers/${custId}`;

   
        try {
            
            const respuesta = await fetch(url);
            const result = await respuesta.json()

            extrasctCustomerInformation(result.data)

            setResponseStatus(respuesta.status)

           
        } catch (error) {
            console.log(error)
        }

        
    }

    function extrasctCustomerInformation(data) {

        if (data) {
            const {name,billingAddress,terms, invoices } = data.attributes;

            setInvoicesSarray(invoices.data)
            
            caalculaateOpenBalancce(invoices.data)
            console.log(terms)
            setCustomerName(name);
            setAddress(billingAddress);
            setCustomerTerms(terms);
            return
        }

        console.log('No hay nada que mostrar')
    }

    function caalculaateOpenBalancce(invoices) {

        const arregloDeTotals = invoices && invoices.map(invoice => {
          return invoice.attributes.charges[1].total  
        })

        const openBalance = arregloDeTotals && arregloDeTotals.reduce((items, counter) => (items + counter),0)
        
        if (openBalance) {
            setBalanceOpen(openBalance)
        }
        
    }
   
  return (
    <Layout>
       
      <div>
      <div className={styles.containerCustomerInfo}>

<div className={styles.custoInformation}>
   <div>
   <p className={styles.name}>{customerName}</p>
    <span>Company</span>
    <p>{customerName}</p>
    <p className={styles.terminos}>Net: {customerTerms}</p>
   </div>

    
    <div className={styles.address}>
        <p className={styles.addressText}>Billing address</p>
        <p>{CustomerAddress}</p>
    </div>

      
    <div className={styles.summary}>
        <h2>Summary</h2>
        <p>Open balance</p>
        <p className={styles.openBalance}>{formatearDinero(balanceOpen)}</p>

        <p>Past due amount</p>
        <p className={styles.pastdue}>{formatearDinero(0)}</p>
    </div>

    
</div>

</div>

{invoicesArray && invoicesArray.map(invoices => {
    const {customerName,dueDate,invoiceNumber,issueDate,total } = invoices.attributes.charges[1]

    console.log(customerName)
    console.log(dueDate)
    console.log(invoiceNumber)
    
})}


      </div>

     
      
      
    </Layout>
  )
}

export default customerProfile
