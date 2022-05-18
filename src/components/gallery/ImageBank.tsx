import { useMemo, useRef } from "react";
import ImageUploadCard from "./ImageUploadCard";
import { AlbumType } from "./Album";
import Button from "components/elements/Button";
import "./stylesheets/ImageBank.scss";

interface PropTypes {
  album: AlbumType;
  addImages: (images: Array<File>, imageId: string) => void;
}

const ImageBank = ({ album, addImages }: PropTypes) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const imageCards = useMemo(() => {
    if (!album) return null;
    return album.images.map(image => {
      return image.uploadedAt ? (
        <div className="image-bank-card" key={image.imageId}>
          <img src={image.urls?.thumbnail} alt="" />
        </div>
      ) : (
        <ImageUploadCard image={image} key={image.imageId} />
      );
    });
  }, [album]);

  const onAddImage = () => {
    if (!fileRef.current) return;
    fileRef.current.click();
  };

  const onAddFileInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!fileRef.current || !fileRef.current.files) return;
    addImages([...fileRef.current.files], album.id);
  };

  const onDebug = () => {
    fetch(process.env.REACT_APP_SERVER_API + "/show-stuff");
  };

  return (
    <div className="image-bank">
      <div className={"ui"}>
        <h1>IMAGE BANK</h1>
        <Button onClick={onDebug} text={"Debug Server"} />
        <Button onClick={onAddImage} text={"Add Image"} />
        <input
          type={"file"}
          ref={fileRef}
          style={{ display: "none" }}
          onInput={onAddFileInput}
          accept={"image/png, image/jpeg"}
          multiple
        />
      </div>
      <div className="images">{imageCards}</div>
    </div>
  );
};

export default ImageBank;
