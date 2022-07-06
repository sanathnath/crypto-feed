import { Avatar, Button, Drawer, makeStyles } from '@material-ui/core'
import { signOut } from 'firebase/auth';
import React from 'react'
import { CryptoState } from '../../CryptoContext';
import { auth, db } from '../../firebase';
import { MdDelete } from 'react-icons/md'
import { doc, setDoc } from 'firebase/firestore';


function UserSideBar() {
    const [state, setState] = React.useState(false);
    const { user, setError, watchList, coins, symbol } = CryptoState();
      const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState(open);
      };
    const useStyles = makeStyles(()=>({
        container:{
            width:250,
            padding:25,
            height:"100%",
            display:"flex",
            flexDirection:"column",
            fontFamily:"Montserrat"
        },
        profile:{
            flex:1,
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            gap:"30px",
            height:"92%"
        },
        picture:{
            width:"50%",
            height:100,
            cursor:"pointer",
            backgroundColor:"#A24BDD"
        },
        logout:{
            backgroundColor:"#e63946",
            color:"white"
        },
        watchList:{
            flex:1,
            width:"100%",
            backgroundColor:"#caf0f8",
            borderRadius:"5px",
            padding:15,
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            gap:22,
            overflowY:"scroll",
            overflowX:"hidden",
            marginBottom:35,
            "&::-webkit-scrollbar":{
                width: ".3rem",
                borderRadius: ".5rem",
                backgroundColor: "rgb(209, 209, 209)"
              },
              
              "&::-webkit-scrollbar-thumb":{
                backgroundColor: "rgb(138, 123, 138)",
                borderRadius: ".3rem",
                "&:hover":{
                    backgroundColor: "rgb(150, 156, 161)"
                  }
              },
        },
        list:{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between" ,
            gap:12,
            width:"100%",
            padding:"8px 5px 8px 15px",
            marginBottom:3,
            backgroundColor:"#A24BDD",
            color:"white",
            fontFamily:"Anek Latin",
            fontSize:14
        },
        deleteBtn:{
            fontSize:16,
            marginRight:0,
            "&:hover":{
                cursor:"pointer",
            }
        }
    }))
    const classes = useStyles();

    const logout = ()=>{
        signOut(auth);

        setError({open:true,
            severity:"success",
            message:"Logout success"});

        toggleDrawer();
    }

    const numberWithComas = (x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
      }

      const deleteFromWatchList = async (coin)=>{
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

  return (
    <>
        <Avatar 
        src={user.photoURL}
        alt={user.displayName || user.email}
        style={{backgroundColor:"#A24BDD",cursor:"pointer"}}
        onClick={toggleDrawer(true)}/>
        <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
            <div className={classes.container}>
                <div className={classes.profile}>
                    <Avatar 
                    className={classes.picture}
                    src={user.photoURL}
                    alt={user.email} />
                    <span 
                    style={{width:"100%",
                    fontSize:25,
                    textAlign:"center",
                    wordWrap:"break-word"}}>{user.email}</span>
                    <div className={classes.watchList}>
                        <div style={{width:"100%", textAlign:"center"}}>
                            <span>Watch List</span>
                        </div>
                        <div>
                            {watchList ? coins.map((item)=>{
                                if(watchList.includes(item.id)){
                                    return (<div key={item.id} className={classes.list}>
                                        <span>{item.name}</span>
                                        <span>
                                            {symbol}
                                            {numberWithComas(item.current_price.toFixed(2))}
                                        </span>
                                        <MdDelete
                                         onClick={()=> deleteFromWatchList(item) }
                                         className={classes.deleteBtn}
                                          />
                                    </div>)
                                }else{<></>}
                            }) : null}
                        </div>
                    </div>
                </div>
                <Button
                variant="contained"
                className={classes.logout}
                 onClick={logout}>Logout</Button>
            </div>
        </Drawer>
    </>
  )
}

export default UserSideBar