import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { fetchComments } from "../../utils/gallery";
import { menu } from "../../assets/svgButtons";
import "../../stylesheets/ImageGallery.css";
const Fullscreen = ({ image, nextImage, previousImage }) => {
  const [comments, setComments] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState(false);
  useEffect(() => {
    getComments();
  }, []);
  console.log("image", image);
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
        <div className={"image-content"}>
          <button onClick={handleMenu}>{menu}</button>
          <img src={image.highres} />
        </div>
        <div className={`comment-container ${commentsVisible ? "visible" : ""}`}>
          <div className={"comments"}>{renderedComments()}</div>
          <NewComment image_id={image.image_id} updateComments={getComments} />
        </div>
        <div className={"image-controls"}>
          <button>{"<"}</button>
          <button>{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default Fullscreen;
