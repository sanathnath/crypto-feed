import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AppBar, Container, makeStyles, MenuItem, Select, Toolbar, Typography } from '@material-ui/core'
import { CryptoState } from '../CryptoContext';
import AuthForm from './Authentication/AuthForm';
import UserSideBar from './Authentication/UserSideBar';


const useStyles = makeStyles(()=>({
    title:{
        flex: 1,
        color:"#A24BDD",
        cursor: "pointer",
        fontFamily:"Anek Latin",
        fontWeight:"bold"
    },
    select:{
        display: "flex",
        flexDirection:"row"
    }
}))


function Header() {
    const navigate = useNavigate();
    const classes = useStyles();
    const {currency, setCurrency, user} = CryptoState();
    
    const handleSelect = (event)=>{
        setCurrency(event.target.value)
    }
  return (
    <AppBar position="sticky"
    style={{ background: 'whitesmoke' }}>
        <Container>
            <Toolbar>
            <Typography className={classes.title}
             onClick={()=>{navigate('/')}}
             variant="h5" >Crypto feed</Typography>
            
            <Select variant="outlined"
             style={{height:35, width:90, marginRight:15}}
             value={currency}
             onChange={handleSelect}
             >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            { user ? <UserSideBar /> : <AuthForm />}
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Header