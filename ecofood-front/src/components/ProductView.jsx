import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router";

import { useDispatch } from "react-redux";

import { addItem } from "../redux/shopping-cart/cartItemsSlide";
import { remove } from "../redux/product-modal/productModalSlice";
import { useParams } from "react-router";


import Button from "./Button";
import numberWithCommas from "../utils/numberWithCommas";

const ProductView = (props) => {
  const [product, setProduct] = useState(null);
  const params = useParams();

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:4000/api/produits/${params.slug}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setProduct(result);
        // console.log("prod", product.nom);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const dispatch = useDispatch();


  const [descriptionExpand, setDescriptionExpand] = useState(false);



  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  // useEffect(() => {
  //     setPreviewImg(product.image01)
  //     setQuantity(1)
  //     setColor(undefined)
  //     setSize(undefined)
  // }, [product])

  // const check = () => {
  //     if (color === undefined) {
  //         alert('Vui lòng chọn màu sắc!')
  //         return false
  //     }

  //     if (size === undefined) {
  //         alert('Vui lòng chọn kích cỡ!')
  //         return false
  //     }

  //     return true
  // }

  const addToCart = () => {

    let newItem = {
      slug: product._id,
      price: product.prix,
      nom: product.nom,
      quantity: quantity,
      image: product.image,
    };
    if (dispatch(addItem(newItem))) {
      alert("Success");
    } else {
      alert("Fail");
    }
    // console.log(newItem);
  };

  const goToCart = () => {
    props.history.push("/cart");
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div className="product__images__list__item">
            <img src={product?.image} alt="#" />
          </div>
          <div className="product__images__list__item">
            <img src={product?.image} alt="#" />
          </div>
        </div>
        <div className="product__images__main">
                    <img src={product?.image} alt="#"  />
        </div>
        <div
          className={`product-description ${descriptionExpand ? "expand" : ""}`}
        >
          <div className="product-description__title">Discription</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          ></div>
          <div className="product-description__toggle">
            <Button onClick={() => setDescriptionExpand(!descriptionExpand)}>
              {descriptionExpand ? "Moins Infos" : "Plus Infos"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product?.nom}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">{product?.prix}</span>
        </div>
       
        <div className="product__info__item">
          <div className="product__info__item__title">Personne</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <Button onClick={() => addToCart()}>Ajouter au panier</Button>
          <Button onClick={() => goToCart()}>Commander</Button>
        </div>
      </div>
      <div
        className={`product-description mobile ${
          descriptionExpand ? "expand" : ""
        }`}
      >
        <div className="product-description__title">Discription</div>
        <div
          className="product-description__content"
          dangerouslySetInnerHTML={{ __html: product?.description }}
        ></div>
        <div className="product-description__toggle">
          <Button
            size="sm"
            onClick={() => setDescriptionExpand(!descriptionExpand)}
          >
            {descriptionExpand ? "Moins Infos" : "Plus Infos"}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default withRouter(ProductView);
