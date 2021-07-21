import React, { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import { fetchGallery } from "../../utils/gallery";
import { Grid } from "react-spinners-css";

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
  if (!options || !gallery)
    return <Grid color={"#000"} size={120} className={"loading-spinner"} />;
  return <ImageGallery images={gallery} options={options} />;
};

export default Gallery;
