import React, { useState, useEffect } from "react";
import "../../stylesheets/ImageGallery.css";
const Fullscreen = ({ image, nextImage, previousImage }) => {
  const [comments, setComments] = useState([]);

  const fullscreenClickHandler = e => {
    e.stopPropagation();
  };

  const renderedComments = () => {
    return comments.map(comment => {
      return <div>comment</div>;
    });
  };

  return (
    <div className={"fullscreen-background"}>
      <div className={"image-viewer"} onClick={fullscreenClickHandler}>
        <img src={image.url} />
        <div className={"comment-container"}>
          <div className={"new-comment"}>New Comment</div>
          {renderedComments()}
        </div>
      </div>
    </div>
  );
};

export default Fullscreen;
