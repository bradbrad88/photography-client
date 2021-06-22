import React, { useState, useEffect, useRef } from "react";
import "../../stylesheets/ImageGallery.css";
import "../../stylesheets/GalleryEdit.css";

const ImageCard = ({ image }) => {
  const [spans, setSpans] = useState(0);
  const imageRef = useRef();

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
      if (imageRef.current) {
        imageRef.current.style.filter = `blur(${scale(load, 0, 50, 10, 0)}px)`;
      }
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

  return (
    <>
      <img
        className={`image-card`}
        style={{ gridRowEnd: `span ${spans}` }}
        src={image.url}
        alt={image.image_desc}
        ref={imageRef}
      />
    </>
  );
};

export default ImageCard;
