import React from "react";
import {
  fetchInactiveImages,
  addImage,
  deleteImages,
  fetchGallery,
  saveDisplay,
} from "../../utils/gallery";
import UserStore from "./UserContext";
const Context = React.createContext();

export class GalleryEditStore extends React.Component {
  static contextType = UserStore;
  state = {
    imageBank: [],
    imageDisplay: [],
  };

  componentDidMount() {
    this.getImageBank();
    this.getImageDisplay();
    this.ws = new WebSocket(
      `ws://localhost:3001/gallery?auth=${this.context.authenticated}`
    );
    this.ws.onmessage = this.newMessage;
  }

  async getImageDisplay() {
    const gallery = await fetchGallery();
    this.setState({ imageDisplay: gallery.data });
  }

  async getImageBank() {
    const gallery = await fetchInactiveImages(this.context.authenticated);
    this.setState({ imageBank: gallery.data });
  }

  newMessage = message => {
    const update = JSON.parse(message.data);
    this.setState(prevState => ({
      imageBank: prevState.imageBank.map(image =>
        // looking for key matches for initial upload. If page is refreshed then image should have an image_id to communicate any further status updates
        update.key === image.upload?.key ||
        (image.image_id && image.image_id === update.image_id)
          ? {
              ...image,
              status: update.status,
              complete: update.complete,
              url: update.url,
            }
          : image
      ),
    }));
  };

  newUploads = async images => {
    const newImages = await Promise.all(
      images.map(async image => {
        const image_id = await addImage(this.context.authenticated, image);
        return { ...image, image_id: image_id };
      })
    );
    console.log(newImages);
    const newImageBank = this.state.imageBank.concat(newImages);
    this.setState({ imageBank: newImageBank });
  };

  toggleSelectedBank = (image_id, setTrue) => {
    if (!image_id) return;
    this.setState(prevState => ({
      imageBank: prevState.imageBank.map(image =>
        image.image_id === image_id && image.complete
          ? { ...image, selected: setTrue ? true : !image.selected }
          : image
      ),
    }));
  };

  selectAllBank = () => {
    const toggle =
      this.state.imageBank.filter(image => image.complete).length ===
      this.state.imageBank.filter(image => image.selected).length;

    this.setState(prevState => ({
      imageBank: prevState.imageBank.map(image =>
        image.complete
          ? {
              ...image,
              selected: !toggle,
            }
          : { ...image }
      ),
    }));
  };

  deleteSelectedBank = async () => {
    const images = this.state.imageBank
      .filter(image => image.selected)
      .map(image => image.image_id);
    console.log("images", images);
    const newImageBank = await deleteImages(this.context.authenticated, images);
    this.setState({ imageBank: this.manageNewList(newImageBank) });
  };

  toggleSelectedDisplay = image_id => {
    if (!image_id) return;
    this.setState(prevState => ({
      imageDisplay: prevState.imageDisplay.map(image =>
        image.image_id === image_id
          ? { ...image, selected: !image.selected }
          : { ...image }
      ),
    }));
  };

  selectedImages = () => {
    return this.state.imageBank.filter(image => image.selected);
  };

  addToDisplay = () => {
    const selectedImages = this.selectedImages();

    this.setState(prevState => ({
      imageBank: prevState.imageBank.filter(
        image =>
          !selectedImages.some(selImage => selImage.image_id === image.image_id)
      ),
      imageDisplay: prevState.imageDisplay.concat(selectedImages),
    }));
  };

  manageNewList = newList => {
    const oldList = this.state.imageBank.filter(
      image => image.upload && !image.complete
    );
    console.log("old list", oldList);
    return newList
      .filter(
        image =>
          !oldList.some(oldImage => oldImage.image_id === image.image_id) &&
          !this.activeImages().includes(image.image_id)
      )
      .concat(oldList)
      .sort((a, b) => b.date_uploaded - a.date_uploaded);
  };

  activeImages = () => {
    return this.state.imageDisplay.map(image => image.image_id);
  };

  saveDisplay = async () => {
    const displayData = this.state.imageDisplay.map((image, idx) => {
      console.log("image", image);
      const displayOrder = image.display_order ? image.display_order : idx + 1;
      const emphasize = image.emphasize ? image.emphasize : 1;
      return {
        image_id: image.image_id,
        emphasize: emphasize,
        display_order: displayOrder,
      };
    });
    console.log(displayData);
    if (await saveDisplay(this.context.authenticated, displayData)) {
      console.log("Saved");
    } else {
      console.log("really fucked it");
    }
  };
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          test: this.test,
          newUploads: this.newUploads,
          toggleSelectedBank: this.toggleSelectedBank,
          selectAllBank: this.selectAllBank,
          deleteSelectedBank: this.deleteSelectedBank,
          toggleSelectedDisplay: this.toggleSelectedDisplay,
          selectAllDisplay: this.selectAllDisplay,
          deleteSelectedDisplay: this.deleteSelectedDisplay,
          addToDisplay: this.addToDisplay,
          saveDisplay: this.saveDisplay,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
