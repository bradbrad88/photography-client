import React, { useState, useEffect } from "react";

const Comment = ({ comment }) => {
  const fullDate = new Date(0);
  fullDate.setUTCSeconds(comment.date_created);
  const time = fullDate
    .toLocaleTimeString([], { timeStyle: "short" })
    .replace(" ", "");
  const date = fullDate.toLocaleDateString();
  return (
    <div className={"comment"}>
      <div
        className={"comment-image"}
        style={{ backgroundImage: `url(${comment.image_url})` }}
      ></div>
      <div className={"comment-content"}>
        <div className={"comment-header"}>
          <div
            className={"comment-name"}
          >{`${comment.given_name} ${comment.family_name}`}</div>
          <div className={"comment-date"}>{`${time} ${date}`}</div>
        </div>
        <div className={"comment-body"}>{comment.comment_body}</div>
      </div>
    </div>
  );
};

export default Comment;
