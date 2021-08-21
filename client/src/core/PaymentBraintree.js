import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getmeToken, processPayment } from "./helper/braintreeHelper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import DropIn from "braintree-web-drop-in-react";

const PaymentBraintree = ({
  products,
  reload = undefined,
  setReload = (f) => f
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    error: "",
    clientToken: null,
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((response) => {
      //console.log("token info:", response);
      if (response.error) {
        setInfo({ ...info, error: response.error });
      } else {
        const clientToken = response.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showDropIn = () =>
    info.clientToken !== null && products.length > 0 ? (
      <div className="d-grid gap-2">
        <DropIn
          options={{ authorization: info.clientToken }}
          onInstance={(instance) => (info.instance = instance)}
        />
        <button className="btn btn-success" onClick={onPurchase}>
          Buy
        </button>
      </div>
    ) : (
      <h3>please login or add something to cart!</h3>
    );

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    let nonce;
    let getNonce = info.instance
    .requestPaymentMethod()
    .then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      }
      processPayment(userId, token, paymentData)
        .then(response=>{
          setInfo({...info, loading:false, success:response.success})
          console.log("Payment Success");

          const orderData = { //this code is borrowed from braintree docs
            products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount
          }
          //TODO:
          console.log(orderData);
          createOrder(userId, token, orderData)

          cartEmpty(()=>{console.log("empty cart")})
          setReload(!reload);
        })
        .catch(error=>{
          setInfo({...info, loading:false, success:false})
          console.log("Payment Failed");
        })
    })
  }

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount += p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3 className="text-white">Total Payable Amount: {getAmount()} $</h3>
      {showDropIn()}
    </div>
  );
};

export default PaymentBraintree;
