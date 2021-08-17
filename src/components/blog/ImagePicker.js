import React, { useState, useEffect } from "react";
import ImagePickerCard from "./ImagePickerCard";
import { fetchAll } from "../../utils/gallery";

const ImagePicker = ({ onSelection, clickAway }) => {
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    window.addEventListener("click", clickAway);
    getAllImageThumbnails();
    return () => window.removeEventListener("click", clickAway);
  }, []);

  const getAllImageThumbnails = async () => {
    const images = await fetchAll();
    setImageList(images);
  };
  console.log("imagelist", imageList);

  const handleImageSelection = image => {
    console.log("picker", image);
    onSelection(image);
  };

  const renderedList = () => {
    return imageList.map(image => {
      return (
        <ImagePickerCard
          key={image.image_id}
          image={image}
          clickHandler={handleImageSelection}
        />
      );
    });
  };

  return (
    <div className={"image-picker-background"}>
      <div className={"image-picker-container"}>{renderedList()}</div>
    </div>
  );
};
export default ImagePicker;
