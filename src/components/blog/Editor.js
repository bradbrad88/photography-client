import React, { useState, useRef, useContext } from "react";
import JoditEditor from "jodit-react";

import UserContext from "../contexts/UserContext";
import { submitBlog } from "../../utils/blog";

import "../../stylesheets/Blog.css";

const Editor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const userContext = useContext(UserContext);
  console.log(content);
  const config = {
    minHeight: 500,
  };
  const titleChange = e => {
    setTitle(e.target.value);
  };
  const onSubmit = () => {
    const blog = {
      title: title,
      body: content,
    };
    submitBlog(userContext.authenticated, blog);
  };

  return (
    <div className={"editor"}>
      <div className={"header"}>
        <input
          className={"blog-title"}
          placeholder={"Insert title here..."}
          onChange={titleChange}
          value={title}
        />
        <button onClick={onSubmit}>Submit</button>
      </div>
      <JoditEditor
        config={config}
        ref={editor}
        value={content}
        onBlur={newContent => setContent(newContent)}
        onChange={newContent => {}}
      />
    </div>
  );
};

export default Editor;
