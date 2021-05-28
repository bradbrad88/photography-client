import React from "react";
import NavBar from "./NavBar";
import ImageGallery from "./gallery/ImageGallery";
import GalleryEdit from "./gallery/GalleryEdit";
import Blog from "./Blog";
import { BrowserRouter, Route } from "react-router-dom";
import "../stylesheets/Main.css";

const App = () => {
  return (
    <div className="body">
      {/* <h1 className="header">Far Out Photography</h1> */}
      <BrowserRouter>
        <NavBar />
        <Route path="/" exact component={ImageGallery} />
        <Route path="/gallery/edit" exact component={GalleryEdit} />
        <Route path="/gallery" component={ImageGallery} />
        <Route path="/blog" component={Blog} />
        {/* <Route path="contact" component={} /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
