import React, { useState, useEffect, useRef } from "react";

import "../../stylesheets/About.css";

const LETTER_DELAY = 0.3;

const About = ({ windowWidth, windowHeight }) => {
  const [percentScrolled, setPercentScrolled] = useState();
  const ref = useRef();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    window.onscroll = () => window.scrollTo(0, 0);
    setTimeout(() => (window.onscroll = null), 3000);
    // return () => (window.onscroll = null);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = e => {
    const rect = ref.current.getBoundingClientRect();
    // console.log("rect", rect);
    let input = ((rect.height - rect.bottom) * 100) / (rect.height - windowHeight);
    if (input < 0) input = 0;
    if (input > 100) input = 100;
    setPercentScrolled(input);
  };

  const getRotateAngle = () => {
    const min = -5;
    const max = -35;
    return (percentScrolled * (max - min)) / 100 + min;
  };

  return (
    <div ref={ref} className={"about"}>
      {/* <p>{percentScrolled}</p> */}

      <div
        className={`drop-in ${
          percentScrolled > 1 && percentScrolled < 100 && "active"
        }`}
      >
        <div class="text">
          <h1>About me</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fugiat
            voluptatibus aspernatur! Praesentium veniam deserunt minima earum magnam
            vel deleniti vitae fugit, cupiditate, perferendis doloribus atque modi
            ipsum possimus aspernatur eaque totam? Molestias odio nihil cum sequi,
            molestiae voluptatum quisquam quidem animi, voluptatem eum laborum
            voluptatibus corporis facere, eligendi odit.
          </p>
          <div
            className={"about-progress"}
            style={{ width: `${percentScrolled}%` }}
          ></div>
        </div>
        <div
          class="image"
          style={{ transform: `rotate(7deg) rotateY(${getRotateAngle()}deg)` }}
        >
          <img
            src="https://far-out-photography-local.s3.ap-southeast-2.amazonaws.com/1632489422889.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default About;
