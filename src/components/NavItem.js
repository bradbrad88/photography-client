import React from "react";
import "../stylesheets/NavBar.css";
import { Link } from "react-router-dom";

const NavItem = (props) => {
  return (
    <Link className="nav-item" to={props.href}>
      {props.title}
    </Link>
  );
};

export default NavItem;
