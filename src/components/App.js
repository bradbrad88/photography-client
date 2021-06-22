import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { UserStore } from "./contexts/UserContext";
import { GoogleStore } from "./contexts/GoogleContext";
import NavBar from "./system/NavBar";
import Auth from "./auth/Auth";
import Login from "./auth/Login";
import Gallery from "./gallery/Gallery";
import GalleryEdit from "./gallery/ImageGalleryEdit";
import Blog from "./blog/Blog";
import "../stylesheets/Main.css";

const App = () => {
  return (
    <BrowserRouter>
      <UserStore>
        <GoogleStore>
          <NavBar />
          <Route path="/edit" component={Auth} />
          <Route path="/" exact component={Gallery} />
          <Route path="/edit/gallery" exact component={GalleryEdit} />
          <Route path="/blog" component={Blog} />
          <Route path="/login" component={Login} />
        </GoogleStore>
      </UserStore>
    </BrowserRouter>
  );
};

export default App;
