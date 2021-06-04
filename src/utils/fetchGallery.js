export const fetchGallery = async auth => {
  try {
    const options = {
      headers: {
        authorization: auth,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("http://localhost:5000/gallery", options);
    const data = await response.json();
    const orderedList = data.sort((a, b) => a.display_order - b.display_order);
    return { data: orderedList };
  } catch (error) {
    return { error: error.message };
  }
};
