import { Button, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CryptoGraph from '../Components/CryptoGraph';
import { SingleCoin } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import { auth, db } from '../firebase';

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
  const { currency,symbol,user, watchList, setError } = CryptoState();

  const getCoin = async()=>{
    const data = await axios.get(SingleCoin(id)).then((res)=>{
      return res.data;
    })
    console.log(data);
    setCoin(data);
  }
  console.log("coinP wa",watchList);
  let inWatchList = false;
  if(watchList !== undefined){
     inWatchList = watchList.includes(coin.id);
  }

  const addToWatchList = async()=>{
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef,{
        coins: watchList ? [...watchList, coin?.id] : [coin?.id],
      });
      setError({open:true,
        severity:"success",
        message:`${coin.name} successfully added to the watchlist`})
    } catch (error) {
      setError({open:true,
        severity:"error",
        message:error.message})
    }
  }

  const removeFromWatchList = async ()=>{
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef,{
        coins: watchList.filter((item)=> item !== coin.id ),
      },
      {merge:"true"});

      setError({open:true,
        severity:"success",
        message:`${coin.name} successfully removed from Watchlist`})
    } catch (error) {
      setError({open:true,
        severity:"error",
        message:error.message})
    }
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
          {user?
          <div style={{display:"flex",alignItems:"center",marginBottom:30}}>
            <Button
              variant="contained"
              onClick={ inWatchList ? removeFromWatchList : addToWatchList}
              style={{
                backgroundColor: !inWatchList ? "#A24BDD" : "#e63946",
                color:"white",
                height:40
              }}>
              { inWatchList ? "Remove from Watchlist" : "Add to Watchlist"}
              </Button>
          </div>
              :null} 
      </div>:<CircularProgress/>}
      {coin.id?<CryptoGraph coin={coin}/>:null}
    </div>
  )
}

export default CoinPage