import "@/styles/globals.css";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [customersArray , setCustomersArray] = useState([]);


  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [phisycalAddress, setAddress] = useState('')
  const [date, setDate] = useState('')
  const [terms, setTerms] = useState(0)


  useEffect(() => {
    consultarAPI()

    customersArray.map(items => {
      const {name, email, phone, address, currentDateString, terms } = items;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setAddress(address)
      setDate(currentDateString)
      setTerms(terms)
 
    })

  }, [customersArray])

    

     async function consultarAPI(){

  

      const url = 'http://localhost:1337/api/customers';
      const response = await fetch(url, {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data:{
        name: name,
        phone: phone,
        email: email,
        phisycalAddress: phisycalAddress,
        billingAddress: phisycalAddress,
        customerSince: date,
        terms: terms

          }
        })

        
      })

      const respuesta = await response.json()
      console.log(respuesta)

     


     }

    
   
  


  
  return <Component {...pageProps}
  customersArray = {customersArray}
  setCustomersArray = {setCustomersArray}

  
  />;
}
