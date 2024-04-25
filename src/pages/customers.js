import React from 'react'
import Layout from '../../components/Layout'
import style from "../styles/customers.module.css"
import Link from 'next/link'
import Customer from '../../components/customer'
import { useEffect, useState } from 'react'





const customers = ({customersArray }) => {
    const [customerList, setCustomerList] = useState([])



    useEffect(() => {
        getCustomers();

    },[])



    

    async function getCustomers(){
      const url = `http://localhost:1337/api/customers?populate=*`;

      console.log(url)

  
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
        <h1 className='heading'>Customers list</h1>
        <div className={style.btnNewCustomer}>
               <Link href={'/newCustomer'}>Add new customer</Link>
        </div>

        <div className={style.tableContainer}>
            <table className={style.table}>
                <thead className={style.thead}>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>

                <tbody className={style.tbody}>
                  {customerList?.map(items => (
         
                   
                    <Customer
                    key={items.id}
                    items = {items}
                    />

            
                   
                  ))}
                    
                </tbody>
            </table>
        </div>

 

    </div>
    
   </Layout>
  )
}



export default customers
