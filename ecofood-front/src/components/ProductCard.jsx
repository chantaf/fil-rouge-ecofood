import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import swal from "sweetalert";
import { useDispatch } from 'react-redux'

import { addItem } from "../redux/shopping-cart/cartItemsSlide";

import { set } from '../redux/product-modal/productModalSlice'

import Button from './Button'

import numberWithCommas from '../utils/numberWithCommas'

const ProductCard = props => {

    const [product, setProduct] = useState(null);
//   const params = useParams();

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:4000/api/produits/${props.slug}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setProduct(result);
        // console.log("prod", product.nom);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

    const dispatch = useDispatch()

    const addToCart = () => {
        // if (check()) {
        let newItem = {
          slug: product._id,
          price: product.prix,
          nom: product.nom,
          quantity: quantity,
          image: product.image,
        };

        if (dispatch(addItem(newItem))) {
          swal({
            title: "Produit Ajouté avec success!",
            text: "",
            icon: "success",
            button: "Ok",
          });
        } else {
          alert("Fail");
        }
        // console.log(newItem);
      };
    return (

        
        <div className="product-card">
            <Link to={`/catalog/${props.slug}`}>
                <div className="product-card__image">
                    <img src={props.img01} alt="" />
                    <img src={props.img02} alt="" />
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {props.price}
                    <span className="product-card__price__old">
                        {/* <del>{numberWithCommas(399000)}</del> */}
                    </span>
                </div>
            </Link>
            <div className="product-card__btn">
                <Button
                    // size="sm"    
                    icon="bx bx-cart"
                    animate={true}
                    onClick={() => addToCart()}
                >
                    Commander
                </Button>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
}

export default ProductCard
