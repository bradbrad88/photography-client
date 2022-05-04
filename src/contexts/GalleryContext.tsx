import { useState, useEffect, useCallback } from "react";
import userContext from "contexts/UserContext";
import { createCtx } from "./utils";

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

type GalleryCtx = {
  gallery: Gallery;
  addAlbum: (album: Album) => void;
  [x: string | number | symbol]: unknown;
};

// const GalleryContext = React.createContext({} as GalleryCtx);
const [useCtx, Provider] = createCtx<GalleryCtx>();

export const GalleryProvider = ({ children }: any) => {
  const { profile } = userContext();
  const [gallery, setGallery] = useState<Gallery>([]);

  const getGallery = useCallback(async (profileId: string | undefined) => {
    if (profileId === undefined) return;
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_API + `/gallery/${profileId}`);
      const data = await res.json();
      setGallery!(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addAlbum = (album: Album) => {
    setGallery(prevState => [...prevState, album]);
  };
  useEffect(() => {
    getGallery(profile?.id);
  }, [getGallery, profile]);
  return (
    <Provider value={{ gallery, getGallery, addAlbum } as GalleryCtx}>{children}</Provider>
  );
};

export default useCtx;
