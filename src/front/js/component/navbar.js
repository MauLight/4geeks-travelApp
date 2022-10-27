import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import "../../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light img-fluid sticky-top">
      <div className="logo">
        <img src={logo} />
        <strong>Traveller's Match</strong>
      </div>
        <div className="nav-item ps-3">
          <Link className="item" to="/profile">Profile</Link>
        </div>
        <div className="nav-item ps-3">
          <Link className="item" to="/createtrip">Create trip</Link>
        </div>
        <div className="nav-item ps-3">
          <Link className="item" to="/mytrips">Trips</Link>
        </div>
        
        {/* <div className="nav-item dropdown ps-3">
          <Link 
            to=""
            className="nav-link dropdown-toggle active"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Menu
          </Link>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link to="" className="dropdown-item">
              Configuration
            </Link>
            <Link to="" className="dropdown-item">
              Logout
            </Link>
          </div>
        </div> */}
    </nav>
  );
};

export default Navbar;
