const mongoose = require("mongoose");
const crypto = require("crypto");  //inbuilt library in node.js
const { v4: uuidv4 } = require('uuid'); //uuid will used to generate SALT (unique random number)

var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      maxlength: 32,
      trim: true,
      required: true
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    userinfo: {
      type: String,
      trim: true
    },
    //instead of the storing password directly, we are first encrypting it and then storing into table 
    //we can encrypt the password on the go using "virtuals" (used below)
    encry_password: { 
      type: String,
      required: true
    },
    salt: String,

    role: {
      type: Number,
      default: 0
    },
    purchages: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);


userSchema
  .virtual("password") //taking the user entered password into virtual field
  .set(function(password) {
    this._password = password; //storing the actual password in a private variable
    this.salt = uuidv4(); //generating salt
    this.encry_password = this.securePassword(password); //storing the encrypted pass into encry_password field
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {

  authenticate: function(plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  },

  securePassword: function(plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {return "";}
  }
};
module.exports = mongoose.model("User", userSchema);
