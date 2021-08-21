const express = require("express");
const router = express.Router();
const {getUserById} = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment} = require("../controllers/paymentBraintree");

//Params
router.param("userId", getUserById);

router.get(
  "/payment/gettoken/:userId",
  isSignedIn, 
  isAuthenticated, 
  getToken);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
