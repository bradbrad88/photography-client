import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { Ouroboro } from "react-spinners-css";
import subscribeContext from "contexts/UploadSubscribeContext";
import useFetch from "hooks/useFetch";
import useSize from "hooks/useSize";
import Canvas, { CanvasItem } from "./Canvas";
import { Position } from "components/wrappers/PositionalWrapper";
import ImageBank from "./ImageBank";
import Button from "components/elements/Button";
import { AxiosRequestConfig } from "axios";
import { desktop, tablet, mobile } from "assets/svgButtons";
import "./stylesheets/Album.scss";

export interface Image {
  imageId: string;
  urls?: Urls;
  aspectRatio?: number;
  uploadedBy?: string;
  uploadedAt?: Date;
}

export interface Urls {
  thumbnail?: string;
  highres?: string;
}

export interface AlbumType {
  id: string;
  title: string;
  url: string;
  images: Image[];
  thumbnails?: string[];
}

interface FileWithId {
  imageId: string;
  file: File;
}

interface ImageIdRef {
  [key: string]: string;
}

interface Display {
  breakpoint: Breakpoint;
  canvasItems: CanvasItem[];
}

type Breakpoint = "desktop" | "tablet" | "mobile";

const Album = () => {
  const nav = useNavigate();
  const { closeConnection, onProgress, onComplete } = subscribeContext();
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [displays, setDisplays] = useState<Display[]>([]);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");
  const { albumUrl } = useParams();
  const { fetchJSON, deleteData, postRequest, working } = useFetch();
  const [size, workspaceRef] = useSize();
  const imageIdRef = useRef<ImageIdRef>({});

  useEffect(() => {
    const fetchAlbum = async () => {
      const req: AxiosRequestConfig = {
        url: `/gallery/album/${albumUrl}`,
        withCredentials: true,
      };
      const fetchedAlbum = await fetchJSON<AlbumType>(req);
      setAlbum(fetchedAlbum);
    };
    const fetchCanvas = async () => {
      const req: AxiosRequestConfig = {
        url: `/gallery/${albumUrl}/canvas-items`,
        withCredentials: true,
        data: { url: albumUrl },
      };
      const fetchedItems = await fetchJSON<Display[]>(req);
      if (fetchedItems) setDisplays(fetchedItems);
    };
    fetchAlbum();
    fetchCanvas();
  }, [albumUrl, fetchJSON]);

  useEffect(() => {
    onComplete(data => {
      setTimeout(() => {
        setAlbum(prevState => {
          if (!prevState) return null;
          const editImage = prevState.images.findIndex(img => img.imageId === data.imageId);
          if (editImage !== -1) {
            prevState.images.splice(editImage, 1, { ...data });
          } else {
            prevState.images.unshift({ ...data });
          }
          return { ...prevState };
        });
      }, 500);
    });
    onProgress(data => {
      if (!imageIdRef.current[data.imageId]) {
        setImagesState([data]);
      }
    });
  }, [onComplete, onProgress]);

  // Seperate useEffect to ensure connection will only close on component unmounting
  useEffect(() => {
    return () => closeConnection();
  }, [closeConnection]);

  // Performance related - image lookup object for quick handling of messages with unknown id (eg: currently uploading on a different device)
  useEffect(() => {
    imageIdRef.current = album?.images.reduce((p: any, img) => {
      p[img.imageId] = true;
      return p;
    }, {});
  }, [album?.images]);

  const onDelete = async () => {
    if (!album) return;
    const req: AxiosRequestConfig = {
      url: `/gallery/${album.id}`,
      withCredentials: true,
      method: "DELETE",
    };
    const success = await deleteData(req);
    if (success) nav("/gallery");
  };

  const applyId = (images: Array<File>): FileWithId[] => {
    return images.map(image => ({
      imageId: uuidV4(),
      file: image,
    }));
  };

  const createImageArray = (images: FileWithId[]): Array<Image> => {
    return images.map(image => ({
      imageId: image.imageId,
      urls: {
        thumbnail: URL.createObjectURL(image.file),
      },
    }));
  };

  const setImagesState = (imageData: Image[]): void => {
    setAlbum(prevState => {
      if (!prevState) return null;
      const images: Image[] = [...prevState.images, ...imageData];
      return { ...prevState, images };
    });
  };

  const sendImages = (files: FileWithId[]) => {
    if (!album) return;
    const promises = files.map(async image => {
      const url = `/gallery/${album.id}/${image.imageId}/add-image`;
      const data = new FormData();
      data.append("image", image.file);
      const req: AxiosRequestConfig = {
        url,
        method: "POST",
        data,
        withCredentials: true,
      };
      return await postRequest(req);
    });
    Promise.all(promises);
  };

  const onAddImages = (files: Array<File>): void => {
    const filesWithId = applyId(files);
    const images = createImageArray(filesWithId);
    setImagesState(images);
    sendImages(filesWithId);
  };

  const canvasItems =
    displays.find(display => display.breakpoint === breakpoint)?.canvasItems || [];

  const saveLayout = async () => {
    if (!album) return;
    const req: AxiosRequestConfig = {
      url: "/gallery/canvas-items",
      data: {
        album: album.id,
        breakpoint,
        items: canvasItems,
      },
      method: "POST",
      withCredentials: true,
    };
    const res = await postRequest(req);
  };

  const setPosition = (id: string, position: Position) => {
    const item = canvasItems.find(item => item.id === id);
    if (!item) return;
    setDisplays(prevState =>
      prevState.map(display => {
        if (display.breakpoint === breakpoint) {
          display.canvasItems = display.canvasItems.map(item => {
            if (item.id === id) {
              item.position = position;
            }
            return item;
          });
        }
        return display;
      })
    );
  };

  const addImageToDisplay = (id: string, position: Position) => {
    const content = album?.images.find(image => image.imageId === id);
    const newItem: CanvasItem = {
      id,
      type: "image",
      content,
      position,
    };
    const newCanvasItems = [...canvasItems, newItem];
    setDisplays(prevState =>
      prevState.map(display => {
        if (display.breakpoint === breakpoint) {
          display.canvasItems = newCanvasItems;
        }
        return display;
      })
    );
  };

  if (!album) return null;
  return (
    <div className="album-view">
      <div className="header">
        <h1>{album.title}</h1>
        <Button text="save" onClick={saveLayout} />
        <div className="breakpoints">
          <Button
            className="small"
            icon={desktop}
            iconSize={35}
            onClick={() => setBreakpoint("desktop")}
          />
          <Button
            className="small"
            icon={tablet}
            iconSize={35}
            onClick={() => setBreakpoint("tablet")}
          />
          <Button
            className="small"
            icon={mobile}
            iconSize={35}
            onClick={() => setBreakpoint("mobile")}
          />
        </div>
        <Button text="Delete Album" onClick={onDelete} />
        {working && <Ouroboro size={40} color={"rgba(0,0,0,0.3)"} />}
      </div>
      <div ref={workspaceRef} className="work-space">
        <Canvas
          canvasItems={canvasItems}
          maxWidth={size.width}
          setPosition={setPosition}
          addImageToDisplay={addImageToDisplay}
        />
      </div>
      <ImageBank album={album} addImages={onAddImages} />
    </div>
  );
};

export default Album;
