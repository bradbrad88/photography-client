import React, { useState, useContext, useEffect, useRef } from "react";
import GridLayout from "react-grid-layout";
import EditContext from "contexts/GalleryEditContext";
import ImageGallery from "./ImageGallery";
import ImageCard from "./ImageCard";
import DisplayPanel from "./DisplayPanel";
import { Grid } from "react-spinners-css";
import "stylesheets/GalleryEdit.css";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import { edit } from "assets/svgButtons";

const ImageGalleryEditDisplay = () => {
  const editContext = useContext(EditContext);
  const [dragging, setDragging] = useState(false);

  const onLayoutChange = layout => {
    console.log("LAYOUT CHANGE");
    // if (layout.length < 1) return;
    saveToLS("layouts", layout);
    if (editContext.dragging) return;
    editContext.setLayoutState(layout);
  };

  const getImage = id => {
    const image = editContext.imageBank.find(image => image.image_id === id);
    return <ImageCard image={image} key={image.image_id} ref={React.createRef()} />;
  };

  const cleanLayout = (currentLayout, newLayoutItem) => {
    // const newLayout = currentLayout.filter(layout => layout.i !== "new");
    return [...currentLayout, newLayoutItem];
  };

  const onDrop = (layout, layoutItem, e) => {
    e.preventDefault();
    console.log("ON DROP");
    if (!layoutItem) return;
    const image_id = e.dataTransfer.getData("image-id");
    if (image_id === "") return;
    if (layout.filter(layout => layout.i === image_id).length > 0) return;
    const newImage = getImage(parseInt(image_id));
    const newImageLayout = { ...layoutItem, i: image_id };
    const newLayout = cleanLayout(layout, newImageLayout); // try without cleaning layout - GridLayout may handle this
    // editContext.addImageComponent(image_id);
    editContext.setLayoutState(newLayout);
    editContext.setDragging(false);
  };

  const onDragStart = () => {
    setDragging(true);
  };

  const onDragStop = (layout, oldItemm) => {
    setDragging(false);
  };
  if (editContext.error)
    return (
      <div>
        <p>Something went wrong, please try again soon!</p>
      </div>
    );
  // console.log(editContext.imageDisplay());
  return !editContext.loading ? (
    <GridLayout
      className={"image-gallery edit-mode"}
      cols={12}
      width={1500}
      rowHeight={20}
      layout={editContext.layouts}
      autoSize={true}
      onLayoutChange={onLayoutChange}
      isDroppable={true}
      onDrop={onDrop}
      margin={[20, 20]}
      droppingItem={{ i: "new", h: 6, w: 3 }}
      onDragStart={onDragStart}
      onDragStop={onDragStop}
    >
      {editContext.imageDisplay()}
    </GridLayout>
  ) : (
    <Grid color={"#000"} size={120} className={"loading-spinner"} />
  );
};

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem("rgl", JSON.stringify({ [key]: value }));
  }
}

export default ImageGalleryEditDisplay;
