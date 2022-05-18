import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ouroboro } from "react-spinners-css";
import { AxiosRequestConfig } from "axios";
import useFetch from "hooks/useFetch";
import { AlbumType } from "./Album";
import { album } from "assets/svgButtons";
import "stylesheets/Gallery.scss";

const Albums = () => {
  const [albums, setAlbums] = useState<AlbumType[] | null>(null);
  const nav = useNavigate();
  const { fetchJSON, working } = useFetch();

  useEffect(() => {
    const loadState = async () => {
      const req: AxiosRequestConfig = { url: "/gallery/albums", withCredentials: true };
      const fetchedAlbums = await fetchJSON<AlbumType[]>(req);
      setAlbums(fetchedAlbums);
    };
    loadState();
  }, [fetchJSON]);

  const navToAlbum = (url: string) => {
    const urlLower = url.toLowerCase();
    nav(`/gallery/${urlLower}`);
  };

  const renderAlbums = () => {
    if (!albums) return null;
    return albums.map(album => (
      <div onClick={() => navToAlbum(album.url)} className="album item" key={album.title}>
        <h3>{album.title}</h3>
        {/* <Reel className={""} images={album.images} width={500} imageWidth={250} height={130} /> */}
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
        {working ? <Ouroboro size={50} color={"black"} /> : renderAlbums()}
      </div>
    </div>
  );
};

export default Albums;
