import React from "react";
import UserStore from "./UserContext";
import { fetchGallery } from "../utils/gallery";
const Context = React.createContext();

export class GalleryDisplayStore extends React.Component {
  static contextType = UserStore;
  state = {
    imageList: this.getImageList(),
    selectedImages: [],
  };
  componentDidMount() {
    console.log("Gallery Display Store State", this.state.imageList);
  }
  async getImageList() {
    const gallery = await fetchGallery();
    return gallery.data;
  }

  functionOne = () => {};

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          functionOne: this.functionOne,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
