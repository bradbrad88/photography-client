export const submitBlog = (auth, blog) => {
  try {
    const options = {
      headers: {
        authorization: auth,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(blog),
    };
    const result = fetch("http://localhost:5000/blog/new", options);
  } catch (error) {}
};

export const editBlog = () => {};

export const getBlogs = () => {};

export const getBlog = () => {};
