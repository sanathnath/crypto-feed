import { LinearProgress, Container, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Tooltip } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../Config/api';
import { CryptoState } from '../CryptoContext';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#A24BDD",
    color: "white",
    fontFamily:"Montserrat",
    fontWeight:700
  },
  body: {
    fontSize: 14,
    fontFamily:"Montserrat",
    color:"#2E2532",
  },
}))(TableCell);

const useStyles = makeStyles(()=>({
  bodyRow:{
    fontFamily:"Montserrat",
    color:"#2E2532",
    cursor:"pointer",
    "&:hover":{
      backgroundColor:"#AFBFC0",
    }
  },
  pagination:{
    display:"flex",
    justifyContent:"center",
    width:"100%",
    padding:2,
    margin:"2rem",
    "& .MuiPaginationItem-root":{
      color: "#A24BDD",
    }
  }
}))

function CryotoTable() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const { currency, symbol, coins, loading, getCoins } = CryptoState();
    const classes = useStyles();

    const handleChange = (event, value) => {
      setPage(value);
    };
    const handleSearch = ()=>{
      return coins.filter((item)=>{
        return item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol.toLowerCase().includes(search.toLowerCase())
      })
    }
    const numberWithComas = (x)=>{
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }
    
    useEffect(() => {
      getCoins();
    }, [currency])
    
  return (
    <Container style={{textAlign:"center"}}>
      <Typography variant='h4'
      style={{fontFamily:"Montserrat",
            margin:18,
            textTransform:"capitalize",
            color:"#2E2532"}}>
        crypto currency price by market cap
      </Typography>
      <TextField 
      style={{width:"100%",
      marginBottom:"2rem"}}
      label="search cryptos"
      variant='outlined'
      onChange={(event)=>{
        setSearch(event.target.value);
      }}/>
      <TableContainer>
        {loading?<LinearProgress style={{color:"#A24BDD"}}/>:
        <Table style={{borderRadius:20}}>
          <TableHead>
          <TableRow>
            <StyledTableCell key={"coin"}>Coin</StyledTableCell>
            <StyledTableCell key={"price"} align="right">Price</StyledTableCell>
            <StyledTableCell key={"change"} align="right">24h Change</StyledTableCell>
            <StyledTableCell key={"cap"} align="right">Market Cap</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {handleSearch().slice((page-1)*10,(page-1)*10+10).map((item)=>{
            const profit = item.price_change_percentage_24h >= 0;

            return (
              <TableRow 
              className = {classes.bodyRow}
              key={item.id}
              onClick={()=>{
                navigate(`/coin/${item.id}`)
              }}>
                <StyledTableCell key={item.name}>
                  <div style={{display:"flex",
                              flexDirection:"row",
                              alignItems:"center"}}>
                  <img src={item.image} style={{height:80}} />
                  <div style={{display:"flex",
                              flexDirection:"column",
                              alignItems:"center",
                              marginLeft:"2rem"}}>
                  <Typography variant="h5" style={{textTransform:"uppercase", color:"#2E2532"}}>{item.symbol}</Typography>
                  <Typography>{item.name}</Typography>
                  </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell key={item.current_price} align="right">{symbol}&nbsp;{numberWithComas(item.current_price)}</StyledTableCell>
                <StyledTableCell key={item.price_change_percentage_24h} align="right" style={{color: profit?"green":"red"}}>
            {profit && "+"}{item.price_change_percentage_24h.toFixed(2)}%</StyledTableCell>
                <StyledTableCell key={item.market_cap} align="right" >{symbol}&nbsp;{numberWithComas(item.market_cap).toString().slice(0,-6)}M</StyledTableCell>
              </TableRow>
            )
          })}
        </TableBody>
        </Table> }
      </TableContainer>
      <Pagination 
      className={classes.pagination}
      variant="outlined"
      color="primary"
      count={Number((handleSearch().length/10).toFixed(0))}
      onChange={handleChange}/>
    </Container>
  )
}

export default CryotoTable;