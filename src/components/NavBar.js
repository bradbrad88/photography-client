import React from "react";
import NavItem from "./NavItem";
import "../stylesheets/NavBar.css";

const NavBar = () => {
  return (
    <div className="header">
      <h1 className="title">Far Out Photography</h1>
      <div className="nav-bar">
        <NavItem title="Gallery" href="/gallery" />
        <NavItem title="Blog" href="/blog" />
        <NavItem title="Contact" href="/help" />
      </div>
    </div>
  );
};

export default NavBar;
