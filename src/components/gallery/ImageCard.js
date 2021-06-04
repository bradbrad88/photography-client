import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import "../../stylesheets/ImageGallery.css";

const ImageCard = ({ image, selected, onSelect }) => {
  const [spans, setSpans] = useState(0);
  const imageRef = useRef();
  const userContext = useContext(UserContext);
  const location = useLocation();
  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.addEventListener("load", getSpans);
      imageRef.current.addEventListener("load", blurring);
      imageRef.current.addEventListener("load", displayImage);
      window.addEventListener("resize", getSpans);
    }
  }, []);
  const getSpans = () => {
    if (!imageRef.current) return;
    const height = imageRef.current.clientHeight;
    const span = Math.ceil(height + 20);
    setSpans(span);
  };
  const blurring = () => {
    let load = 0;
    const blur = () => {
      load++;
      if (load > 49) {
        clearInterval(int);
      }
      if (imageRef.current)
        imageRef.current.style.filter = `blur(${scale(load, 0, 50, 10, 0)}px)`;
    };
    let int = setInterval(blur, 10);
    const scale = (num, in_min, in_max, out_min, out_max) => {
      return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    };
  };
  const displayImage = () => {
    if (!imageRef.current) return;
    imageRef.current.style.visibility = "visible";
  };

  const editMode = () => {
    const editMode = location.pathname === "/gallery/edit";
    return editMode;
  };

  const clickHandler = () => {
    onSelect(image.image_id);
  };

  return (
    <div style={{ gridRowEnd: `span ${spans}`, position: "relative" }}>
      <img
        ref={imageRef}
        className={`image-card ${selected && editMode() ? "active" : ""}`}
        src={image.url}
        alt={image.image_desc}
        onClick={clickHandler}
      />
    </div>
  );
};

export default ImageCard;
