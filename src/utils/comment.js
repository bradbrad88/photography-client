export const postComment = async (auth, comment) => {
  try {
    const options = {
      headers: {
        authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
      method: "POST",
    };
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_API}/comment/new`,
      options
    );
    const { data, error } = await result.json();
    if (error) console.log("Error posting new comment", error);

    return { data };
  } catch (error) {
    console.log("Error posting new comment", error);
    return { error };
  }
};
