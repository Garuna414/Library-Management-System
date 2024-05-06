import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink to="/" className="navTitle">
          LMS
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="navLink normal-weight">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/addBook" className="navLink normal-weight">
                Add Book
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/findBook" className="navLink normal-weight">
                Find Book
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/updateBook" className="navLink normal-weight">
                Update Book
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/removeBook" className="navLink normal-weight">
                Remove Book
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/borrowBook" className="navLink normal-weight">
                Borrow Book
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
