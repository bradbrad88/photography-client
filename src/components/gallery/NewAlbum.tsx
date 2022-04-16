import { useState } from "react";

const NewAlbum = () => {
  const [albumName, setAlbumName] = useState("");
  const [msg, setMsg] = useState("");
  const submit = () => {
    if (failTest()) return;
  };
  const failTest = () => {
    if (albumName.toLowerCase() === "new") {
      return setMsg("Use something other than 'new'");
    }
    return true;
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg("");
    setAlbumName(e.target.value);
  };
  return (
    <div className="albums">
      <div className="form">
        <h2>New Album</h2>
        <label
        // htmlFor="album-name"
        >
          Album Name:
          <input
            // id={"album-name"}
            placeholder="alberto..."
            value={albumName}
            type="text"
            onChange={onChange}
          />
        </label>
        <button onClick={submit}>Create</button>
        {msg && <div className="error-message">{msg}</div>}
      </div>
    </div>
  );
};

export default NewAlbum;
