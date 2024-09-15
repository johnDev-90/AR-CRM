
import styles from '../src/styles/newInvoice.module.css'

const Modal = ({name, responseStatus, mensaje, setModalConfirmation, setConfirmation}) => {
console.log(responseStatus)


  return (
    <div className={styles.modal}> 

    <div className={styles.check}>
            <p>{mensaje}</p>
            <p>Do you wish to continue?</p>
            <div className={styles.divModal}>
            <input onClick={(e) => setConfirmation(true)} type='button' value={'Yes'} />
            <input onClick={(e) => setModalConfirmation(false)} type='button' value={'No'} />
            </div>
     </div>

      
    </div>
  )
}

export default Modal
