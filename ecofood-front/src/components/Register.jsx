import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
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

import { useSelector,useDispatch } from "react-redux";

// import {setUser} from '../../redux/user-slice';
import axios from 'axios';
import Helmet from '../components/Helmet'
// import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({

    rootPrincipal: {
      
            display:'flex',
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
        width: '75%',
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
        fontSize:'80px',
        marginLeft:'40px',
    },
    grid:{
        display: 'flex',
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

    const history = useHistory();

    const handelclick = () => {
        history.push('/Compte');
    }



    const[error,setErr]=useState("");
    const[email,setEmail]=useState("");
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
      setEmail(e.target.email.value);
      let body={
        nom:e.target.nom.value,
        prenom:e.target.prenom.value,
        email:e.target.email.value,
        tel:e.target.tel.value,
        password:e.target.password.value
      };

      let url=`http://localhost:4000/api/clients/store`;
      let res=  await  axios.post(url,body );

      if(res.status==200){
          localStorage.setItem("email",e.target.email.value)
          handelclick();
        
      } else if (res.status==201){ {
        setexistErr(true);
        setErr(res.data.message);
       }
    }

    }
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


    return (
        <Helmet title="Compte">
    <div className={classes.rootPrincipal} >  
        <div className={classes.root}>
            <h3 className={classes.h3}> Inscription client</h3>

    <form onSubmit={e => {checkAuth(e)}}>
        <div className={classes.grid}>
          <TextField  id="standard-basic"name="nom" type="text" label="Nom" className={classes.inputWidth} />
          <TextField  id="standard-basic"name="prenom" type="text" label="Prenom" className={classes.inputWidth} />
        </div>
        <div className={classes.grid}>
          <TextField  id="standard-basic"name="email" type="email" label="Email" className={classes.inputWidth} />
          <TextField  id="standard-basic"name="tel" type="text" label="Tel" className={classes.inputWidth} />
        </div>
          <FormControl className={classes.inputWidth}>
          <TextField 
          name="password"
          id="standard-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          label="Password"
          endAdornment={
          <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {values.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
          </InputAdornment>
          }
          />
          </FormControl>

          <p style={{color:'red',fontSize:"17px"}}> {error} </p>
          <div  className={clsx(classes.partLink,classes.inputWidth)} >

          <FormControlLabel  
              value="end"
              control={<Checkbox color="primary" />}
              label="Rester connecté"
              labelPlacement="end"
            />
            <a href="#" style={{textDecoration:"none",color:"#A8A8A7",fontSize:"17px"}}>Mot de passe oublié</a>
            </div>
                  <Button className={clsx(classes.button,classes.inputWidth)} type="submit">Register</Button>

                  <div style={{color:"#A8A8A7",fontSize:"17px"}} onClick={handelclick}>Authentifie?  <p style={{textDecoration:"none",color:"#7CBD4F",fontSize:"17px"}} >Login Ici</p> </div>

            </form>
         
        </div>
  </div>
        </Helmet>


    )

        } 


export default Compte
