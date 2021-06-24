import React, { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import { fetchGallery } from "../../utils/gallery";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [options, setOptions] = useState();
  useEffect(() => {
    getGallery();
  }, []);
  const getGallery = async () => {
    const images = await fetchGallery();
    setGallery(images.data);
    setOptions(images.options);
  };
  console.log("Gallery:", gallery);
  if (!options || !gallery) return <div>loading</div>;
  return <ImageGallery images={gallery} options={options} />;
};

export default Gallery;
