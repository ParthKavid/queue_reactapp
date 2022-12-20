import "./doctor.css";
import React from "react";
//import { Link } from "react-router-dom";
function Navibar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand" href="/">
          Queue
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Patient
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Chart
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navibar;
