import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { fetchComments } from "../../utils/gallery";
import "../../stylesheets/ImageGallery.css";
const Fullscreen = ({ image, nextImage, previousImage }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments();
  }, []);
  const getComments = async () => {
    const imageComments = await fetchComments(image.image_id);
    setComments(imageComments);
  };
  const fullscreenClickHandler = e => {
    e.stopPropagation();
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
        <img src={image.url} />
        <div className={"comment-container"}>
          <div className={"comments"}>{renderedComments()}</div>
          <NewComment image_id={image.image_id} updateComments={getComments} />
        </div>
      </div>
    </div>
  );
};

export default Fullscreen;
