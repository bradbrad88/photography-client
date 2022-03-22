import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import UserContext from "contexts/UserContext";
import ImagePicker from "./ImagePicker";
import {
  addBlogImage,
  submitBlog,
  fetchBlog,
  editBlog,
  setImageUrls,
} from "utils/blog";
import { image as imageIcon } from "assets/svgButtons";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "stylesheets/Editor.css";

const Editor = () => {
  const history = useHistory();
  const params = useParams();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [blogId, setBlogId] = useState();
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [description, setDescription] = useState("");
  const [showImagePicker, setShowImagePicker] = useState(false);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (params.id) getBlog(params.id);
  }, []);

  const getBlog = async blog_id => {
    const blog = await fetchBlog(blog_id);
    if (!blog) return;
    const contentBlock = htmlToDraft(blog.html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
    console.log("blog", blog);
    setBlogId(blog.blog_id);
    setTitle(blog.title);
    setImage(blog.image);
    setImageUrl(blog.thumbnail);
    setDescription(blog.blog_desc);
  };

  const uploadCallback = async image => {
    const res = await addBlogImage(userContext.token, image);
    console.log("res", res);
    return { data: { link: res.url } };
  };
  const toolbar = {
    options: [
      "inline",
      "blockType",
      "fontSize",
      "fontFamily",
      "list",
      "textAlign",
      "colorPicker",
      "link",
      "embedded",
      "emoji",
      "image",
      "remove",
      "history",
    ],
    image: {
      uploadEnabled: true,
      uploadCallback: uploadCallback,
    },
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
    const res = await submitBlog(userContext.token, blog);
    if (res.error) console.log(res.error);
    const id = res.data.id;
    setBlogId(id);
    imageHandler(blog.html, id);
    history.push("/blog");
  };

  const imageHandler = async (html, id) => {
    const el = document.createElement("html");
    el.innerHTML = html;
    const imgs = el.getElementsByTagName("img");
    const imgList = [];
    for (let i = 0; i < imgs.length; i++) {
      let url = new URL(imgs[i].src);
      console.log("url.pathname", url.pathname.substring(1));
      imgList.push({ key: url.pathname.substring(1), url: imgs[i].src });
    }
    if (imgList.length < 1) return;
    const result = await setImageUrls(
      userContext.token,
      blogId ? blogId : id,
      imgList
    );
  };

  const onEditBlog = async blog => {
    const res = await editBlog(userContext.token, blog);
    imageHandler(blog.html);
    if (res?.data) history.push("/blog");
  };

  const blogObject = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const html = draftToHtml(rawContent);
    return {
      blog_id: blogId,
      title,
      html,
      image,
      description,
    };
  };

  const imagePicker = e => {
    e.stopPropagation();
    setShowImagePicker(true);
    document.body.classList.add("noscroll");
  };

  const onImageSelect = img => {
    console.log("image", img);
    if (img === "none") {
      setImage(null);
      setImageUrl(null);
    } else {
      setImage(img.image_id);
      setImageUrl(img.thumbnail);
    }
    setShowImagePicker(false);
  };

  const cancelImagePicker = () => {
    console.log("click");
    setShowImagePicker(false);
    document.body.classList.remove("noscroll");
  };

  return (
    <>
      {showImagePicker && (
        <ImagePicker onSelection={onImageSelect} clickAway={cancelImagePicker} />
      )}
      <div className={"editor"}>
        <div className={"header"} style={{ backgroundImage: `url(${imageUrl})` }}>
          <div className={"row"}>
            <input
              className={"blog-title"}
              placeholder={"Insert title here..."}
              onChange={titleChange}
              value={title}
            />
            <button className={"image-selector"} onClick={imagePicker}>
              {imageIcon()}
            </button>
            <button onClick={onSubmit}>{params.id ? "Save" : "Submit"}</button>
          </div>
          <div className={"row"}>
            <textarea
              className={"blog-description"}
              placeholder={"Insert description here..."}
              multiple
              onChange={descriptionChange}
              value={description}
            />
          </div>

          {/* <button onClick={onTest}>test</button> */}
        </div>

        <DraftEditor
          wrapperClassName={"RichEditor-root"}
          editorClassName={"RichEditor-editor"}
          // toolbarClassName={"RichEditor-toolbar"}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={toolbar}
          placeholder={"Blog away..."}
        />
      </div>
    </>
  );
};

export default Editor;
