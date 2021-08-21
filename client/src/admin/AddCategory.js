import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setSuccess(false);
    setName(e.target.value);
  };

  const errorMessage = () => {
    return (
      <div className="row mt-3">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row mt-3">
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          Category is added successfully!
        </div>
      </div>
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }) //passing name in {} bcz we are stringifying it in adminapicall
      .then((data) => {
        if (data.error) setError(data.error);
        else {
          setName("");
          setError("");
          setSuccess(true);
        }
      });
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group py-4">
        <p className="lead">Enter the category:</p>
        <input
          type="text"
          className="form-control"
          autoFocus
          required
          placeholder="eg. Summer"
          value={name}
          onChange={handleChange}
        />
        <br />
        <button className="btn rounded btn-outline-info" onClick={onSubmit}>
          Create Category
        </button>
      </div>
    </form>
  );

  const goBack = () => (
    <div className="mb-3">
      <Link className="btn rounded btn-sm btn-dark" to="/admin/dashboard">
        Admin Dashboard
      </Link>
    </div>
  );

  return (
    <Base
      title="Add category"
      description="Welcome to category creation section!"
      className="container rounded bg-info p-4"
    >
      {goBack()}
      <div className="row rounded bg-dark text-white m-0">
        <div className="col-md-8 offset-md-2">    
          {errorMessage()}
          {successMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
