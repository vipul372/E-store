import React, { useState } from "react";
import Base from "../core/Base";
import {Redirect} from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../auth/helper';

const Signin = () => {

  const [values, setValues] = useState({
    email:"vipul@gmail.com",
    password:"12345678",
    error:"",
    loading: false,
    didRedirect: false
  });

  const {email, password, error, loading, didRedirect} = values;
  const {user} = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading:true });
    signin({ email, password })
      .then((data) => {
        if (data.error)
          setValues({ ...values, error: data.error, loading: false });
        else
          authenticate(data, ()=>{
            setValues({
              ...values,
              didRedirect:true
            })
          })
      })
      .catch((error) => console.log(error));
  };

  const performRedirect = () => {
    if(didRedirect){
      if(user && user.role === 1)
        return <Redirect to="/admin/dashboard"/> 
      else
        return <Redirect to="/user/dashboard"/> 
    } 
    if(isAuthenticated())
      return <Redirect to="/"/> 
  }

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signinForm = () =>{
    return(
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
          <div className="form-group">
              <label className="text-light">Email:</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password:</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div><br/>
            <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
          </form>
        </div>
      </div>
    )
  }

  return(
    <Base title="Sign in" description="If already a member!">
      {loadingMessage()}
      {errorMessage()}
      {signinForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  )
}
  

export default Signin;
