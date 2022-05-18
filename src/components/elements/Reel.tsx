import React from "react";
import { useRef } from "react";
import { back, forward } from "assets/svgButtons";
import "./stylesheets/Reel.scss";

interface PropTypes {
  images: string[];
}

const Reel = ({ images }: PropTypes) => {
  const ref = useRef<HTMLDivElement>(null);
  const classes = "reel";

  const onClickLeft = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    ref.current?.scrollBy({ left: -20, behavior: "smooth" });
  };

  const onClickRight = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    ref.current?.scrollBy({ left: 20, behavior: "smooth" });
    console.log(ref.current);
  };

  const renderImages = () => {
    return (
      <div ref={ref} className="image-slider">
        {images.map(image => (
          <img src={image} alt={image} key={image} />
        ))}
      </div>
    );
  };
  return (
    <div className={classes}>
      <button className="left" onClick={onClickLeft}>
        {back(40)}
      </button>
      {renderImages()}
      <button className="right" onClick={onClickRight}>
        {forward(40)}
      </button>
    </div>
  );
};

export default Reel;
