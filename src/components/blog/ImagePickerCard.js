import React from "react";

const ImagePickerCard = ({ image, clickHandler }) => {
  const onClick = () => {
    clickHandler(image);
  };

  return (
    <div
      style={{ backgroundImage: `url(${image.thumbnail})` }}
      onClick={onClick}
      className={"image-picker-card"}
    ></div>
  );
};

export default ImagePickerCard;
