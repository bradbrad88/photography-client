import React from "react";

const Reel = ({ className, images = [], imageWidth, width, height }) => {
  const renderImages = () => {
    return images.map(image => (
      <img
        style={{
          width: imageWidth + "px",
          height: height + "px",
          objectFit: "cover",
          objectPosition: "center",
        }}
        src={image.src}
        alt={image.alt}
        key={image.src}
      />
    ));
  };
  return (
    <div style={{ width: width + "px" }} className={className}>
      {renderImages()}
    </div>
  );
};

export default Reel;
