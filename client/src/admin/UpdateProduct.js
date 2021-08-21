import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategories, getProduct, updateProduct } from "./helper/adminapicall";

const UpdateProduct = ({match}) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    success: false,
    createdProduct: "",
    didRedirect: "false",
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    success,
    createdProduct,
    didRedirect,
    formData,
  } = values;

  const preloadCategories = () =>{
    getCategories().then(data=>{
      if(data.error)
        setValues({...values, error:data.error})
      else
        setValues({
          categories:data, formData: new FormData()
        })
    })
  }

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ 
          ...values,
          photo: data.photo,
          name: data.name,
          description: data.description,
          category:data.category._id,
          price: data.price,
          stock: data.stock,
          formData: new FormData() 
        });
        preloadCategories();
      }
    });
  };

  

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, error: "", success: false, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          category: "",
          loading: false,
          error: "",
          success: true,
          formData: new FormData(),
          createdProduct: data.name,
        });
      }
    });
    //
  };

  const performRedirect = () => {
    if(success) return <Redirect to="/admin/products"/>
  }

  const successMessage = () => {
    return (
      <div className="row">
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          Product updated successfully!
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    );
  };

  const updateProductForm = () => (
    <div className="row">
      <form>
        <div className="form-group p-1">
          <label className="btn btn-block btn-success">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
              value={photo}
            />
          </label>
        </div>
        <div className="form-group p-1">
          <input
            onChange={handleChange("name")}
            className="form-control"
            type="text"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group p-1">
          <textarea
            onChange={handleChange("description")}
            className="form-control"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group p-1">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="form-group p-1">
          <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
          >
            <option>Select</option>
            {categories &&
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group p-1">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={stock}
          />
        </div>
        <br />
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success"
        >
          Update Product
        </button>
      </form>
    </div>
  );

  const goBack = () => (
    <div className="mb-3">
      <Link className="btn rounded btn-sm btn-dark" to="/admin/products">
      Back
      </Link>
    </div>
  );

  return (
    <Base
      title="Update Product"
      description="Welcome to product management section!"
      className="container rounded bg-info p-4"
    >
      {goBack()}
      <div className="row rounded bg-dark text-white m-0 p-4">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {updateProductForm()}
          {performRedirect()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
