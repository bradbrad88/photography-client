import React, { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import { fetchGallery } from "../../utils/gallery";
import { Grid } from "react-spinners-css";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState();
  // const [options, setOptions] = useState();
  useEffect(() => {
    getGallery();
  }, []);

  const getGallery = async () => {
    const { data, error } = await fetchGallery();
    if (error) return setError(error);
    console.log("data", data);
    setGallery(data);
    // setOptions(images.options);
  };

  if (error) return <div>Oops, something went wrong! Please try again soon.</div>;

  if (!gallery)
    return <Grid color={"#000"} size={120} className={"loading-spinner"} />;

  return <ImageGallery images={gallery} />;
};

export default Gallery;
