
import style from '../src/styles/customers.module.css'

const Customer = ({items}) => {

    const {name,email,phone,terms,url, billingAddress} = items.attributes;
 console.log(name)
    console.log(items.attributes)
  return (

       <tr className={style.tr}>
        <td>{name}</td>
        <td>{email}</td> 
        <td>{phone}</td>
        <td>{billingAddress}</td>
      

        
       </tr>

  )
}

export default Customer
