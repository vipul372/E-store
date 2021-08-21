var express = require("express");
var router = express.Router();


const {getUserById,getUser,updateUser,userPurchaseList} = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");

router.param("userId", getUserById);

//Read route
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/order/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);

//update route
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);


module.exports = router;