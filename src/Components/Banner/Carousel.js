import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

import { TrendingCoins } from '../../Config/api';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles(()=>({
    carousel:{
        height: "50%",
        display:"flex",
        alignItems:"center"
    },
    carouselItems:{
        display:"flex",
        flexDirection:"column",
        height: "8.5rem",
        alignItems:"center",
        textDecoration:"none"
    }
}))

function Carousel() {
  const [trending, setTrending] = useState([]);
  const {currency} = CryptoState();
  const classes = useStyles();
  const {symbol} = CryptoState();

  const getTrendingCoins = async ()=>{
    let coins = await axios.get(TrendingCoins(currency)).then((res)=>{
        return res.data;
    });
    setTrending(coins);
    console.log(coins);
  }
  const numberWithComas = (x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
  }
  
  useEffect(() => {
    getTrendingCoins();
  }, [currency])
  
  const res = {
    0: {
        items: 2,
    },
    512: {
        items: 5
    }
  };
  const items = trending.map((coin)=>{
    let profit = coin.price_change_percentage_24h >= 0;
    return <Link to={`/coin/${coin.id}`} className={classes.carouselItems}>
        <img
        style={{height:80, marginBottom:10}}
        src={coin.image}
        alt={coin.name}
        />
        <span style={{color:"#201A23"}}>{coin.symbol}&nbsp; 
            <span style={{color: profit?"green":"red"}} >
            {profit && "+"}{coin.price_change_percentage_24h.toFixed(2)}%
            </span>
        </span>
        <span style={{fontSize:22, fontWeight:500,color:"#2E2532"}}>{symbol} {numberWithComas(coin.current_price.toFixed(2))}</span>
    </Link>
  })
  return (
    <div className={classes.carousel}>
        <AliceCarousel items={items}
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        autoPlay
        responsive={res} />
    </div>
  )
}

export default Carousel