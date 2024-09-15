
import invoices from '@/pages/invoices';
import style from '../src/styles/customers.module.css'
import { useState, useEffect } from 'react';
import { formatearDinero } from '@/helpers';
import Link from 'next/link';

const Customer = ({items, arregloDeCargos, totalOpen}) => {
  const [openBalance, setOpenBalance] = useState()
  
  const [chargesArray, setChargesArray] = useState([])

  const [arreglo, setArreglo] = useState([])

  const [totalBalance, setOpenTotal] = useState(0);
  const [urlCustomer,setUrl ] = useState('')



    const {name,email,phone,terms, url, invoices, id} = items.attributes;

  
    useEffect(() => {
      calcularEltotal();
    }, [items]);
  
    function calcularEltotal() {
      const arregloData = items.attributes.invoices.data;
      let total = 0;
      
      arregloData.forEach((invoice) => {
        const charges = invoice.attributes.charges;
        
   
        charges.forEach((charge) => {
       
          if (typeof charge === 'object' && 'total' in charge) {
            total += charge.total;
          }
        });
      });
    
      setOpenTotal(total);
    }

    function handleClick(e){
      setUrl(items.id)
    }
  
   
  return (

    <div  onClick={ (e) => handleClick(e)} className={style.container}>
     
      <Link
      
      href={`/customerProfile?id=${items.id}?populate=*`}>
      <div
      
      className={style.divrowData}>
        
        <p className={style.mainName}>{name}</p>
        <p>{name}</p>
        <p>{phone}</p>
        <p>{formatearDinero(totalBalance)}</p>
        
        
        
        <p className={style.createLink}><Link href={"/createInvoice"}>Create Invoice</Link></p>
      </div>
      </Link>
    </div>

  )

}

export default Customer
