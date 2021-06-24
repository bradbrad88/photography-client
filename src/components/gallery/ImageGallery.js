import React, { useState, useContext } from "react";
import ImageCard from "./ImageCard";
import { fetchGallery } from "../../utils/gallery";
import "../../stylesheets/ImageGallery.css";

const ImageGallery = ({ images, options }) => {
  const [savedGallery, setSavedGallery] = useState(null);
  const [error, setError] = useState(null);

  const getGallery = async () => {
    const gallery = await fetchGallery();
    if (gallery.error) return setError(gallery.error);
    setSavedGallery(gallery.data);
  };

  if (!savedGallery && !error) getGallery();

  // const [suggestedGallery, setSuggestedGallery] = useState(null);
  // const [selected, setSelected] = useState([]);
  // const userContext = useContext(UserContext);
  // if (location.pathname !== "/gallery/edit" && selected.length > 0) setSelected([]);
  // const history = useHistory();
  // const location = useLocation();
  // const onEditGallery = event => {
  //   event.preventDefault();
  //   if (userContext.authenticated) history.push("/gallery/edit");
  // };
  // const editMode = () => {
  //   return location.pathname === "/gallery/edit";
  // };
  // const onDelete = async () => {
  //   try {
  //     const options = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: userContext.authenticated,
  //       },
  //       body: JSON.stringify(selected),
  //       method: "POST",
  //     };
  //     const result = await fetch("http://localhost:5000/gallery/delete", options);
  //     const data = await result.json();
  //     setSavedGallery(data);
  //     setSelected([]);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  // const onEmphasize = () => {
  //   const mapValues = `(${selected.map(item => item)})`;
  //   console.log(mapValues);
  // };
  // const onGroupSelect = () => {
  //   if (selected.length === savedGallery.length) return setSelected([]);
  //   const selectAll = savedGallery.map(img => img.image_id);
  //   setSelected(selectAll);
  // };
  // const onSelect = image_id => {
  //   if (location.pathname !== "/gallery/edit") return;
  //   if (!isSelected(image_id)) return setSelected([...selected, image_id]);
  //   const newSelection = selected.filter(el => el !== image_id);
  //   setSelected(newSelection);
  // };
  // const isSelected = key => {
  //   return selected.includes(key);
  // };
  // const handleDragStart = image => {
  //   // setDragItem(image);
  // };
  // const handleDragEnter = image => {};
  // const handleDragEnd = image => {};

  const imageCards = images?.map(image => {
    return <ImageCard image={image} key={image.image_id} />;
  });
  console.log("options", options);
  if (error)
    return (
      <div className={"gallery error"}>
        Unable to load image gallery
        <br />
        {error}
        <button className={"btn-gallery-refresh"} onClick={getGallery}>
          Refresh
        </button>
      </div>
    );

  return (
    <div className="gallery">
      <div
        className="image-gallery"
        style={{
          gridTemplateColumns: `repeat(${options.gallery_columns}, minmax(350px, 1fr))`,
        }}
      >
        {imageCards}
      </div>
    </div>
  );
};

export default ImageGallery;
