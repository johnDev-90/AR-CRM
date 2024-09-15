import Layout from "../../components/Layout"
import styles from "../styles/form.module.css"
import Link from "next/link"
import { useState } from "react"
import customers from "./customers"
import { generarID } from "@/helpers"



const newCustomer = ({setCustomersArray, customersArray}) => {

  const [name, setname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [terms, setTerms] = useState()

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];

 
function handleSubmit(e){
  e.preventDefault();
  
  

 const customer = {name, email,phone,address, terms, currentDateString}

 if (Object.values(customer).includes("")){
  console.log('Campos vacios');
  return;
  
 }



 setCustomersArray([...customersArray, customer])

}
  

  return (
   <Layout
   title={'New customer'}
   description={'Form: Fill all blanks to create a new customer'}
   
   >
    <div className={styles.contenedor}>
    <h1 className="heading">Add new customers</h1>
    <form type='submit'
    onSubmit={(e) => handleSubmit(e)}
    className={styles.formulario}>
      <label htmlFor="name">Name</label>
      <input onChange={(e) => setname(e.target.value)} className={styles.input} id="name" type="text"></input>
      <label htmlFor="email">Email</label>
      <input onChange={(e) => setEmail(e.target.value)} className={styles.input} id="email" type="text"></input>
      <label htmlFor="phone">Phone Number</label>
      <input onChange={(e) => setPhone(e.target.value)} className={styles.input} id="phone" type="text"></input>
      <label htmlFor="address">Address</label>
      <input onChange={(e) => setAddress(e.target.value)} className={styles.input} id="address" type="text"></input>
      <label htmlFor="terms">Payment terms</label>
      <select onChange={(e) => setTerms(e.target.value)} className={styles.select} id="terms" type="text">
        <option value={''}>--Select--</option>
        <option value={7}>7</option>
        <option value={15}>15</option>
        <option value={30}>30</option>
        <option value={45}>45</option>
        <option value={60}>60</option>
      </select>
      <input type="submit"
      value={'Save'}
      className={styles.btnAdd} />
    </form>
      
    </div>
   </Layout>
  )
}

export default newCustomer
