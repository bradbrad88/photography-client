import React from "react";
import NavBar from "./system/NavBar";
import Login from "./auth/Login";
import ImageGallery from "./gallery/ImageGallery";
import GalleryEdit from "./gallery/GalleryEdit";
import Blog from "./blog/Blog";
import { UserStore } from "./contexts/UserContext";
import { GoogleStore } from "./contexts/GoogleContext";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import "../stylesheets/Main.css";

const App = () => {
  return (
    <BrowserRouter>
      <UserStore>
        <GoogleStore>
          <div className="body">
            <NavBar />
            <Route path="/" exact component={ImageGallery} />
            <Route path="/gallery/edit" exact component={GalleryEdit} />
            <Route path="/gallery" component={ImageGallery} />
            <Route path="/blog" component={Blog} />
            <Route path="/login" component={Login} />
          </div>
        </GoogleStore>
      </UserStore>
    </BrowserRouter>
  );
};

export default App;
