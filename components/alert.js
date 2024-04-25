import React, { useState } from 'react';
import styles from '../src/styles/newInvoice.module.css'

export default function CustomAlert({errorMessage,type}) {
  const [showAlert, setShowAlert] = useState(true);

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    showAlert && (
      <div className={styles.alert} onClick={handleClose}>
        {errorMessage}
      </div>
    )
  );
}