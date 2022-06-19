import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';

import { useSelector,useDispatch } from "react-redux";
// import {setUser} from '../../redux/user-slice';
import axios from 'axios';
import Helmet from './Helmet'
// import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({

    rootPrincipal: {
      
            display: 'flex',
            height:'90vh',
            width: '100%',
            backgroundColor: '#F6F5F5',
            alignItems:'center',
            justifyContent:'center',
    },

    root:{
        color:'black',

        display: 'flex',
        flexDirection:'column',
        width: '35%',
        alignItems:'center',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        justifyContent: 'center',
        backgroundColor:'white',
        padding: '40px',
        borderRadius:'15px',
    },

    '@media (max-width: 1100px)': {
        root: {

            width: '60%',
          
        },},
    '@media (max-width: 768px)': {

        root: {

            width: '85%',
          
        },},
    '@media (max-width: 1260px)': {

        root: {

            width: '60%',
           
          
        },},
    '@media (max-width: 478px)': {

        root: {

            width: '75%',
           
          
        },},

    h3:{
        color:'#7CBD4F',
        fontSize:'25px',
        fontWeight:'bold ',
        fontWeight:' 600',
        marginBottom:'45px',

    },
    inputWidth:{

        width:'100%',
        marginBottom:'45px',
        fontSize:'20px'
    },

    partLink:{
        display:'flex',
        justifyContent:'space-between',
        alignItems: 'center',
    },

    button: {
      background: '#7CBD4F',
      border: 0,
      borderRadius: 5,
      color: 'white',
      height: 48,
      padding: '0 30px',
    //   width:'250px',
      fontSize:'18px',
      "&:hover": {
        border: '2px solid' ,
        borderColor:'#7CBD4F',
        backgroundColor:'fff',
        color:'#7CBD4F',
        
      },
      composes: '$inputWidth',
    },

    chekbox:{
        
    },
  });



const Compte = () => {
const [email, setEmail] = useState(localStorage.getItem('email'));

    const history = useHistory();


    const handelhome = () => {
        history.push('/');
    }

    const handellogin = () => {
        history.push('/Compte');
    }

    const[error,setErr]=useState("");
    const[existErr,setexistErr]=useState(true);
    
    const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    });

    const classes =useStyles();
    const checkAuth= async (e)=>{
        e.preventDefault();
      
      let client=localStorage.getItem('client');
      let totalPrice=localStorage.getItem('totalPrice');
      let produit=[];

      const data=localStorage.getItem('cartItems');
      if(!data){
        handelhome();
        }else{
            JSON.parse(data).map((item)=>{
                produit.push(item.slug)
            })
        } 

      if(!client){
          handellogin();
         
      }else{
        let body={
            adress:e.target.adress.value,
            tel:e.target.tel.value,
            client:client,
            prix:totalPrice,
            produit:produit
           };

      let url=`http://localhost:4000/api/commandes/store`;
      let res=  await  axios.post(url,  body);

      
      if(res.status==200){
        setErr(res.data)
        e.target.adress.value="";
        e.target.tel.value="";
        localStorage.removeItem('cartItems');
    
      } else {
        setexistErr(true);
        setErr(res.data);
       }

      if(existErr==true){
        setErr(res.data)
      }
    }
    }
  
  

    return (
        <Helmet title="Compte">
        <div className={classes.rootPrincipal} >  
        <div className={classes.root}>
            <h3 className={classes.h3}> Info client</h3>

            <form onSubmit={e => {checkAuth(e)}}>

          <TextField  id="standard-basic"name="adress" type="text" label="Adress"  className={classes.inputWidth} />
          <TextField  id="standard-basic"name="tel" type="text" label="Tel"  className={classes.inputWidth} />
        

          <p style={{color:'green',fontSize:"17px"}}> {error} </p>
          <div  className={clsx(classes.partLink,classes.inputWidth)} >

         
            </div>
                  <Button className={clsx(classes.button,classes.inputWidth)}  type="submit">Valider la Commande</Button>

            </form>
           

        </div>
        </div>
        </Helmet>


    )

        } 


export default Compte
