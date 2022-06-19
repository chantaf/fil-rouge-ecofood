import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link ,useHistory} from 'react-router-dom'
import Info from '../pages/Info'
import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import Modal from '@mui/material/Modal';
import productData from '../assets/fake-data/products'
import numberWithCommas from '../utils/numberWithCommas'
import { Form , FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const Cart = () => {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const cartItems = useSelector((state) => state.cartItems.value)

    const [cartProducts, setCartProducts] = useState(productData.getCartItemsInfo(cartItems))

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setCartProducts(productData.getCartItemsInfo(cartItems))
        setTotalPrice(cartItems.reduce((total, item) => total + (Number(item.quantity) * Number(item.price)), 0))
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    }, [cartItems])


    const history = useHistory();

    const handelclick = () => {
        if(localStorage.getItem('client') === null){
            history.push('/Compte');
        }else{
            history.push('/Info');
        }
       
    }


    return (
        <Helmet title="Panier">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                            Votre Commande contien {totalProducts} produits
                        </p>
                        <div className="cart__info__txt__price">
                            <span>Prix Total:</span> <span>{Number(totalPrice)}</span>
                            {localStorage.setItem('totalPrice', totalPrice)}
                        </div>
                    </div>
                    <div className="cart__info__btn ">
                     
                        <Button size="block" onClick={handelclick}>
                            Valider
                        </Button>
                   

                  
                    <Link to="/">
                            <Button size="block">
                                Menu
                            </Button>
                    </Link>
                        
                    </div>
                </div>
                <div className="cart__list">
                    {
                        cartProducts.map((item, index) => (
                            <CartItem item={item} key={index}/>
                        ))
                    }
                </div>
            </div>

        </Helmet>

    



    )

    
}

export default Cart
