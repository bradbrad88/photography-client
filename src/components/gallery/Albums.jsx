import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Reel from "components/elements/Reel";
import { album } from "assets/svgButtons";
import "stylesheets/Gallery.scss";
import GalleryContext from "contexts/GalleryContext";

const Albums = () => {
  const { gallery } = useContext(GalleryContext);
  const nav = useNavigate();
  const renderAlbums = () => {
    return gallery.map(album => (
      <div
        onClick={() => nav(`/gallery/${album.url.toLowerCase()}`)}
        className="album item"
        key={album.title}
      >
        <h3>{album.title}</h3>
        <Reel images={album.images} width={500} imageWidth={250} height={130} />
      </div>
    ));
  };
  const newAlbum = () => {
    nav("/gallery/new");
  };
  return (
    <div className="albums">
      <h2>Your Albums</h2>
      <div className="album grid">
        <div onClick={newAlbum} className="album item new">
          <h3>Create New Album</h3>
          <span>{album(150)}</span>
        </div>
        {renderAlbums()}
      </div>
    </div>
  );
};

export default Albums;
