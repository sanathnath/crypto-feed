import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinList } from './Config/api';
import { auth, db } from './firebase';

const Crypto = createContext();

const CryptoContext = ({children}) => {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState([]);
    const [user, setUser] = useState(null);
    const [watchList, setWatchList] = useState([]);
    const [error, setError] = useState({open:false,
                                        severity:"success",
                                        message:"success"});
    console.log(watchList);
    const getCoins = async() => {
      setLoading(true);
      const data = await axios.get(CoinList(currency)).then((res)=>{
          return res.data;
      });
      console.log(data);
      setCoins(data);
      setLoading(false);
  }
    useEffect(() => {
      if (user) {
        const coinRef = doc(db, "watchlist", user.uid);
        
        const unsubscribe = onSnapshot(coinRef, (coin)=>{
          if (coin.exists()) {
            console.log(coin.data().coins);
            setWatchList(coin.data().coins);
          }else{
            console.log("sda");
          }
        });
        return ()=>{
          unsubscribe();
        }
      }
    }, [user])
    
    useEffect(() => {
      if(currency === "INR"){
        setSymbol("₹");
      }else if(currency === "USD"){
        setSymbol("$")}
      
      onAuthStateChanged(auth,(user)=>{
        if(user) setUser(user);
        else setUser(null);
      })

    }, [currency])
    
  return (
    <Crypto.Provider 
    value={{currency,
       setCurrency,
       symbol, 
       coins, 
       loading,
       error,
       setError, 
       getCoins,
       user,
       watchList,
      }}>{children}</Crypto.Provider>
  )
}

export const CryptoState = ()=>{
    return useContext(Crypto);
}

export default CryptoContext;
