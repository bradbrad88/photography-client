export const submitBlog = async (auth, blog) => {
  try {
    const options = {
      headers: {
        authorization: auth,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(blog),
    };
    const result = await fetch("http://localhost:5000/edit/blog", options);
    return await result.json();
  } catch (error) {}
};

export const editBlog = async (auth, blog) => {
  try {
    const options = {
      headers: {
        authorization: auth,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(blog),
    };
    const result = await fetch("http://localhost:5000/edit/blog", options);
    return await result.json();
  } catch (error) {}
};

export const fetchBlogs = async auth => {
  try {
    const options = {
      headers: {
        authorization: auth,
        "Content-Type": "application/json",
      },
    };
    const result = await fetch(
      `http://localhost:5000/blog/${auth ? "all" : "active"}`,
      options
    );

    const { data, error } = await result.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBlog = async blog_id => {
  try {
    const result = await fetch(`http://localhost:5000/blog/${blog_id}`);
    const { data } = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (auth, blog_id) => {
  console.log("blog_id", blog_id);
  try {
    const options = {
      headers: {
        authorization: auth,
      },
      method: "DELETE",
    };
    const result = await fetch(
      `http://localhost:5000/blog/delete/${blog_id}`,
      options
    );
  } catch (error) {
    console.log("error", error);
  }
};

export const setActive = async (auth, blog_id, active) => {
  try {
    const options = {
      headers: {
        authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blog_id, active }),
      method: "PUT",
    };
    const result = await fetch("http://localhost:5000/blog/setActive", options);
  } catch (error) {}
};

export const setImageUrls = async (auth, blog_id, images) => {
  try {
    const options = {
      headers: {
        authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(images),
      method: "PUT",
    };

    const result = await fetch(
      `http://localhost:5000/blog/urls/${blog_id}`,
      options
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const addBlogImage = async (auth, image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const options = {
      headers: {
        authorization: auth,
      },
      body: formData,
      method: "POST",
    };
    const result = await fetch("http://localhost:5000/blog/image/upload", options);
    return await result.json();
  } catch (error) {
    console.log(error);
  }
};
