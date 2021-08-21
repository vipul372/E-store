import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

const activeTab = (history, path) =>
  history.location.pathname === path
    ? { color: "#2ecc72" }
    : { color: "#ffffff" };

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark p-1">
        <li className="nav-item">
          <Link style={activeTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={activeTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role===0 && (
          <li className="nav-item">
          <Link
            style={activeTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role===1 &&(

        <li className="nav-item">
          <Link
            style={activeTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            Admin Dashboard
          </Link>
        </li>
        )}
        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                style={activeTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={activeTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Sign in
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Sign out
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
