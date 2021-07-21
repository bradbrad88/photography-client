import React, { useState, useEffect, useRef } from "react";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { fetchComments } from "../../utils/gallery";
import { menu } from "../../assets/svgButtons";
import "../../stylesheets/ImageGallery.css";
import { Grid } from "react-spinners-css";
const Fullscreen = ({ image, nextImage, previousImage }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState(false);
  // const imageRef = useRef();
  useEffect(() => {
    setLoading(true);
    getComments();
    console.log("here we go");
  }, [image]);

  const getLoading = () => {
    console.log("done loading");
    setLoading(false);
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

  // if (loading) return <div className={"fullscreen-background"}></div>;

  return (
    <div className={"fullscreen-background"}>
      <div className={"image-viewer"} onClick={fullscreenClickHandler}>
        {loading && <Grid color={"#fff"} size={120} className={"loading-spinner"} />}
        <div className={`image-content ${loading ? "loading" : ""}`}>
          <button onClick={handleMenu}>{menu}</button>
          <img src={image.highres} onLoad={getLoading} />
        </div>
        <div
          className={`comment-container ${
            commentsVisible && !loading ? "visible" : ""
          }`}
        >
          <div className={"comments"}>{renderedComments()}</div>
          <NewComment image_id={image.image_id} updateComments={getComments} />
        </div>{" "}
        <div className={"image-controls"}>
          <button onClick={previousImage}>{"<"}</button>
          <button onClick={nextImage}>{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default Fullscreen;
