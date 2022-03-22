import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import UserProvider from "contexts/UserContext";
import NavBar from "./system/NavBar";
import Auth from "./auth/Auth";
import Login from "./auth/Login";
import Gallery from "./gallery/Gallery";
import GalleryEdit from "./gallery/ImageGalleryEdit";
import BlogList from "./blog/BlogList";
import Blog from "./blog/Blog";
import Editor from "./blog/Editor";
import "stylesheets/Main.css";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <NavBar />
        <Route path="/edit" component={Auth} />
        <Route path="/" exact component={Gallery} />
        <Route path="/gallery" exact component={Gallery} />
        <Route path="/edit/gallery" exact component={GalleryEdit} />
        <Route path="/blog" exact component={BlogList} />
        <Route path="/edit/blog/" exact component={Editor} />
        <Route path="/blog/:id" exact component={Blog} />
        <Route path="/edit/blog/:id" exact component={Editor} />
        <Route
          path="/login"
          render={() => <Login msg={"Choose your login method"} />}
        />
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
