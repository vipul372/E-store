const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs"); //file system

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, prod) => {
      if (err)
        return res.status(400).json({ 
            error: "Product not dound in database" 
        });
      req.product = prod;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;

  form.parse(req, (err, fields, file) => {
    if (err) return res.status(400).json({ error: "Invalid Image!" });

    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock)
      return res
        .status(400)
        .json({ error: "Please include all mandatory fields" });

    let product = new Product(fields);

    //handling files
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "File size is too big!" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //saving to DB
    product.save((err, prod) => {
      if (err)
        return res.status(400).json({ error: "File couldn't be saved!" });
      res.json(prod);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

//middleware to load our product photo
exports.getphoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product!",
      });
    }
    res.json({
      message: "Deleted Successfully!",
      deletedProduct,
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;

  form.parse(req, (err, fields, file) => {
    if (err) return res.status(400).json({ error: "Invalid Image!" });

    //updation code
    let product = req.product;
    product = _.extend(product, fields); //this method simply copy fields to the product

    //handling files
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "File size is too big!" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //saving to DB
    product.save((err, product) => {
      if (err) return res.status(400).json({ error: "Updation failed!" });
      res.json(product);
    });
  });
};

exports.getAllProduct = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .exec((err, products) => {
      if (err) return res.status(400).json({ error: "No Product found!" });
      return res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, categaory) => {
    if (err) return res.status(400).json({ error: "No category found!!" });
    res.json(categaory);
  });
};

//middleware to update inventory with each item purchase
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.stock, sold: +prod.sold } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err)
      return res.status(400).json({ error: "Inventory updation failed!" });
    next();
  });
};
