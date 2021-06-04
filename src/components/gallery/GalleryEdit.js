import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import UserContext from "../contexts/UserContext";

const GalleryEdit = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    authenticated();
  }, [userContext]);

  const authenticated = async () => {
    try {
      console.log("token", userContext);
      const options = {
        headers: {
          authorization: userContext.authenticated,
          "Content-Type": "application/json",
        },
      };
      const res = await fetch("http://localhost:5000/auth", options);
      const { authenticated } = await res.json();
      console.log("request", authenticated);
    } catch (error) {
      history.goBack();
    }
  };

  return (
    <div>
      <ImageUpload />
    </div>
  );
};

export default GalleryEdit;
