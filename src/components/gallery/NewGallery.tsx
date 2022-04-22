import { useState } from "react";
import { add } from "assets/svgButtons";
import Button from "components/elements/Button";
import { Album as AlbumType } from "contexts/GalleryContext";

interface Props {
  onNewAlbum: (album: AlbumType) => void;
}

const NewAlbum = ({ onNewAlbum }: Props) => {
  const [albumName, setAlbumName] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    if (failTest()) return;
    try {
      const headers = { "Content-Type": "application/json" };
      const data = { title: albumName };
      const body = JSON.stringify(data);
      const options: RequestInit = {
        body,
        method: "POST",
        headers,
        credentials: "include",
      };
      const res = await fetch(
        process.env.REACT_APP_SERVER_API + "/gallery/new",
        options
      );
      const { album, error }: { album: AlbumType; error: any } = await res.json();
      if (error) return console.error(error);
      onNewAlbum(album);
    } catch (error: any) {
      console.error(error);
      setMsg(error.message);
    }
  };
  const failTest = () => {
    if (albumName.toLowerCase() === "new") {
      setMsg("Use something other than 'new'");
      return true;
    }
    return false;
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg("");
    setAlbumName(e.target.value);
  };
  return (
    <div className="albums">
      <div className="form">
        <h2>New Album</h2>
        <label>
          Album Name:
          <input
            placeholder="Alberto..."
            value={albumName}
            type="text"
            onChange={onChange}
          />
        </label>

        <Button onClick={submit} text="Create" icon={add} iconSize={36} />
        {msg && <div className="error-message">{msg}</div>}
      </div>
    </div>
  );
};

export default NewAlbum;
