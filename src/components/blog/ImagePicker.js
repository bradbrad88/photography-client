import React, { useState, useEffect, useContext } from "react";
import ImagePickerCard from "./ImagePickerCard";
import { fetchAll } from "../../utils/gallery";
import UserContext from "../contexts/UserContext";

const ImagePicker = ({ onSelection, clickAway }) => {
  const [imageList, setImageList] = useState([]);
  const user = useContext(UserContext);
  useEffect(() => {
    window.addEventListener("click", clickAway);
    getAllImageThumbnails();
    return () => window.removeEventListener("click", clickAway);
  }, []);

  const getAllImageThumbnails = async () => {
    const { data, error } = await fetchAll(user.token);
    if (error) {
      return;
    }

    setImageList(data);
  };

  const handleImageSelection = image => {
    onSelection(image);
  };

  const handleRemove = () => {
    onSelection("none");
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
      <div className={"image-picker-container"}>
        {renderedList()}
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};
export default ImagePicker;
