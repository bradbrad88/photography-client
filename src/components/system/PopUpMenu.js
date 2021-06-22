import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/NavBar.css";

const PopUpMenu = props => {
  const ref = useRef();
  const [paddingHeight, setPaddingHeight] = useState();

  useEffect(() => {
    if (!ref.current) return;
    setPaddingHeight(ref.current.clientHeight);
  }, []);

  const menu = () => {
    return props.data.menu?.map(item => {
      return (
        <Link className="nav-item drop-down" to={item.to}>
          {item.title}
        </Link>
      );
    });
  };

  return menu() ? (
    <div
      className={`pop-up-menu ${props.fading ? "fading" : ""}`}
      style={{
        top: `${props.data.top}px`,
        right: `calc(100% - ${props.data.right}px)`,
      }}
      onMouseLeave={props.handleMouseLeave}
      onMouseEnter={props.handleMouseEnter}
      onMouseMove={props.handleMouseEnter}
      ref={ref}
    >
      {menu()}
    </div>
  ) : null;
  // </div>
};

export default PopUpMenu;
