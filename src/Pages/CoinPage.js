import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CryptoGraph from '../Components/CryptoGraph';
import { SingleCoin } from '../Config/api';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles((theme)=>({
  container:{
    display:"flex",
    [theme.breakpoints.down("md")]:{
      flexDirection:"column",
      alignItems:"center",
    },
  },
  sidebar:{
    width:"30%",
    [theme.breakpoints.down("md")]:{
      width:"100%"
    },
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    marginTop:25,
    borderRight:"2px solid grey",
  },
  heading:{
    fontWeight:"bold",
    fontFamily:"Montserrat",
    marginBottom:20,                                                                                                                                                                                                                                                                                                                                                                              
  },
  description:{
    width:"100%",
    fontFamily:"Monserrat",
    padding:25,
    paddingBottom:15,
    paddingTop:0,
    textAlign:"justify"
  },
  marketDetails:{
    alignSelf:"start",
    padding:25,
    paddingTop:10,
    width:"100%",

    [theme.breakpoints.down("md")]:{
      display:"flex",
      justifyContent:"space-around"
    },
    [theme.breakpoints.down("sm")]:{
      flexDirection:"column",
      alignItems:"center"
    },
    [theme.breakpoints.down("xs")]:{
      alignItems:"start"
    },
  },
}))

function CoinPage() {
  const [coin, setCoin] = useState({});
  const {id} = useParams();
  const {currency,symbol} = CryptoState();

  const getCoin = async()=>{
    const data = await axios.get(SingleCoin(id)).then((res)=>{
      return res.data;
    })
    console.log(data);
    setCoin(data);
  }
  useEffect(() => {
    getCoin();
  }, [currency])
  const numberWithComas = (x)=>{
    console.log(currency.toLowerCase());
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
  }
  const classes = useStyles();

  
  return (
    <div className={classes.container}>
      {coin.image !== undefined?<div className={classes.sidebar}>
        <img 
        src={coin.image.large}
        alt={coin.name}
        style={{marginTop:20,height:200}} />
        <Typography 
        className={classes.heading}
        variant="h3"
        >{coin.name}</Typography>
        <Typography 
        className={classes.description}
        dangerouslySetInnerHTML={{__html: coin.description.en.split(". ")[0]}}></Typography>
        <div className={classes.marketDetails}>
          <span style={{display:"flex"}}>
            <Typography variant="h5"
            className={classes.heading}>Rank: &nbsp;</Typography>
            <Typography variant="h5">{coin.market_cap_rank}</Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant="h5"
            className={classes.heading}>Current Price: &nbsp;</Typography>
            <Typography variant="h5">
            {symbol}&nbsp;{numberWithComas(coin.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant="h5"
            className={classes.heading}>Market Cap: &nbsp;
            </Typography>
            <Typography variant="h5">
              {symbol}&nbsp;{numberWithComas(coin.market_data.market_cap[currency.toLowerCase()]).toString().slice(0,-6)}M
              </Typography>
          </span>
          </div>
      </div>:<CircularProgress/>}
      {coin.id?<CryptoGraph coin={coin}/>:null}
    </div>
  )
}

export default CoinPage