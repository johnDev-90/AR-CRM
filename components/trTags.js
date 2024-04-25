import styles from '../src/styles/newInvoice.module.css'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const TrTags = ({
setChargesObjets,
setArrayCharges,
chargesArray,
responseStatus,
setError,
newLine,
decrease,
error








}) => {

  const [cantidad, setCantidad] = useState(0);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [idBj, setIdObj] = useState(0);

  const [getObjt, setGetObj] = useState({})

    const CustomerID = uuidv4()

 
    useEffect(() => {

        comprobarobjetos()
        setSubtotal(cantidad * amount)
        
    },[cantidad, description, amount, subTotal])



    function deleteLine(id, rowElement) {
      
      console.log(rowElement)

      if (id === rowElement.id) {
          rowElement.remove();

        const updatedCharges = chargesArray.filter(cargos => cargos.id !== id);
        
        setArrayCharges([...updatedCharges]);

        
        return
      }

      

      

      
      
      
    }

   function comprobarobjetos() {
    
    const objetosDECargos = {cantidad, description, amount, subTotal, id:CustomerID}
    setGetObj(objetosDECargos)
    setIdObj(objetosDECargos.id)


    if (Object.values(objetosDECargos).includes('')) {
        console.log('Campos vacios')
     
        return
        
    }
        
        setChargesObjets(objetosDECargos)
        setArrayCharges([...chargesArray, objetosDECargos ])
        setError(false)
    
   }


  


  
  return (
   
    <tr id={idBj} className={styles.bodyTr}>

   <td className={styles.quantity}>
        <input
         
          onBlur={(e) => setCantidad(+e.target.value)}

          type="number"
          
        />
      </td>
      <td className={styles.description}>
        <input
          onBlur={(e) => setDescription(e.target.value)}
          type="text"
          
        />
      </td>
      <td className={styles.amount}>
        <input
          onBlur={(e) => setAmount(+e.target.value)}
          type="number"
         
        />
      </td>
      <td className={styles.subtotal}>
        <span>{subTotal}</span>
        <p
    onClick={(e) =>{ deleteLine(idBj, e.target.parentElement.parentElement)}}
     className={styles.closeTag}>X</p></td>
    </tr>

                        
      
  )
}

export default TrTags
