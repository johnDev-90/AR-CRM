import React from 'react'
import Layout from '../../components/Layout'
import style from "../styles/customers.module.css"
import Link from 'next/link'
import Customer from '../../components/customer'
import styles from '../styles/inoices.module.css'
import { useEffect, useState } from 'react'





const customers = ({customersArray }) => {
    const [customerList, setCustomerList] = useState([])
    const [invioicesState, setInvoicesState] = useState([])


    let totalLes = 0;

    useEffect(() => {
        getCustomers();
   

    },[])



   
  
   

    

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

     
       
   
      
   

    
  return (
   <Layout
   title={'Customer list'}
   description={'Customers and details'}
   >
    <div className={style.customers}>

    <div className={styles.encabezado}>

  <div className={styles.searchBar}>
    <label>Search</label>
    <input

  
    type="search" placeholder="Customer name" />
    </div>


  <div className={styles.newInvoiceBtn}>

  <Link href={'/newCustomer'}> +New customer</Link>
  </div>

  
</div>


        <div className={style.tableContainer}>
          
                <div className={style.theadCOntainer}>
                   
                        <p>Name</p>
                        <p>Company name</p>
                        <p>Phone</p>
                        <p>Open Balance</p>
                        <p>Action</p>
                    
                </div>

                <div className={style.tbody}>
                  {customerList?.map(items => (
                 

                    <Customer
                    key={items.id}
                    items = {items}
                    url = {items.url}
                 
             
                    />
    
                   
                  ))}
                    
                </div>
            
        </div>

 

    </div>
    
   </Layout>
  )
}



export default customers
