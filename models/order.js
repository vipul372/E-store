const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productsInCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product"
  },
  name: String,
  count: Number,
  price: Number
});

var orderSchema = new mongoose.Schema(
  {
    products: [productsInCartSchema],
    transaction_id: {},
    amount: Number,
    address: String,
    status: {
      type: String,
      default: "Received",
      enum: ["Received","Shipped","Processing","Delivered","Cancelled"]
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const ProductsInCart = mongoose.model("ProductsInCart", productsInCartSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, ProductsInCart };
