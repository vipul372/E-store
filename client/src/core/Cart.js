import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PaymentBraintree from "./PaymentBraintree";
// import StripeCheckout from "./helper/StripeCheckout.js";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setProducts(loadCart())
  }, [reload])

  const loadAllProducts = (products) => {
    return(
      <div>
        <h2>Products in your cart!</h2>
        {products && products.map((product, index)=>{
          return(
              <Card 
              key={index}
              product={product}
              addtoCart={false}
              removeFromCart={true}
              reload = {reload}
              setReload={setReload}
              />
          )
        })}
      </div>
    )
  }
  

  return (
    <Base title="Shopping Cart" description="Ready to Checkout!">
      <div className="row text-center">
        <div className="col-sm-6">{products.length > 0 ? loadAllProducts(products) : (<h3>No product in Cart</h3>)}</div>
        <div className="col-sm-6">
          <PaymentBraintree
            products={products}
            reload={reload}
            setReload={setReload}
          />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
