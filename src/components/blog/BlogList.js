import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import BlogCard from "./BlogCard";
import Confirm from "../system/Confirm";
import { fetchBlogs } from "../../utils/blog";
import { add } from "../../assets/svgButtons";
import "../../stylesheets/Blog.css";

const BlogList = () => {
  const userContext = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const res = await fetchBlogs(userContext?.authenticated);
    setBlogs(res);
  };

  const blogList = () => {
    return blogs.map(blog => {
      return <BlogCard key={blog.blog_id} blog={blog} getBlogs={getBlogs} />;
    });
  };

  const createNewBlog = () => {
    history.push("/edit/blog");
  };

  const newBlogCard = () => {
    if (!userContext.authenticated) return;
    return (
      <div className={"blog-item new-blog"} onClick={createNewBlog}>
        <p>Create New Blog</p>
        {add(60)}
      </div>
    );
  };

  const confirmation = () => {
    return <Confirm />;
  };

  return (
    <div className={"blog-list"}>
      {newBlogCard()}
      {blogList()}
      {/* {confirmation()} */}
    </div>
  );
};

export default BlogList;
