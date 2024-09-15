import Link from "next/link"
import styles from "../src/styles/header.module.css"
import Image from "next/image"
import logo from '../public/favicon.ico'
import { useRouter } from "next/router"
import { useState } from "react"
import Payments from "./payments"
import Styles from '../src/styles/payments.module.css'


const Header = () => {
  const [toggleMenu, setTogglemenu] = useState(false)
  const [makeApayment, setMakeApayment] = useState(false)




    const router = useRouter()

    function showButton() {
     setTogglemenu(true)

     if (toggleMenu) {

      setTogglemenu(false)
      return
      
     }
      
    }

    function showPaymentModal() {
      setMakeApayment(true)
 
      if (makeApayment) {
 
        setMakeApayment(false)
       return
       
      }
       
     }


  return (




<header className={styles.header}>
{makeApayment && <Payments
setTogglemenu = {setTogglemenu}
setMakeApayment = {setMakeApayment}
makeApayment={makeApayment}
/>}
<ul className={ `${styles.ul} ${toggleMenu? styles.showMenu: styles.hiddeMenu}`}>
  <p onClick={(e) => setTogglemenu(false)} className={styles.closes}>X</p>
  <Link
   className={styles.resetAll} href={"/createInvoice"}><li>Invoice</li></Link>
  <Link
  onClick={(e) => showPaymentModal()}
  className={styles.resetAll} href={"#"}><li>Payment</li></Link>
  <Link className={styles.resetAll} href={"/createInvoice"}><li>Credit memo</li></Link>
  <Link className={styles.resetAll} href={'/newCustomer'}><li>Add new customer</li></Link>
  
 </ul>

    {/* <div className={styles.logo}>
    <Image src={logo} width={100} height={100} alt="Logo"  />
    </div> */}
 
 <nav className={styles.menu}>
  
 <input
 onClick={(e) => showButton(e)}
 className={styles.newButton} type="button" value={'+ New'}/>
 
  <Link className={router.pathname === '/'? styles.hover: ''} href={'/'} >Dashboard</Link>
  <Link className={router.pathname === '/aging'? styles.hover: ''} href={'/aging'} >Aging report</Link>
  <Link className={router.pathname === '/customers'? styles.hover: ''} href={'/customers'} >Customers</Link>
  <Link className={router.pathname === '/invoices'? styles.hover: ''} href={'/invoices'} >Invoices</Link>
  <Link className={router.pathname === '/moneyReceived'? styles.hover: ''} href={'/moneyReceived'} >Sales</Link>
  <Link className={router.pathname === '/reports'? styles.hover: ''} href={'/reports'} >report</Link>
 </nav>
  
</header>


    
  )
}

export default Header

