import React, { useMemo } from "react";
import { fetchAll, addImage, deleteImages, saveDisplay } from "../../utils/gallery";
import UserStore from "./UserContext";
import ImageCard from "../gallery/ImageCard";
const Context = React.createContext();

const lsLayout = getFromLS("layouts") || [];

export class GalleryEditStore extends React.Component {
  static contextType = UserStore;
  state = {
    imageBank: [],
    layouts: lsLayout,
    // imageDisplay: [], // array of ImageCard components to display on GridLayout
    options: { gallery_columns: 3 },
    dragging: false,
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.init();
    console.log(this.state.layouts);
  }

  async init() {
    this.wsInit();
    const gallery = await this.getImageBank();
    let layout = [...this.state.layouts];
    if (layout.length < 1) {
      layout = this.getSavedLayouts();
      this.setState({ layouts: layout });
    }
    this.getImageDisplay(layout);
    this.setState({ loading: false });
  }

  // getting from imageBank state, not fetched through api
  // provides a way to discard changes made locally to image layout
  getSavedLayouts() {
    const layout = this.state.imageBank
      .filter(image => image.i)
      .map(image => ({
        i: image.i.toString(),
        x: image.x,
        y: image.y,
        w: image.w,
        h: image.h,
      }));
    return layout;
  }

  async getImageBank() {
    const gallery = await fetchAll(this.context.token);
    console.log(gallery);
    if (gallery.error) return this.setState({ error: gallery.error });
    this.setState({ imageBank: gallery.data });
    return gallery.data;
  }

  getImageDisplay = () => {
    return this.state.layouts
      .filter(layout => layout.i !== "new")
      .map(layout => {
        return this.getImageComponent(layout.i);
      })
      .filter(img => img);
    // this.setState({ imageDisplay });
  };

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

  wsInit() {
    this.ws = new WebSocket(
      `${process.env.REACT_APP_WS_SERVER}/gallery?auth=${this.context.token}`
    );
    this.ws.onmessage = this.newMessage;
  }

  newMessage = message => {
    const update = JSON.parse(message.data);
    console.log("new message", update);
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
              aspect_ratio: update.aspect_ratio,
            }
          : image
      ),
    }));
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
    // if (!image_id) return;
    // this.setState(prevState => ({
    //   imageDisplay: prevState.imageDisplay.map(image =>
    //     image.image_id === image_id
    //       ? { ...image, selected: !image.selected }
    //       : { ...image }
    //   ),
    // }));
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

  removeFromDisplay = id => {
    console.log("id", id);
    const newLayout = this.state.layouts.filter(
      layout => layout.i !== id.toString()
    );
    this.getImageDisplay(newLayout);
    this.setState({ layouts: newLayout });
    // this.removeLayoutProperties(id);

    // this.setState(prevState => ({
    //   imageBank: prevState.imageBank.concat(
    //     prevState.imageDisplay
    //       .filter(image => image.selected)
    //       .map(image => ({ ...image, selected: false }))
    //   ),
    //   imageDisplay: prevState.imageDisplay.filter(image => !image.selected),
    // }));
  };

  saveDisplay = async () => {
    const idToInteger = this.state.layouts
      .filter(layout => layout.i !== "new")
      .map(layout => ({
        i: parseInt(layout.i),
        x: layout.x,
        y: layout.y,
        w: layout.w,
        h: layout.h,
      }));
    this.mapImagePositionToLayout(idToInteger);
    console.log("id to integer", idToInteger);
    const success = await saveDisplay(this.context.token, idToInteger);
    if (success) localStorage.removeItem("rgl");
  };

  // used immediately before committing to db
  mapImagePositionToLayout = displayObject => {
    displayObject.forEach(display => {
      const image = this.state.imageBank.find(image => image.image_id === display.i);
      display.position = JSON.stringify(image.position);
    });
  };

  setLayoutState = layout => {
    this.setState({ layouts: layout });
  };

  resetLayout = () => {
    const originalLayout = this.getSavedLayouts();
    this.getImageDisplay(originalLayout);
    this.setState({ layouts: originalLayout });
  };

  setImagePosition = (id, pos) => {
    this.setState(prevState => ({
      imageBank: prevState.imageBank.map(image => {
        return image.image_id === id
          ? { ...image, position: { ...image.position, ...pos } }
          : image;
      }),
    }));
    this.getImageDisplay(this.state.layouts);
  };

  setDragging = bool => {
    this.setState({ dragging: bool });
  };

  test = () => {
    console.log("ws", this.ws);
  };

  render() {
    // console.log("layouts", this.state.layouts);
    // console.log("imageBank", this.state.imageBank);
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
          removeFromDisplay: this.removeFromDisplay,
          addToDisplay: this.addToDisplay,
          saveDisplay: this.saveDisplay,
          deselectAllDisplay: this.deselectAllDisplay,
          addImageComponent: this.addImageComponent,
          setLayoutState: this.setLayoutState,
          resetLayout: this.resetLayout,
          setDragging: this.setDragging,
          setImagePosition: this.setImagePosition,
          imageDisplay: this.getImageDisplay,
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
