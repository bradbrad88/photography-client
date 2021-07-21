import React, { useState, useEffect, useRef } from "react";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { fetchComments } from "../../utils/gallery";
import { menu, close, arrowLeft, arrowRight } from "../../assets/svgButtons";
import "../../stylesheets/ImageGallery.css";
import { Grid } from "react-spinners-css";
const Fullscreen = ({ image, nextImage, previousImage, exit }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState(false);
  useEffect(() => {
    setLoading(true);
    getImage();
    getComments();
  }, [image]);

  const getImage = () => {
    const img = new Image();
    img.src = image.highres;
    img.onload = () => setLoading(false);
    window[img.src] = img;
  };

  const getComments = async () => {
    const imageComments = await fetchComments(image.image_id);
    setComments(imageComments);
  };

  const fullscreenClickHandler = e => {
    e.stopPropagation();
  };

  const handleMenu = () => {
    setCommentsVisible(!commentsVisible);
  };

  const renderedComments = () => {
    return comments.map(comment => {
      return (
        <Comment
          comment={comment}
          setReplyForm={comment.children ? true : false}
          refreshComments={getComments}
        />
      );
    });
  };

  return (
    <div className={"fullscreen-background"}>
      <div className={"image-viewer"} onClick={fullscreenClickHandler}>
        {loading && <Grid color={"#fff"} size={120} className={"loading-spinner"} />}
        {!loading && (
          <>
            <div className={`image-content ${loading ? "loading" : ""}`}>
              <button className={"comments"} onClick={handleMenu}>
                {menu}
              </button>
              <button className={"close"} onClick={exit}>
                {close}
              </button>
              <img src={image.highres} />
            </div>
            <div
              className={`comment-container ${
                commentsVisible && !loading ? "visible" : ""
              }`}
            >
              <div className={"comments"}>{renderedComments()}</div>
              <NewComment image_id={image.image_id} updateComments={getComments} />
            </div>
          </>
        )}
        <div className={"image-controls"}>
          <button onClick={previousImage}>{arrowLeft}</button>
          <button onClick={nextImage}>{arrowRight}</button>
        </div>
      </div>
    </div>
  );
};

export default Fullscreen;
