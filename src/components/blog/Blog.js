import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchBlog } from "../../utils/blog";

const Blog = props => {
  const [blog, setBlog] = useState();
  useEffect(() => {
    getBlog();
  }, []);
  const location = useLocation();
  const params = useParams();
  console.log(params);
  const getBlog = async () => {
    const res = await fetchBlog(params.id);
    setBlog(res);
  };
  if (!blog) return <div>Loading</div>;
  return (
    <div className={"blog"}>
      <img className={"header-image"} src={blog.highres} />
      <div className={"header-title"}>
        <h1>{blog.title}</h1>
      </div>
      <div dangerouslySetInnerHTML={{ __html: blog.html }}></div>
    </div>
  );
};

export default Blog;
