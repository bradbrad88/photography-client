import React, { useState, useRef, useEffect } from "react";
import Welcome from "./Welcome";
import About from "./About";
import ImageFlare from "./ImageFlare";
import Footer from "./Footer";
import "../../stylesheets/Landing.css";

const Landing = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const landingRef = useRef();
  const handleResize = e => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  return (
    <div ref={landingRef} className={"landing"}>
      <Welcome />
      <About windowHeight={windowSize.height} windowWidth={windowSize.width} />
      <ImageFlare windowHeight={windowSize.height} windowWidth={windowSize.width} />
      <Footer />
    </div>
  );
};

export default Landing;
