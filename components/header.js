import Link from "next/link"
import styles from "../src/styles/header.module.css"
import Image from "next/image"
import logo from '../public/favicon.ico'
import { useRouter } from "next/router"

const Header = () => {

    const router = useRouter()


  return (
    <header className={styles.header}>

        <div className={styles.logo}>
        <Image src={logo} width={100} height={100} alt="Logo"  />
        </div>
     
     <nav className={styles.menu}>
     
      <Link className={router.pathname === '/'? styles.hover: ''} href={'/'} >Dashboard</Link>
      <Link className={router.pathname === '/aging'? styles.hover: ''} href={'/aging'} >Aging report</Link>
      <Link className={router.pathname === '/customers'? styles.hover: ''} href={'/customers'} >Customers</Link>
      <Link className={router.pathname === '/invoices'? styles.hover: ''} href={'/invoices'} >Invoices</Link>
      <Link className={router.pathname === '/payments'? styles.hover: ''} href={'/payments'} >Payments</Link>
      <Link className={router.pathname === '/reports'? styles.hover: ''} href={'/reports'} >report</Link>
     </nav>
      
    </header>
  )
}

export default Header

