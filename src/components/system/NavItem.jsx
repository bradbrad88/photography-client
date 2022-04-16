import React from "react";
import { useNavigate } from "react-router-dom";

const NavItem = ({ title, icon, path, iconSize = 40 }) => {
  const nav = useNavigate();
  const onClick = () => {
    nav(path);
  };
  return (
    <>
      <p className="navitem gallery text" onClick={onClick}>
        {title}
      </p>
      <span className="navitem gallery icon" onClick={onClick}>
        {icon(iconSize)}
      </span>
    </>
  );
};

export default NavItem;
