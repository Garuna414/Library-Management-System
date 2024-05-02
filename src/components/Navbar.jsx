import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/navbar.css";

function Navbar() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navTitle">
            <a className="navbar-brand" href="/">
              LMS
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link
                to="/"
                className="navLink normal-weight"
              >
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
              </Link>
              <Link
                to="/addBook"
                className="navLink normal-weight"
              >
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Add Book
                  </a>
                </li>
              </Link>
              <Link
                to="/findBook"
                className="navLink normal-weight"
              >
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Find Book
                  </a>
                </li>
              </Link>
              <Link
                to="/updateBook"
                className="navLink normal-weight"
              >
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Update Book
                  </a>
                </li>
              </Link>
              <Link
                to="/removeBook"
                className="navLink normal-weight"
              >
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Remove Book
                  </a>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </BrowserRouter>
  );
}

export default Navbar;
