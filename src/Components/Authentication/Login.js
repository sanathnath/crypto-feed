import { Box, Button, makeStyles, TextField } from '@material-ui/core'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';

const useStyles = makeStyles(()=>({
  button: {
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: "#A24BDD",
    color: "white",
    fontWeight: 500,
    "&:hover": {
      color: "black",
    },
  },
}))

function Login({handleClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setError } = CryptoState();

  const classes = useStyles();

  const handleSubmit = async()=>{
    if(email === "" || password === ""){
      setError({open:true,
        severity:"error",
        message:"All fields are required"});
        console.log("no value");
        return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth,email,password);
      setError({open:true,
        severity:"success",
        message:`Login successfully ${result.user.email}`});
    console.log(result);
    handleClose();
    } catch (error) {
      setError({open:true,
        severity:"error",
        message:error.message})
    }
  }

  return (
    <Box
    p={3}
    style={{
        display:"flex",
        flexDirection:"column",
        gap:20
    }}>
        <TextField 
        label="Enter email" 
        variant='outlined'
        type='email'
        value={email}
        fullWidth
        onChange={(event)=>{setEmail(event.target.value)}} 
        />
        <TextField 
        label="Enter password" 
        variant='outlined'
        type='password'
        value={password}
        fullWidth
        onChange={(event)=>{setPassword(event.target.value)}} 
        />
        <Button 
        variant='contained'
        size='large'
        className={classes.button} 
        onClick={handleSubmit}>Login</Button>
    </Box>
  )
}

export default Login