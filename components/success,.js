import { useEffect, useState } from 'react'
import styles from '../src/styles/inoices.module.css'


const Success = ({mensajeDesuccess}) => {
    
    const [error, setError] = useState(false)

    useEffect(() => {
      if (mensajeDesuccess === 'Method Not Allowed') {
        setError(true)
      }else{
        setError(false)
      }
    },[mensajeDesuccess])
  return (
 
   
    <div className={`${styles.modalInvoices} ${ error === true? styles.modalInvoiceError : styles.modalInvoices }`}>
    <p>{mensajeDesuccess}</p>
    {error === true? (
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
         </svg>
         
        
    ): (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        
    )}
    </div>

  )
}

export default Success
