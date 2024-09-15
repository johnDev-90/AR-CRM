import React from "react";
import styles from "../src/styles/newInvoice.module.css";
import { useEffect, useState } from "react";
import { formatearDinero } from "@/helpers";

const ModalEdit = ({ setEditMode, objtEdit }) => {
  const [form, setForm] = useState(false);
  const [lineAMount, setLineAMounts] = useState([]);

  const [invoiceNumberEdit, setTotalInvoiceNumberEDit] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const [issueDate, setIssueDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [arrayDeCargos, setArregloDeCargos] = useState([])

  const [cantidadNewValue, setNewCantidad] = useState(0)
  const [descriptionNewValues, setDescriptionNewValues] = useState('')
  const [subTotal, setSubtotal] = useState(0)
  const [terms, setPaymentTerms] = useState('')
  const [amount, setAmounts] = useState(0)

  console.log(subTotal)

  useEffect(() => {

    

   },[cantidadNewValue])

  useEffect(() => {
    showForm();

   if (objtEdit) {

   setPaymentTerms(objtEdit.paymentTerms)

    
    setTotalInvoiceNumberEDit(objtEdit.invoiceNumber)
    setAddress(objtEdit.address)
    setEmail(objtEdit.email)
    setIssueDate(objtEdit.issueDate)
    setDueDate(objtEdit.dueDate)
    setName(objtEdit.name)
    setTotalAmount(objtEdit.total) 
    const arregloDE = objtEdit.arregloDeCargos[0].attributes.charges[0]
 

    setArregloDeCargos(arregloDE)
    getSubtotal()
    
   }




  

   
 
   
  }, []);

  function getSubtotal(){
    const subt = arrayDeCargos.map(calculo =>{
       setSubtotal(Number(calculo.cantidad) * calculo.amount)
    }) 
 }

  useEffect(() => {
    calcularFechaVencimiento(issueDate, terms) 
  },[issueDate])


 

  

  let lines = [];


  for (let i = 0; i < arrayDeCargos.length; i++) {
    lines.push(i)
   
    
  }

  function showForm() {
    setTimeout(() => {
      setForm(true);
    }, 1000);
  }

  function  handleSubmit(e) {
    e.preventDefault();

    const objtUpdated ={
        invoiceDate: issueDate,
        dueDate:dueDate,
        cantidad: cantidadNewValue,
        description: descriptionNewValues,
        amountnew: amount
    }

    console.log(objtUpdated);
    
  }

  



  function calcularFechaVencimiento(issueDate, terms) {
    // Convierte la cadena de fecha a objeto Date
    const fechaFactura = new Date(issueDate);

    // Copia la fecha de la factura para no modificarla directamente
    const fechaVencimiento = new Date(fechaFactura);

    // Agrega los días de términos a la fecha de vencimiento
    fechaVencimiento.setDate(fechaVencimiento.getDate() + terms);

    // Formatea la fecha de vencimiento como una cadena "YYYY-MM-DD"
    const year = fechaVencimiento.getFullYear();
    const month = String(fechaVencimiento.getMonth() + 1).padStart(2, "0");
    const day = String(fechaVencimiento.getDate()).padStart(2, "0");
    const fechaVencimientoFormateada = `${year}-${month}-${day}`;

    setDueDate(fechaVencimientoFormateada);
  } 

  return (
    <div className={styles.modalContainer}>
      <div className={styles.close}>
        <p onClick={(e) => setEditMode(false)}>X</p>
      </div>

      <div className={styles.contenido_left}>
            <p className={styles.inviceNumnber}>
              Invoice Number{" "}
              <span className={styles.number}>
                {invoiceNumberEdit}
              </span>
            </p>

            <p className={styles.inviceNumnber}>
              Total {" "}
              <span className={styles.number}>
                {formatearDinero(totalAmount)}
              </span>
            </p>

          </div>

      {form && (
        <form
          type="submit"
          onSubmit={(e) => handleSubmit(e)}
          className={styles.form}
        >
          <h2 className={styles.details}>Customer Information</h2>
          <div className={styles.cajasContainer}>
            <div className={styles.caja1}>
              <div className={styles.divInput}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <input value={name} type="text" placeholder="Name"></input>
              </div>

              <div className={styles.divInput}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                <input
                  value={address}
                  type="text"
                  placeholder="Billing Address"
                ></input>
              </div>

              <div className={styles.divInput}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <input
                  value={email}
                  type="text"
                  placeholder="Email address"
                ></input>
              </div>
            </div>

            <div className={styles.caja2}>
              <div className={styles.divInput2}>
                <label>Invoice Date</label>
                <input
                onChange={(e) => setIssueDate(e.target.value)}
                type="date" defaultValue={issueDate}></input>
              </div>
              <div className={styles.divInput2}>
                <label>Due Date</label>
                <input type="date" value={dueDate}></input>
              </div>
              <div className={styles.divInput2}>
                <label>Order Number</label>
                <input type="text"></input>
              </div>
            </div>
            <h2 className={styles.details}>Invoice Details</h2>
            <div className={styles.caja3}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>
                      <label className={styles.labels}>QTY</label>
                    </th>
                    <th>
                      <label className={styles.labels}>Description</label>
                    </th>
                    <th>
                      <label className={styles.labels}>Amount</label>
                    </th>
                    <th>
                      <label className={styles.labels}>Subtotal</label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {arrayDeCargos.map((lineCharges) => (
                          
                      
                            <tr className={styles.bodyTr}>
                            <td className={styles.quantity}>
                              <input
                              onChange={(e) => setNewCantidad(e.target.value)}
                              type="number" defaultValue={lineCharges.cantidad} />
                            </td>
                            <td className={styles.description}>
                              <input
                              onChange={(e) => setDescriptionNewValues(e.target.value)}
                              type="text" defaultValue={lineCharges.description} />
                            </td>
                            <td className={styles.amount}>
                              <input
                              onChange={(e) => setAmounts(e.target.value)}
                              type="number" defaultValue={lineCharges.amount} />
                            </td>
                            <td className={styles.subtotal}>
                              <span  >{formatearDinero(lineCharges.cantidad * lineCharges.amount)}
                            
                              </span>
                              <p className={styles.closeTag}>X</p>
                            </td>
                          </tr>
                          
                   
             ))}
                </tbody>
              </table>
            </div>

            <div className={styles.btnContaner}>
              <input
                type="submit"
                className={styles.btnInvoice}
                value="Save and Close"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ModalEdit;
