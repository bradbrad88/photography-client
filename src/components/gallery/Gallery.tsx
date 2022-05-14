import { Routes, Route, useNavigate } from "react-router-dom";
import Albums from "./Albums";
import NewGallery from "./NewGallery";
import Album, { AlbumType } from "./Album";

const Gallery = () => {
  const nav = useNavigate();

  const onNewAlbum = (album: AlbumType) => {
    nav(album.url);
  };
  return (
    <Routes>
      <Route path="" element={<Albums />} />
      <Route path=":albumUrl" element={<Album />} />
      <Route path="/new" element={<NewGallery onNewAlbum={onNewAlbum} />} />
    </Routes>
  );
};

export default Gallery;
