import { Routes, Route, useNavigate } from "react-router-dom";
import Albums from "./Albums";
import NewGallery from "./NewGallery";
import Album from "./Album";
import galleryContext, { Album as AlbumType } from "contexts/GalleryContext";

const Gallery = () => {
  const { addAlbum } = galleryContext();
  const nav = useNavigate();

  const onNewAlbum = (album: AlbumType) => {
    addAlbum(album);
    nav(album.url);
  };
  return (
    <Routes>
      <Route path="" element={<Albums />} />
      <Route path=":albumId" element={<Album />} />
      <Route path="/new" element={<NewGallery onNewAlbum={onNewAlbum} />} />
    </Routes>
  );
};

export default Gallery;
