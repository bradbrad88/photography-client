import React from "react";
import NavItem from "./NavItem";
import Profile from "./Profile";
import "../../stylesheets/NavBar.css";

const NavBar = () => {
  return (
    <div className="header">
      <h1 className="title">Far Out Photography</h1>
      <div className="nav-bar">
        <NavItem title="Gallery" href="/gallery" />
        <NavItem title="Blog" href="/blog" />
      </div>
      <Profile />
    </div>
  );
};

export default NavBar;
