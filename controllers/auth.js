const User = require("../models/user"); //import User class(model) from models folder
const { check, validationResult } = require('express-validator'); //importing express validator
var exressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

exports.signup = (req, res) => {

  //here we are catching the result of the validation applied in our signup routes
  const errors = validationResult(req);

  if (!errors.isEmpty()){
    return res.status(422).json({
        error: errors.array()[0].msg 
    });
  }

  //saving values into user table
  const user = new User(req.body);
  user.save((err, user) => {
    if (err)
      return res.status(400).json({ err: "User cannot be saved in datatbase!" });
    res.json({name: user.firstname +" "+ user.lastname, email: user.email, id: user._id,});
  });
};

exports.signin = (req, res)=>{

  const errors = validationResult(req);

  if (!errors.isEmpty()){
    return res.status(422).json({
        error: errors.array()[0].msg 
    });
  }

  const {email, password} = req.body;
  
  User.findOne({email}, (err, user)=>{
    
    if (err || !user){
      return res.status(400).json({
        error: "User email does not exist!"
      })
    }

    if(!user.authenticate(password)){
      return res.status(401).json({
        error: "Email and password do not match!"
      })
    }

    //create Token
    const token = jwt.sign({_id: user.id}, process.env.SECRET);

    //put token in cokkie
    res.cookie("token", token, { expire: new Date() + 9999 } );

    //send response to front end
    const {_id, firstname, email, role} = user;
    return res.json({token, user:{_id, firstname, email, role}});
      
  });

};

exports.signout = (req, res) => {
  res.clearCookie("token");                        //this method is available because of cookieParser middleware
  res.json({ message: "Signout successfully!" });
};

//Protected routes
exports.isSignedIn = exressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
})

//Custom Middleware

exports.isAuthenticated = (req, res, next)=>{
  let checker = req.profile && req.auth && req.auth._id == req.profile._id;
  if(!checker) return res.json(403).json({error : "Access Denied!!"})
  next();
};

exports.isAdmin = (req, res, next)=>{
  if(req.profile.role===0) return res.json(403).json({error: "Access Denied - You are not an Admin!" }) 
  next();
};