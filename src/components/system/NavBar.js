import React, { useState, useRef, useEffect, useContext } from "react";
import NavItem from "./NavItem";
import Profile from "./Profile";
import PopUpMenu from "./PopUpMenu";
import UserContext from "../contexts/UserContext";
import "../../stylesheets/NavBar.css";

const NavBar = () => {
  const [opacity, setOpacity] = useState(100);
  const [fading, setFading] = useState(false);
  const [popUpList, setPopUpList] = useState();
  const [timer, setTimer] = useState();
  const [visible, setVisible] = useState(false);
  const userContext = useContext(UserContext);
  const ref = useRef();
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);

  const onScroll = e => {
    const scroll = e.target.scrollingElement;
    const getOpacity = () => {
      if (!ref.current) return opacity;
      const result = 100 - (scroll.scrollTop / ref.current.clientHeight) * 100;
      if (result < 0) return 0;
      return result;
    };
    setOpacity(getOpacity());
  };

  const resetTimer = () => {
    clearTimeout(timer);
    setTimer(setTimeout(() => setVisible(false), 1000));
    setFading(true);
  };
  const stopTimer = () => {
    setFading(false);
    clearTimeout(timer);
  };

  const mouseEnter = () => {
    setFading(false);
    stopTimer();
  };
  const mouseLeave = () => {
    setFading(true);
    resetTimer();
  };

  const newPopUp = list => {
    setPopUpList(list);
    setFading(false);
    setVisible(true);
    stopTimer();
  };

  const gallery = () => {
    return [
      {
        to: "/edit/gallery",
        title: "Edit",
      },
    ];
  };

  const blog = () => {
    return [
      {
        to: "/blog/edit",
        title: "Edit",
      },
    ];
  };

  return (
    <div
      ref={ref}
      className="header"
      style={{
        opacity: `${opacity}%`,
        visibility: `${opacity === 0 ? "hidden" : "visible"}`,
      }}
    >
      <h1 className="title">Far Out Photography</h1>
      <div className="nav-bar">
        <NavItem
          title="Gallery"
          href="/"
          menu={gallery()}
          popUp={newPopUp}
          handleMouseLeave={mouseLeave}
          handleMouseOver={mouseEnter}
        />
        <NavItem
          title="Blog"
          href="/blog"
          popUp={newPopUp}
          handleMouseLeave={mouseLeave}
          handleMouseOver={mouseEnter}
        />
        <NavItem
          title="Login"
          href="/login"
          popUp={newPopUp}
          handleMouseOver={mouseEnter}
          handleMouseLeave={mouseLeave}
        />
      </div>
      <Profile />
      {visible && userContext.authenticated && (
        <PopUpMenu
          data={popUpList}
          handleMouseEnter={mouseEnter}
          handleMouseLeave={mouseLeave}
          fading={fading}
        />
      )}
    </div>
  );
};

export default NavBar;
