import React, { useState, useRef, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";

import UserContext from "../contexts/UserContext";
import { submitBlog, fetchBlog, editBlog, setImageUrls } from "../../utils/blog";

import "../../stylesheets/Blog.css";

const Editor = props => {
  const editor = useRef(null);
  const history = useHistory();
  const params = useParams();
  const [blogId, setBlogId] = useState();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [bucket, setBucket] = useState("");
  const [description, setDescription] = useState("");
  const userContext = useContext(UserContext);

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
    await newBlog(blog);
  };

  const newBlog = async blog => {
    const res = await submitBlog(userContext.authenticated, blog);
    if (res.error) console.log(res.error);
    const id = res.data.id;
    setBlogId(id);
    imageHandler();
    history.push("/blog");
  };

  const onEditBlog = async blog => {
    const res = await editBlog(userContext.authenticated, blog);
    imageHandler();
    if (res?.data) history.push("/blog");
  };

  const blogObject = () => {
    return {
      blog_id: blogId,
      title,
      html: content,
      image: null,
      description,
    };
  };

  let jodit = {};

  const config = {
    events: {
      afterInit: instance => {
        jodit = instance;
      },
    },
    minHeight: 500,
    enableDragAndDropFileToEditor: true,
    uploader: {
      url: "http://localhost:5000/blog/image/upload",
      filesVariableName: () => `images`,
      prepareData: formData => formData,
      process: res => {
        let files = [];
        setBucket(res.bucket);
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
        if (res.files && res.files.length) {
          res.files.forEach(file => {
            jodit.selection.insertImage(file, null, null);
          });
        }
      },
      getMsg: res => {
        console.log("get message", res);
        return res.msg.join !== undefined ? res.msg.join(" ") : res.msg;
      },
      error: e => {
        console.log("e", e);
        console.log("get", e.get);
        jodit.events.fire("errorPopap", [e.getMessage(), "error", 4000]);
      },
      defaultHandlerError: res => {
        jodit.events.fire("errorPopap", [jodit.options.uploader.getMsg(res)]);
      },
    },
  };
  const imageHandler = async id => {
    const el = document.createElement("html");
    el.innerHTML = content;
    const imgs = el.getElementsByTagName("img");
    const imgList = [];
    for (let i = 0; i < imgs.length; i++) {
      let url = new URL(imgs[i].src);
      console.log("url.pathname", url.pathname.substring(1));
      imgList.push({ key: url.pathname.substring(1), url: imgs[i].src, bucket });
    }
    const result = await setImageUrls(
      userContext.authenticated,
      blogId ? blogId : id,
      imgList
    );
    console.log("worked:", result);
    console.log("imgs", imgList);
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
        {/* <button onClick={onTest}>test</button> */}
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
