var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator'); //importing express validator
const {signup,signout, signin, isSignedIn} = require("../controllers/auth"); //importing from controller

//Signup route
router.post("/signup", [
    check("firstname","Firstname must be of at least of 3 char long!").isLength({ min: 3 }),
    check("email","Invalid email!").isEmail(),
    check("password","Password must be of at least of 5 char long").isLength({ min: 5 })
], signup);

//Signin route
router.post("/signin", [
    check("email","Invalid email!").isEmail(),
    check("password","Invalid Password!").isLength({ min: 1 })
], signin);

//Singout
router.get("/signout", signout);

//isSignedIn ? route
router.get("/testroute", isSignedIn, (req, res)=>{
    res.send("A protected route");
});

module.exports = router;
