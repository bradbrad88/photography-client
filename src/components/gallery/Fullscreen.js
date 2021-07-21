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
  const [controlVisibility, setControlVisibility] = useState(true);
  const [commentsVisible, setCommentsVisible] = useState(false);
  useEffect(() => {
    setLoading(true);
    getImage();
    getComments();
  }, [image]);
  const timer = useRef(null);
  console.log("rerender");
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

  const controlVisibilityTimer = () => {
    getTimer();
    setControlVisibility(false);
  };

  const onMouseMove = () => {
    console.log("Cleared this timer:", timer.current);
    clearTimeout(timer.current);
    setControlVisibility(true);
    timer.current = setTimeout(controlVisibilityTimer, 500);
  };

  const onMouseEnter = e => {
    console.log("yeppers");
    e.stopPropagation();
    // console.log(controlTimer);
    clearTimeout(timer.current);
  };

  const onMouseMoveButton = e => {
    e.stopPropagation();
  };

  const getTimer = () => {
    console.log("This timer ran:", timer.current);
  };
  return (
    <div className={"fullscreen-background"}>
      <div
        className={"image-viewer"}
        onClick={fullscreenClickHandler}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseMove}
      >
        {loading && <Grid color={"#fff"} size={120} className={"loading-spinner"} />}
        {!loading && (
          <>
            <div className={`image-content ${loading ? "loading" : ""}`}>
              <button
                className={`comments ${controlVisibility ? "" : "hidden"}`}
                onClick={handleMenu}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMoveButton}
              >
                {menu}
              </button>
              <button
                className={`close ${controlVisibility ? "" : "hidden"}`}
                onClick={exit}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMoveButton}
              >
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
        <div className={`image-controls ${controlVisibility ? "" : "hidden"}`}>
          <button
            onClick={previousImage}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMoveButton}
          >
            {arrowLeft}
          </button>
          <button
            onClick={nextImage}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMoveButton}
          >
            {arrowRight}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fullscreen;
