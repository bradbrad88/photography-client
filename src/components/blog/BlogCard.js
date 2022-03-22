import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "contexts/UserContext";
import Confirm from "../system/Confirm";
import { setActive, deleteBlog } from "utils/blog";
import { active, del, edit } from "assets/svgButtons.js";

import "../../stylesheets/Blog.css";

const BlogCard = ({ blog, getBlogs }) => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const handleClick = () => {
    history.push(`/blog/${blog?.blog_id}`);
  };
  const handleEdit = e => {
    e.stopPropagation();
    history.push(`/edit/blog/${blog.blog_id}`);
  };
  const handleActive = async e => {
    e.stopPropagation();
    await setActive(userContext.token, blog.blog_id, !blog.active);
    getBlogs();
  };
  const handleDelete = async e => {
    e.stopPropagation();
    console.log("right herer", blog.blog_id);
    setDisplayConfirm(true);
    // const confirmDelete = confirm(
    //   "Are you sure you wish to delete this blog post permanently?"
    // );
    // console.log(confirmDelete);
    return;
    await deleteBlog(userContext.token, blog.blog_id);
    getBlogs();
  };

  const confirmation = () => {
    return <Confirm display={displayConfirm} />;
  };
  return (
    <>
      <div
        className={`blog-item ${blog.active ? "" : "hidden"}`}
        onClick={handleClick}
      >
        <div className={"content"}>
          <div className={"text"}>
            <h2>{blog?.title}</h2>
            <p>{blog?.blog_desc}</p>
          </div>
          <div
            className={"image"}
            style={{ backgroundImage: `url("${blog?.thumbnail}")` }}
          ></div>
        </div>
        {userContext.isAdmin && (
          <div className={"admin"}>
            <button onClick={handleEdit}>{edit}</button>
            <button onClick={handleActive}>{active}</button>
            <button onClick={handleDelete}>{del}</button>
          </div>
        )}
        <img src="" />
      </div>
      {confirmation()}
    </>
  );
};

export default BlogCard;
