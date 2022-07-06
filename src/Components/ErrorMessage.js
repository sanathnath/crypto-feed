import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react'
import { CryptoState } from '../CryptoContext'

function ErrorMessage() {
  const {error, setError} = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError({open:false});
  };
  
  return (
    <Snackbar open={error.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error.severity}>
          {error.message}
        </Alert>
      </Snackbar>
  )
}

export default ErrorMessage