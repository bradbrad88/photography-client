import React, { useState, useEffect, useRef, useContext } from "react";
import UserContext from "contexts/UserContext";
import Comment from "./Comment";
import NewComment from "./NewComment";
import Login from "../auth/Login";
import { fetchComments } from "utils/gallery";
import { menu, close, arrowLeft, arrowRight } from "assets/svgButtons";
import "stylesheets/ImageGallery.css";
import { Grid } from "react-spinners-css";
const Fullscreen = ({ image, nextImage, previousImage, exit }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [controlVisibility, setControlVisibility] = useState(true);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const userContext = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    getImage();
    getComments();
    if (fullscreenElement.current) fullscreenElement.current.requestFullscreen();
  }, [image]);
  const timer = useRef(null);
  const fullscreenElement = useRef();
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
          key={comment.comment_id}
          comment={comment}
          setReplyForm={comment.children ? true : false}
          refreshComments={getComments}
        />
      );
    });
  };

  const controlVisibilityTimer = () => {
    setControlVisibility(false);
  };

  const onMouseMove = () => {
    clearTimeout(timer.current);
    setControlVisibility(true);
    timer.current = setTimeout(controlVisibilityTimer, 1500);
  };

  const onMenuMouseEnter = e => {
    e.stopPropagation();
    clearTimeout(timer.current);
  };

  const onMouseEnter = e => {
    e.stopPropagation();
  };

  const onMouseMoveButton = e => {
    e.stopPropagation();
  };

  return (
    <div className={"fullscreen-background"} ref={fullscreenElement}>
      <div
        className={"image-viewer"}
        onClick={fullscreenClickHandler}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseMove}
      >
        <div className={`image-content ${loading ? "loading" : ""}`}>
          <div className={`image-controls ${controlVisibility ? "" : "hidden"}`}>
            <button
              className={`comments`}
              onClick={handleMenu}
              onMouseEnter={onMenuMouseEnter}
              onMouseMove={onMouseMoveButton}
            >
              {menu}
            </button>
            <button
              className={`close`}
              onClick={exit}
              onMouseEnter={onMenuMouseEnter}
              onMouseMove={onMouseMoveButton}
            >
              {close}
            </button>
            <button
              className={"previous"}
              onClick={previousImage}
              onMouseEnter={onMouseEnter}
              onMouseMove={onMouseMove}
            >
              {arrowLeft}
            </button>
            <button
              className={"next"}
              onClick={nextImage}
              onMouseEnter={onMouseEnter}
              onMouseMove={onMouseMove}
            >
              {arrowRight}
            </button>
          </div>
          {loading ? (
            <Grid color={"#fff"} size={120} className={"loading-spinner"} />
          ) : (
            <img src={image.highres} />
          )}
        </div>
        <div className={`comment-container ${commentsVisible ? "visible" : ""}`}>
          {loading ? (
            <Grid color={"#000"} size={120} className={"loading-spinner"} />
          ) : (
            <>
              <div className={"comments"}>{renderedComments()}</div>
              <div className={"user-input-container"}>
                {userContext.profile ? (
                  <NewComment
                    image_id={image.image_id}
                    updateComments={getComments}
                  />
                ) : (
                  <Login msg={"Login to leave a comment"} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fullscreen;
