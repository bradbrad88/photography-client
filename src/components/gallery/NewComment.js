import React, { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { postComment } from "../../utils/comment";

const NewComment = ({ image_id, blog_id, reply, updateComments }) => {
  const userContext = useContext(UserContext);
  const [body, setBody] = useState("");
  const onChange = e => {
    setBody(e.target.value);
  };
  const onPost = async () => {
    const comment = {
      comment_body: body,
      parent_id: reply,
      image_id,
      blog_id,
    };
    const result = await postComment(userContext.token, comment);
    if (result.data) {
      updateComments();
      setBody("");
    }
  };
  return (
    <div className={"new-comment"}>
      <textarea value={body} onChange={onChange} wrap="soft" />
      <button onClick={onPost}>{reply ? "Reply" : "Post"}</button>
    </div>
  );
};

export default NewComment;
