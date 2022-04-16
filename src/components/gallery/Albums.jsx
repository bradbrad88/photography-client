import { useNavigate } from "react-router-dom";
import Reel from "components/elements/Reel";
import { album } from "assets/svgButtons";
import "stylesheets/Gallery.scss";

const Albums = ({
  albums = [
    {
      title: "Example",
      images: [
        {
          src: "https://images.unsplash.com/photo-1636015348041-cea51783d2ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3088&q=80",
          alt: "example picture",
        },
        {
          src: "https://images.unsplash.com/photo-1459682687441-7761439a709d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2140&q=80",
          alt: "duck",
        },
      ],
    },
  ],
}) => {
  const nav = useNavigate();
  const renderAlbums = () => {
    return albums.map(album => (
      <div
        onClick={() => nav(`/gallery/${album.title.toLowerCase()}`)}
        className="album item"
        key={album.title}
      >
        <h3>{album.title}</h3>
        <Reel images={album.images} width={500} imageWidth={250} height={130} />
      </div>
    ));
  };
  const newAlbum = () => {
    nav("/gallery/album/new");
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
