import React, { useState, useEffect, useRef, useContext } from "react";
import EditContext from "../contexts/GalleryEditContext";
import "../../stylesheets/ImageGallery.css";
import "../../stylesheets/GalleryEdit.css";

const ImageCard = ({ image }) => {
  const [spans, setSpans] = useState(0);
  const editContext = useContext(EditContext);
  const imageRef = useRef();

  useEffect(() => {
    if (imageRef.current) {
      getSpans();
      imageRef.current.addEventListener("load", getSpans);
      imageRef.current.addEventListener("load", blurring);
      imageRef.current.addEventListener("load", displayImage);
      imageRef.current.addEventListener("resize", getSpans);
      window.addEventListener("resize", getSpans);
    }
  }, [image.emphasize]);

  const getSpans = () => {
    if (!imageRef.current) return;
    const height = imageRef.current.clientHeight;
    const span = Math.ceil(height + 20);
    if (span === spans) return;
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

  const onClick = e => {
    e.stopPropagation();
    if (!editContext) return;
    editContext.toggleSelectedDisplay(image.image_id);
  };
  const onDoubleClick = () => {};

  return (
    <>
      <img
        className={`image-card ${image.selected ? "selected" : ""}`}
        style={{
          gridRowEnd: `span ${spans}`,
          gridColumnEnd: `span ${image.emphasize}`,
        }}
        src={image.url}
        alt={image.image_desc}
        ref={imageRef}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      />
    </>
  );
};

export default ImageCard;
