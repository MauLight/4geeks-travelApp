import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar justify-content-end sticky-top" style={{backgroundColor: '#efecef'}}>
        <div className="linked">
          <Link className= "link" to="/account/page/1">
            Don't have an Account? Create an Account!
          </Link>
        </div>
    </nav>
  );
};
