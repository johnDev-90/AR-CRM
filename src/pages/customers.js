import React from 'react'
import Layout from '../../components/Layout'
import style from "../styles/customers.module.css"
import Link from 'next/link'

const customers = ({customersArray}) => {

    console.log(customersArray)
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
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Customer since</th>
                        <th>Address</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className={style.tr}>
                        <td>Prime global solutions, inc</td>
                        <td>ar@pgs360.com</td> 
                        <td>287-258-2023</td>
                        <td>16/3/2019</td>
                        <td>Mejicanos, Sansalvador</td>
                    </tr>
                    <tr className={style.tr}>
                        <td>Prime global solutions, inc</td>
                        <td>ar@pgs360.com</td> 
                        <td>287-258-2023</td>
                        <td>16/3/2019</td>
                        <td>Mejicanos, Sansalvador</td>

                    </tr>
                </tbody>
            </table>
        </div>

 

    </div>
    
   </Layout>
  )
}

export default customers
