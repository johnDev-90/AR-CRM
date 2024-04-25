
import invoices from '@/pages/invoices';
import style from '../src/styles/customers.module.css'

const Customer = ({items}) => {

    const {name,email,phone,terms,url, billingAddress} = items.attributes;

   
  return (

       <tr className={style.tr}>
        <td className={style.name}>{name}</td>
        <td>{email}</td> 
        <td>{phone}</td>
        <td><p>{billingAddress}</p></td>
       </tr>

  )

}

export default Customer
