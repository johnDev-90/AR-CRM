import Link from "next/link"
import Layout from "../../components/Layout"
import styles from "../styles/inoices.module.css"


const invoices = () => {
  return (
   <div>
     <Layout>
      <div>

         <h1>invoices</h1>

          <div className={styles.encabezado}>
            <div >
              <input className={styles.input} type="search" placeholder="Customer lookup" />
            </div>

            <div className={styles.newInvoiceBtn}>
  
             <Link href={'/createInvoice'}>New Invoice</Link>
              
            </div>
           
          </div>

      </div>
    </Layout>
   </div>
  )
}

export default invoices

