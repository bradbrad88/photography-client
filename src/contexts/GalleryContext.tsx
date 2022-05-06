import { useState, useEffect, useCallback } from "react";
import userContext from "contexts/UserContext";
import { createCtx } from "./utils";
import useFetch from "utils/fetchData";

interface Image {
  id: string;
  url: string;
  aspectRatio: number;
}

export interface Album {
  id: string;
  title: string;
  url: string;
  images: Image[];
}

export type Gallery = Album[];

interface GalleryCtx {
  gallery: Gallery;
  getGallery: (profileId: string) => void;
  addAlbum: (album: Album) => void;
  deleteAlbum: (albumId: string) => Promise<boolean>;
}

const [useCtx, Provider] = createCtx<GalleryCtx>();

export const GalleryProvider = ({ children }: any) => {
  const { profile } = userContext();
  const [gallery, setGallery] = useState<Gallery>([]);
  const [errMsg, setErrMsg] = useState("");
  const { fetchJSON, deleteData, working } = useFetch();

  const getGallery = useCallback(async (profileId: string | undefined) => {
    if (profileId === undefined) return;
    try {
      const req: Request = new Request(
        process.env.REACT_APP_SERVER_API + `/gallery/${profileId}`,
        { method: "GET" }
      );
      const data = await fetchJSON<Gallery>(req);
      if (!data) return setErrMsg("Unable to fetch data at this time");
      setGallery!(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addAlbum = (album: Album) => {
    if (!album.images) album.images = [];
    setGallery(prevState => [...prevState, album]);
  };

  const deleteAlbum = async (albumId: string) => {
    const albumIdx = gallery.findIndex(album => {
      console.log("album.id", album.id);
      console.log("albumId", albumId);
      return album.id === albumId;
    });
    if (albumIdx === -1) return false;
    console.log("INDEX", albumIdx);
    console.log("GALLERY ITEM", gallery[albumIdx]);
    if (gallery[albumIdx].images.length > 0) return false;

    const url = new URL("/gallery/" + albumId, process.env.REACT_APP_SERVER_API);
    console.log(url.toString());
    const req: Request = new Request(url.toString(), { method: "DELETE" });
    const success = await deleteData(req);
    if (!success) return success;
    setGallery(prevState => {
      prevState.splice(albumIdx, 1);
      return [...prevState];
    });
    return success;
  };

  useEffect(() => {
    getGallery(profile?.id);
  }, [getGallery, profile]);
  return (
    <Provider
      value={{ gallery, getGallery, addAlbum, deleteAlbum, errMsg, working } as GalleryCtx}
    >
      {children}
    </Provider>
  );
};

export default useCtx;
