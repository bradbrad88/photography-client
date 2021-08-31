import axios from "axios";

export const fetchGallery = async () => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_API}/gallery`,
      options
    );
    const { data, error } = await response.json();
    if (error) return { error };
    return { data };
  } catch (error) {
    return { error };
  }
};

// export const fetchInactiveImages = async auth => {
//   try {
//     const options = {
//       headers: {
//         authorization: auth,
//         "Content-Type": "application/json",
//       },
//     };
//     const response = await fetch("http://localhost:5000/gallery/inactive", options);
//     const result = await response.json();
//     if (result.error) return { data: [], error: result.error };
//     return { data: result.data };
//   } catch (error) {
//     console.log("error in fetch inactive images", error);
//     return { data: [], error: error.message };
//   }
// };

export const fetchAll = async auth => {
  try {
    const options = {
      headers: {
        authorization: auth,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_API}/gallery/all`,
      options
    );
    console.log("response", response);
    const { data, error } = await response.json();
    console.log("result", data);
    if (error) {
      console.log(error);
    }
    return { data, error };
  } catch (error) {
    return { error: { message: error.message } };
  }
};

export const addImage = async (auth, image) => {
  try {
    const options = {
      headers: { authorization: auth },
    };
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_API}/gallery/insert`,
      options
    );
    const { data, error } = await res.json();
    console.log(error);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postImage = async (auth, image_file, image_id, onUploadProgress) => {
  const onUpload = e => {
    onUploadProgress(e, image_id);
  };
  try {
    const formData = new FormData();
    formData.append("image", image_file);
    formData.append("id", image_id);
    const options = {
      headers: {
        authorization: auth,
      },
      onUploadProgress: onUpload,
      // method: "POST",
      // data: formData,
    };

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/gallery/post`,
      formData,
      options
    );
    console.log(res);
    // const res = await fetch(
    //   `${process.env.REACT_APP_SERVER_API}/gallery/post`,
    //   options
    // );
    const { data, error } = res.data;
    console.log(error);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteImages = async (auth, images) => {
  try {
    const options = {
      headers: {
        authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(images),
      method: "POST",
    };
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_API}/gallery/delete`,
      options
    );
    const { data, error } = await res.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export const saveDisplay = async (auth, displayData) => {
  try {
    const options = {
      headers: {
        authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(displayData),
      method: "POST",
    };
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_API}/gallery/display`,
      options
    );
    const { data, error } = await res.json();
    return data;
  } catch (error) {}
};

const mapComments = commentList => {
  const commentMap = {};
  commentList.forEach(comment => {
    commentMap[comment.comment_id] = comment;
  });
  commentList.forEach(comment => {
    if (comment.parent_id) {
      const parent = commentMap[comment.parent_id];
      (parent.children = parent.children || []).push(comment);
    }
  });
  return commentList.filter(comment => !comment.parent_id);
};

export const fetchComments = async image_id => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_API}/comment/image/${image_id}`
    );
    const { data, error } = await res.json();
    if (error) return { error };
    if (data) {
      return mapComments(data);
    }
  } catch (error) {
    console.error(error);
  }
};
