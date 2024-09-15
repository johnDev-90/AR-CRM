import React from 'react'
import styles from '../src/styles/inoices.module.css'
import { useEffect, useState } from 'react'

const ModalInvoices = ({mensaje, setModalWarnin, setConfirmation, invoiceNumberToDelete, incoicesChequeados, invoicesFromDB, setAction }) => {

    const [arregloDeNumerodeFacturas, setArregloNumeroDEFacturas] = useState([])

    console.log(arregloDeNumerodeFacturas)

    useEffect(() => {
        if (incoicesChequeados) {
            extraerInvoiceNumber()
        }
    },[incoicesChequeados])


    function extraerInvoiceNumber() {
      const invoicesNumber =  invoicesFromDB.filter(invoices => {
        if (incoicesChequeados.includes(invoices.id)) {
            return invoices
        }
      })

     const numeroDEFacturas = invoicesNumber.map(invoices => {
        return invoices.attributes.charges[1].invoiceNumber
      })

      setArregloNumeroDEFacturas([numeroDEFacturas])
       
    }
     
  return (
    <div className={styles.modalInvoices}>
        <p>{'Deseas elimiar la factura(s):'}</p>
        <p>{invoiceNumberToDelete || arregloDeNumerodeFacturas.toString()}?</p>


        <div className={styles.btnsModal}>
        <button 
              className={styles.BgColorRed} 
              onClick={() => {
                setConfirmation(true);
                setAction('');
              }}
            >
              YES
            </button>
            <button 
              className={styles.BgColorGreen} 
              onClick={() => {
                setModalWarnin(false);
                setAction('');
              }}
            >
              NO
            </button>
        </div>
    </div>
  )
}

export default ModalInvoices
