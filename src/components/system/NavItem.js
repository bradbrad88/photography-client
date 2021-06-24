import React, { useRef } from "react";
import "../../stylesheets/NavBar.css";
import { Link } from "react-router-dom";

const NavItem = props => {
  const ref = useRef();

  const onMouseEnter = () => {
    const el = ref.current;
    const right = el.offsetLeft + el.offsetWidth;
    const top = el.offsetTop + el.offsetHeight;
    const popUpList = {
      menu: props.menu,
      right: right,
      top: top,
    };
    props.popUp(popUpList);
  };
  const onMouseLeave = () => {
    if (!props.popUp) return;
    props.handleMouseLeave();
  };

  return (
    <div className={"nav-container"} ref={ref}>
      <Link
        className={"nav-item"}
        to={props.href}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {props.title}
      </Link>
    </div>
  );
};

export default NavItem;
