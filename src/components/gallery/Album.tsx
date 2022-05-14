import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { Ouroboro } from "react-spinners-css";
import useFetch from "hooks/useFetch";
import ImageBank from "./ImageBank";
import Button from "components/elements/Button";
import { AxiosRequestConfig } from "axios";

export interface Image {
  imageId: string;
  urls: Urls;
  aspectRatio?: number;
  uploadedBy?: string;
  uploadedAt?: Date;
}

export interface Urls {
  thumbnail: string;
  highres?: string;
}

export interface AlbumType {
  id: string;
  title: string;
  url: string;
  images: Image[];
}

interface FileWithId {
  imageId: string;
  file: File;
}

const Album = () => {
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const { albumUrl } = useParams();
  const { fetchJSON, deleteData, postImage, working } = useFetch();
  const nav = useNavigate();

  useEffect(() => {
    const fetchAlbum = async () => {
      const req: AxiosRequestConfig = {
        url: `/gallery/album/${albumUrl}`,
        withCredentials: true,
      };
      const fetchedAlbum = await fetchJSON<AlbumType>(req);
      setAlbum(fetchedAlbum);
    };
    fetchAlbum();
  }, [albumUrl, fetchJSON]);

  // const images = useMemo(() => {
  //   if (!album) return null;
  //   return album.images.map(image => (
  //     <img src={image.urls.thumbnail} key={image.imageId} alt={"TODO"} />
  //   ));
  // }, [album]);

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
      return await postImage(req);
    });
    Promise.all(promises);
  };

  const onAddImages = (files: Array<File>, albumId: string): void => {
    const filesWithId = applyId(files);
    const images = createImageArray(filesWithId);
    setImagesState(images);
    sendImages(filesWithId);
  };

  if (!album) return null;
  return (
    <div className="album-view">
      <div>
        <h1>{album.title}</h1>
        <Button text="Delete Album" onClick={onDelete} />
      </div>
      {working && <Ouroboro size={40} color={"rgba(0,0,0,0.3)"} />}
      <ImageBank album={album} addImages={onAddImages} />
    </div>
  );
};

export default Album;
