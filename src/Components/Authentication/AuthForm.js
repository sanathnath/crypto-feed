import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AppBar, Box, Button, Tab, Tabs } from "@material-ui/core";
import Signup from "./Signup";
import Login from "./Login";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles((theme) => ({
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius:10,
    boxShadow: theme.shadows[5],
  },
  google:{
    display:"flex",
    flexDirection:"column",
    textAlign:"center",
    alignItems:"center",
    padding:30,
    paddingTop:5,
    gap:20
  }
}));

function AuthForm() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { setError } = CryptoState();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = ()=>{
    signInWithPopup(auth, googleProvider).then((res)=>{
      setError({open:true,
        severity:"success",
        message:`Login successfully ${res.user.email}`});
        console.log(res);
      handleClose();
    }).catch((err)=>{
      setError({open:true,
        severity:"error",
        message:err.message});

        return;
    })
  }

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position="static"
                variant='elevation'
                style={{backgroundColor:"transparent", color:"white" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                style={{backgroundColor:"grey", borderRadius:"10px 10px 0px 0px"}}
              >
                <Tab label="Login" />
                <Tab label="Signup" />
              </Tabs>
            </AppBar>
            {value===1 ? <Signup handleClose={handleClose} /> :
             <Login handleClose={handleClose}/>}
             <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
               style={{width:"100%"}}
               onClick={signInWithGoogle}/>
             </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AuthForm;
