import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ImageGalleryEditDisplay from "./ImageGalleryEditDisplay";
import ImageUpload from "./EditPanel";
import UserContext from "../contexts/UserContext";
import { GalleryDisplayStore } from "../contexts/GalleryDisplayContext";
import { GalleryEditStore } from "../contexts/GalleryEditContext";

const GalleryEdit = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    authenticated();
  }, [userContext]);

  const authenticated = async () => {
    try {
      const options = {
        headers: {
          authorization: userContext.authenticated,
          "Content-Type": "application/json",
        },
      };
      const res = await fetch("http://localhost:5000/auth", options);
      const { authenticated } = await res.json();
    } catch (error) {
      history.goBack();
    }
  };

  return (
    <GalleryEditStore>
      <ImageGalleryEditDisplay />
      <ImageUpload />
    </GalleryEditStore>
  );
};

export default GalleryEdit;
