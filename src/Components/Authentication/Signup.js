import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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

function Signup({handleClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const { setError } = CryptoState();

  const classes = useStyles();

  const handleSubmit = async()=>{
    if(email === "" || password === "" || confirmPassword === ""){
      setError({open:true,
        severity:"error",
        message:"All fields are required"});
        console.log("no value");
        return;
    }else if(password !== confirmPassword){
      setError({open:true,
        severity:"error",
        message:"Password does not match"});
        return;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth,email,password);
      setError({open:true,
              severity:"success",
              message:`Signup successfully ${result.user.email}`});
      console.log(result);
      handleClose();
    } catch (error) {
      setError({open:true,
        severity:"error",
        message:error.message});
    }
    return;
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
        <TextField 
        label="Confirm password" 
        variant='outlined'
        type='password'
        value={confirmPassword}
        fullWidth
        onChange={(event)=>{setConfirmPassword(event.target.value)}} 
        />
        <Button
        variant='contained'
        size='large'
        className={classes.button}
        onClick={handleSubmit} >Sign up</Button>
    </Box>
  )
}

export default Signup