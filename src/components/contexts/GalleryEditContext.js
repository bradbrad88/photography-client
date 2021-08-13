import React from "react";
import {
  fetchInactiveImages,
  addImage,
  deleteImages,
  fetchGallery,
  saveDisplay,
} from "../../utils/gallery";
import UserStore from "./UserContext";
import ImageCard from "../gallery/ImageCard";
const Context = React.createContext();

const originalLayouts = getFromLS("layouts") || [];

export class GalleryEditStore extends React.Component {
  static contextType = UserStore;
  state = {
    imageBank: [],
    layouts: originalLayouts,
    imageDisplay: [], // array of ImageCard components to display on GridLayout
    options: { gallery_columns: 3 },
    imageDrag: [],
    loading: true,
  };

  componentDidMount() {
    this.loadContext();
    // this.wsInit();
    // this.getImageBank(); // edit to get all images

    // // get layouts

    // this.getImageDisplay();
  }

  async getImageDisplay() {
    console.log("layouts", this.state.layouts);
    const imageDisplay = this.state.layouts.map(layout => {
      return this.getImageComponent(layout.i);
    });
    this.setState({ imageDisplay });
  }

  getImageComponent(id) {
    const image = this.state.imageBank.find(
      image => image.image_id === parseInt(id)
    );
    if (image)
      return (
        <ImageCard image={image} key={image.image_id} ref={React.createRef()} />
      );
  }

  addImageComponent = id => {
    const imageCard = this.getImageComponent(id);
    this.setState(prevState => ({
      imageDisplay: [...prevState.imageDisplay, imageCard],
    }));
  };

  async loadContext() {
    this.wsInit();
    await this.getImageBank();
    this.getImageDisplay();
    this.setState({ loading: false });
  }

  wsInit() {
    this.ws = new WebSocket(
      `ws://localhost:3001/gallery?auth=${this.context.token}`
    );
    this.ws.onmessage = this.newMessage;
  }

  async getImageBank() {
    const gallery = await fetchInactiveImages(this.context.token);
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
              thumbnail: update.url,
              error: update.error,
            }
          : image
      ),
    }));
  };

  updateLayouts = layouts => {
    console.log("layouts", layouts);
    this.setState({ layouts: layouts });
  };

  newUploads = async images => {
    const newImages = await Promise.all(
      images.map(async image => {
        const image_id = await addImage(this.context.token, image);
        return { ...image, image_id: image_id };
      })
    );
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

  deselectAllBank = () => {
    this.setState(prevState => ({
      imageBank: prevState.imageBank.map(image =>
        image.complete ? { ...image, selected: false } : { ...image }
      ),
    }));
  };

  deleteSelectedBank = async () => {
    const images = this.state.imageBank
      .filter(image => image.selected)
      .map(image => image.image_id);
    if (images.length < 1) return;
    const success = await deleteImages(this.context.token, images);
    if (success) this.removeDeletedImages(images);
  };

  removeDeletedImages = images => {
    this.setState(prevState => ({
      imageBank: prevState.imageBank.filter(
        image => !images.includes(image.image_id)
      ),
    }));
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

  deselectAllDisplay = () => {
    this.setState(prevState => ({
      imageDisplay: prevState.imageDisplay.map(image => ({
        ...image,
        selected: false,
      })),
    }));
  };

  selectAllDisplay = () => {
    const toggle =
      this.state.imageDisplay.length ===
      this.state.imageDisplay.filter(image => image.selected).length;
    console.log(toggle);
    this.setState(prevState => ({
      imageDisplay: prevState.imageDisplay.map(image => ({
        ...image,
        selected: !toggle,
      })),
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
      imageDisplay: prevState.imageDisplay.concat(
        selectedImages.map(image => ({ ...image, selected: false }))
      ),
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

  removeSelectedDisplay = () => {
    this.setState(prevState => ({
      imageBank: prevState.imageBank.concat(
        prevState.imageDisplay
          .filter(image => image.selected)
          .map(image => ({ ...image, selected: false }))
      ),
      imageDisplay: prevState.imageDisplay.filter(image => !image.selected),
    }));
  };

  emphasize = arg => {
    const min = 1;
    const max = this.state.options.gallery_columns;
    this.setState(prevState => ({
      imageDisplay: prevState.imageDisplay.map(image =>
        image.selected
          ? {
              ...image,
              emphasize: (() => {
                if (image.emphasize + arg > max) return max;
                if (image.emphasize + arg < min) return min;
                return image.emphasize + arg;
              })(),
            }
          : { ...image }
      ),
    }));
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
    if (await saveDisplay(this.context.token, displayData)) {
      console.log("Saved");
    } else {
      console.log("really fucked it");
    }
  };

  render() {
    // console.log("image display", this.state.imageDisplay);
    // console.log("image bank", this.state.imageBank);
    return (
      <Context.Provider
        value={{
          ...this.state,
          test: this.test,
          newUploads: this.newUploads,
          toggleSelectedBank: this.toggleSelectedBank,
          selectAllBank: this.selectAllBank,
          deselectAllBank: this.deselectAllBank,
          deleteSelectedBank: this.deleteSelectedBank,
          toggleSelectedDisplay: this.toggleSelectedDisplay,
          selectAllDisplay: this.selectAllDisplay,
          removeSelectedDisplay: this.removeSelectedDisplay,
          emphasize: this.emphasize,
          addToDisplay: this.addToDisplay,
          saveDisplay: this.saveDisplay,
          deselectAllDisplay: this.deselectAllDisplay,
          updateLayouts: this.updateLayouts,
          addImageComponent: this.addImageComponent,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl")) || {};
    } catch (error) {}
  }
  return ls[key];
}

export default Context;
