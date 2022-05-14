import { useState } from "react";
import { add } from "assets/svgButtons";
import Button from "components/elements/Button";
import { Album as AlbumType } from "contexts/GalleryContext";
import useFetch from "hooks/useFetch";
import { AxiosRequestConfig } from "axios";

interface Props {
  onNewAlbum: (album: AlbumType) => void;
}

const NewAlbum = ({ onNewAlbum }: Props) => {
  const [albumName, setAlbumName] = useState("");
  const [msg, setMsg] = useState("");
  const { fetchJSON, working } = useFetch();

  const submit = async () => {
    if (failTest()) return;
    const url = process.env.REACT_APP_SERVER_API + "/gallery/new";
    const req: AxiosRequestConfig = {
      url,
      data: { title: albumName },
      method: "POST",
      withCredentials: true,
    };
    const album = await fetchJSON<AlbumType>(req);
    if (!album) return;
    onNewAlbum(album);
  };

  const failTest = (): boolean => {
    if (!albumName) {
      setMsg("The album name can not be blank");
      return true;
    }
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
          <input placeholder="Alberto..." value={albumName} type="text" onChange={onChange} />
        </label>
        <Button onClick={submit} text="Create" icon={add} iconSize={36} working={working} />
        {msg && <div className="error-message">{msg}</div>}
      </div>
    </div>
  );
};

export default NewAlbum;
