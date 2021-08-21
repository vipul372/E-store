import React from 'react';
import Menu from './Menu';

const Base = ({
  title = "My Title",
  description = "My description",
  className = "text-white p-4",
  children
}) => (
  <div>
    <Menu/>
    <div className="container-fluid mb-1">
      <div className="jumbotron bg-dark text-white text-center py-1">
        <h4 className="display-6">{title}</h4>
        <p className="lead text-muted">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>

    <footer className="footer bg-dark mt-auto">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h5>Feel free to reach out to us!</h5>
        <button className="btn btn-warning btn lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">An amazing online store</span>
      </div>
    </footer>

  </div>
)

export default Base;