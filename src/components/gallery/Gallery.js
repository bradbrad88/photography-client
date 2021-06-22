import React, { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import { fetchGallery } from "../../utils/gallery";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    getGallery();
  }, []);
  const getGallery = async () => {
    const images = await fetchGallery();
    setGallery(images.data);
  };
  console.log("Gallery:", gallery);
  return <ImageGallery images={gallery} />;
};

export default Gallery;
