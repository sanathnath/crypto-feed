import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage: "url(/images/background-g1a4d49aa3_1920.jpg)"
    },
    bannerContent:{
        display:"flex",
        flexDirection:"column",
        height:400,
        paddingTop:25,
        justifyContent:"space-around"
    },
    bannerTitle:{
        display: "flex",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
        height:"40%"
    }
}))

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.bannerTitle}>
                <Typography variant='h1'
                 style={{color:"#9E4770",
                    fontFamily:"Anek Latin"
                 }}>Crypto feed</Typography>
                <Typography variant="subtitle2"
                style={{textTransform:"capitalize",color:"#2E2532"}}>Info regarding your favorite crypto currency</Typography>
            </div>
                <Carousel />
        </Container>
    </div>
  )
}

export default Banner