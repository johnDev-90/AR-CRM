import React from 'react'
import Layout from '../../components/Layout'
import { useEffect, useState } from 'react'
import styles from '../styles/transaction.module.css'

import { formatearDinero, getPayments } from '@/helpers'
import Link from 'next/link'
import Modal from '../../components/modal'

import Spinner from '../../components/spinner'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'






const moneyReceived = () => {
    const [paymentsFromDb, setPaymentsFromDb] = useState([])
    const [confirmation, setConfirmation] = useState(false)
    const [modalConfirmation, setModalConfirmation] = useState(false)
    const [actionSelected, setActionSelected] = useState('')

    const [idToDelete, setIdToDelete] = useState(null);
    const [spiner, setSppiner] =useState(false)

    const [editMode, setEditMode] = useState(false)
    const [paymentToEdit, setPaymentToEdit] = useState({})


    const [makeApayment, setMakeApayment] = useState(false)

    const [location, setLocation] = useState('')



  const route = useRouter()



    
    useEffect(() => {
      
      
      getPayments()
     
    },[])




    function handleDeleteClick(id) {
      setModalConfirmation(true)

      setIdToDelete(id)
    }
   
  
    const deleteInvoice = async (id) => {
      setSppiner(true)
      console.log('Borrando factura', id);
      const respuesta = await fetch(`http://localhost:1337/api/charges/${id}`, {
        method: 'DELETE'
      });
     
      if (respuesta.status === 200) {
        setSppiner(false)
        setPaymentsFromDb(paymentsFromDb.filter( payment => payment.id !== id))

        toast.success('Payment successfully deleted.',{
          duration: 3000,
          style: {
            fontSize: '2rem', 
            padding: '16px', 
          }
        }) 
      }else{
        setSppiner(false)
        toast.error(`Error!${respuesta.status}`,{
          duration: 3000,
          style: {
            fontSize: '2rem', 
            padding: '16px', 
          }
        }) 
      }

    };
 

   async function getPayments() {

    const respuesta = await fetch('http://localhost:1337/api/charges');
    const resultado = await respuesta.json();
    setPaymentsFromDb(resultado.data);
        
    }

 


  


    function updateInvoice(payment) {
      setPaymentToEdit(payment)

      'http://localhost:1337/api/charges/81'
    }

 


   


  return (
    
   <Layout>
    
    <Toaster />
    {modalConfirmation && (
        <Modal
          mensaje={'You are about to delete this transaction.'}
          setConfirmation={(confirmation) => {
            setModalConfirmation(false);
            if (confirmation) {
              deleteInvoice(idToDelete);
            }
          }}
          setModalConfirmation={setModalConfirmation}
        />
      )}
  
    
     <div className={styles.transactionsDiv}>
     
      <div className={styles.header}>
        <p>Customer</p>
        <p>Date received</p>
        <p>Transaction type</p>
        <p>Payment amount</p>
        <p>Unapplied</p>
        <p>Actions</p>
        
      </div>
      {spiner && <Spinner />}
      {paymentsFromDb && paymentsFromDb.map(payment => (
  
  
        <div
        key={payment.id}
        id={payment.id}
        className={styles.paymentData}>
        <p>{payment.attributes.payments[0].name}</p>
        <p>{payment.attributes.payments[0].dateReceived}</p>
        <p>{payment.attributes.payments[0].type}</p>
        <p>{formatearDinero(payment.attributes.payments[0].amount)}</p>

        <p>{formatearDinero(payment.attributes.payments[0].unnapplied)}</p>
        <div className={styles.divActions}>
        <Link href={`/paymentEdit?${payment.id}`}>View/Edit</Link>
        <p onClick={(e) => handleDeleteClick(payment.id)} >Delete</p>
        </div>
        </div>
        
        
      ))}

     
    </div>
   </Layout>
  )
}

export default moneyReceived
