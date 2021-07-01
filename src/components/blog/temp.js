import React, { useState, useRef, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";

import UserContext from "../contexts/UserContext";
import { submitBlog, fetchBlog, editBlog } from "../../utils/blog";

import "../../stylesheets/Blog.css";

const Editor = props => {
  const editor = useRef(null);
  const history = useHistory();
  const params = useParams();
  const [blogId, setBlogId] = useState();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const userContext = useContext(UserContext);
  console.log("props", editor);
  useEffect(() => {
    if (params.id) getBlog(params.id);
  }, []);

  const getBlog = async blog_id => {
    const blog = await fetchBlog(blog_id);
    if (!blog) return;
    setBlogId(blog.blog_id);
    setContent(blog.html);
    setTitle(blog.title);
    setImage(blog.image);
    setDescription(blog.blog_desc);
  };

  const titleChange = e => {
    setTitle(e.target.value);
  };

  const descriptionChange = e => {
    setDescription(e.target.value);
  };

  const onSubmit = async () => {
    const blog = blogObject();
    if (blog.blog_id) return onEditBlog(blog);
    newBlog(blog);
  };

  const newBlog = async blog => {
    const res = await submitBlog(userContext.authenticated, blog);
    if (res.data) history.push("/blog");
  };

  const onEditBlog = async blog => {
    const res = await editBlog(userContext.authenticated, blog);
    if (res?.data) history.push("/blog");
  };

  const blogObject = () => {
    return {
      blog_id: blogId,
      title: title,
      html: content,
      image,
      description,
    };
  };

  const config = {
    events: {
      afterInit: instance => {
        this = instance;
      },
    },
    minHeight: 500,
    enableDragAndDropFileToEditor: true,
    uploader: {
      url: "http://localhost:5000/blog/image/upload",
      filesVariableName: () => `images`,
      prepareData: formData => formData,
      process: res => {
        console.log("res", res);
        let files = [];
        res.list.forEach(file => files.push(file));
        return {
          files,
          path: "",
          baseurl: "",
          error: res.success ? 0 : 1,
          msg: res.message,
        };
      },
      defaultHandlerSuccess: function (res) {
        console.log("res", res);
        if (res.files && res.files.length) {
          res.files.forEach(file => {
            console.log("file", file);
            console.log("this", Editor);
            console.log("editor", editor.current.select());
            // editor.current.select().insertImage(file, null, 250);
          });
        }
      },
      getMsg: res => {
        return res.msg.join !== undefined ? res.msg.join(" ") : res.msg;
      },
      error: e => {
        this.events.fire("errorPopap", [e.getMessage(), "error", 4000]);
      },
      defaultHandlerError: res => {
        this.events.fire("errorPopap", [this.options.uploader.getMsg(res)]);
      },
    },
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
        <input
          className={"blog-description"}
          placeholder={"Insert description here..."}
          onChange={descriptionChange}
          value={description}
        />
        <button onClick={onSubmit}>{params.id ? "Save" : "Submit"}</button>
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