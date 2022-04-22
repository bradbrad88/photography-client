import React, { useState, useEffect, useCallback, useContext } from "react";
import UserContext from "contexts/UserContext";

interface Image {
  id: number;
  url: string;
  aspectRatio: number;
}

export interface Album {
  id: number;
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

const GalleryContext = React.createContext({} as GalleryCtx);

export const GalleryProvider = ({ children }: any) => {
  const { profile } = useContext(UserContext);
  const [gallery, setGallery] = useState<Gallery>([]);

  const getGallery = useCallback(async (profileId: number) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_API + `/gallery/${profileId}`
      );
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
    getGallery(profile.id);
  }, [getGallery, profile]);
  return (
    <GalleryContext.Provider value={{ gallery, getGallery, addAlbum } as GalleryCtx}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryContext;
