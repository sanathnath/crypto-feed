import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {CryptoState} from '../CryptoContext';
import {HistoricalChart} from '../Config/api';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { Chart as ChartJS,registerables } from 'chart.js'
import { Line } from 'react-chartjs-2';
import { chartDays } from '../Config/data';
import SelectButton from './SelectButton';
ChartJS.register(...registerables);

function CryptoGraph({coin}) {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const getHistoricData = async()=>{
    const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  }
  
  useEffect(() => {
    getHistoricData();
  }, [currency, days]);

  const useStyles = makeStyles((theme)=>({
    container:{
      width:"75%",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      marginTop:25,
      padding:40,
      [theme.breakpoints.down("md")]:{
        width:"100%",
        marginTop:0,
        padding:20,
        paddingTop:0,
      }
    }
  }))

  const classes = useStyles();
  
  return (
    <div className={classes.container}>
      {!historicData?(
        <CircularProgress/>
      ):(<>
          <Line data={{
            labels: historicData.map((item)=>{
              let date = new Date(item[0]);
              let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicData.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: "#A24BDD",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}/>
          <div style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}>
            {chartDays.map((item)=>{
              return <SelectButton 
              key={item.value}
              onClick={()=>{
                setDays(item.value);
              }}
              selected={item.value===days}
              >{item.label}
              </SelectButton>
            })}
          </div>
        </>)}
    </div>
  )
}

export default CryptoGraph