import React from "react";
import { Image } from "./Album";

interface PropTypes {
  image: Image;
}

const ImageBankCard = ({ image }: PropTypes) => {
  const onDragStart = (e: React.DragEvent) => {
    const data = {
      imageId: image.imageId,
      aspectRatio: image.aspectRatio,
    };
    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  };

  return (
    <div className="image-bank-card" key={image.imageId} draggable={false}>
      <img onDragStart={onDragStart} src={image.urls?.thumbnail} alt="" draggable />
    </div>
  );
};

export default ImageBankCard;
