var express = require("express");
var router = express.Router();

const {
  getProductById,
  createProduct,
  getphoto,
  getProduct,
  deleteProduct,
  updateProduct,
  getAllProduct,
  getAllUniqueCategories,
} = require("../controllers/product");

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//Params
router.param("userId", getUserById);
router.param("productId", getProductById);

//Create route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//Read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", getphoto);
router.get("/products", getAllProduct);
router.get("/products/categories", getAllUniqueCategories);

//delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//exports this routes
module.exports = router;
