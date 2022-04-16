import { Routes, Route } from "react-router-dom";
import Albums from "./Albums";
import NewAlbum from "./NewAlbum";
import Album from "./Album";

const Gallery = () => {
  return (
    <Routes>
      <Route path="" element={<Albums />} />
      <Route path=":albumId" element={<Album />} />
      <Route path="album/new" element={<NewAlbum />} />
    </Routes>
  );
};

export default Gallery;
