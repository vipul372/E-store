const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 32,
    trim: true,
    required: true,
    unique:true
  }
}, {timestamps:true});

module.exports = mongoose.model("Category",categorySchema);