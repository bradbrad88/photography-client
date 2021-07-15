import React, { useState, useEffect } from "react";
import NewComment from "./NewComment";

const Comment = ({ comment, setReplyForm, refreshComments }) => {
  const [newReply, setNewReply] = useState();
  useEffect(() => {
    if (setReplyForm) setNewReply(true);
  }, []);
  const fullDate = new Date(0);
  fullDate.setUTCSeconds(comment.date_created);
  console.log("full date", fullDate.valueOf());
  const time = fullDate.toLocaleTimeString().replace(" ", "");
  const date = fullDate.toLocaleDateString();

  const renderReplies = () => {
    return (comment.children || []).map(reply => {
      return (
        <Comment
          comment={reply}
          setReplyForm={reply.children ? true : false}
          refreshComments={refreshComments}
        />
      );
    });
  };

  const handleReplyButton = () => {
    setNewReply(true);
  };

  const updateComments = () => {};

  return (
    <div className={"comment"}>
      <div
        className={"comment-image"}
        style={{ backgroundImage: `url(${comment.image_url})` }}
      ></div>
      <div className={"comment-content"}>
        <div className={"comment-decorate"}>
          <div className={"comment-header"}>
            <div
              className={"comment-name"}
            >{`${comment.given_name} ${comment.family_name}`}</div>
            <div className={"comment-date"}>{`${time} ${date}`}</div>
          </div>
          <div className={"comment-body"}>{comment.comment_body}</div>
        </div>
        {!newReply && (
          <div className={"comment-button"}>
            <button onClick={handleReplyButton}>Reply</button>
          </div>
        )}
        {/* {newReply && (
          <NewComment
            reply={{ id: comment.comment_id, name: comment.given_name }}
            image_id={comment.image_id}
            updateComments={updateComments}
          />
        )} */}
        {comment.children && (
          <div className={"comment-replies"}>{renderReplies()}</div>
        )}
        {newReply && (
          <NewComment
            reply={{ id: comment.comment_id, name: comment.given_name }}
            image_id={comment.image_id}
            updateComments={refreshComments}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
