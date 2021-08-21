import React, { useState, useEffect } from "react";
import { Link , Redirect} from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({match}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setSuccess(false);
    setName(e.target.value);
  };

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

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
          Category updated successfully!
        </div>
      </div>
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    updateCategory(match.params.categoryId ,user._id, token, { name }) //passing name in {} bcz we are stringifying it in adminapicall
      .then((data) => {
        if (data.error) setError(data.error);
        else {
          setName("");
          setError("");
          setSuccess(true);
        }
      });
  };

  const performRedirect = () => {
    if(success) return <Redirect to="/admin/categories"/>
  }

  const myCategoryForm = () => (
    <form>
      <div className="form-group py-4">
        <p className="lead">Update the category:</p>
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
          Update Category
        </button>
      </div>
    </form>
  );

  const goBack = () => (
    <div className="mb-3">
      <Link className="btn rounded btn-sm btn-dark" to="/admin/categories">
        Back
      </Link>
    </div>
  );

  return (
    <Base
      title="Update Category"
      description="Welcome to category management section!"
      className="container rounded bg-info p-4"
    >
      {goBack()}
      <div className="row rounded bg-dark text-white m-0">
        <div className="col-md-8 offset-md-2">    
          {errorMessage()}
          {successMessage()}
          {myCategoryForm()}
          {performRedirect()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
