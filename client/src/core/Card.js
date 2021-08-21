import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const CardTitle = product ? product.name : "Default Title";
  const CardDescription = product ? product.description : "Default Description";
  const CardPrice = product ? product.price : "Default Price";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = (redirect) => {
    if (redirect) return <Redirect to="/cart" />;
  };

  const showAddtoCart = () => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark shadow-sm border-0">
      <div className="card-body">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <h5>{CardTitle}</h5>
        <p className="small text-muted text-white font-italic">{CardDescription}</p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {CardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddtoCart()}</div>
          <div className="col-12">{showRemoveFromCart()}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
