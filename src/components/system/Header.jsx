import React from "react";
import { menu } from "assets/svgButtons";
import "stylesheets/System.scss";
import Logout from "components/auth/Logout";

const Header = ({ setToolbar }) => {
  return (
    <div className="header">
      <span onClick={setToolbar}>{menu(44)}</span>
      <h2>React Photography</h2>
      <Logout />
    </div>
  );
};

export default Header;
