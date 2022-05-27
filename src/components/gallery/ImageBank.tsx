import { useMemo, useRef, useState } from "react";
import ImageBankCard from "./ImageBankCard";
import ImageUploadCard from "./ImageUploadCard";
import { Image } from "./Album";
import Button from "components/elements/Button";
import { up, down } from "assets/svgButtons";
import "./stylesheets/ImageBank.scss";

interface PropTypes {
  images: Image[];
  addImages: (images: Array<File>) => void;
}

const ImageBank = ({ images = [], addImages }: PropTypes) => {
  const [collapsed, setCollapsed] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const imageCards = useMemo(() => {
    return images.map(image => {
      return image.uploadedAt ? (
        <ImageBankCard image={image} key={image.imageId} />
      ) : (
        <ImageUploadCard image={image} key={image.imageId} />
      );
    });
  }, [images]);

  const onAddImage = () => {
    if (!fileRef.current) return;
    fileRef.current.click();
  };

  const onAddFileInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!fileRef.current || !fileRef.current.files) return;
    addImages([...fileRef.current.files]);
  };

  const onDebug = () => {
    fetch(process.env.REACT_APP_SERVER_API + "/show-stuff");
  };

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`image-bank ${collapsed && "collapsed"}`}>
      <div className="header">
        <h1>IMAGE BANK</h1>
        <Button
          className="top right verysmall"
          icon={collapsed ? up : down}
          onClick={onCollapse}
        />
      </div>
      <div className="ui">
        <div className="controls">
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
    </div>
  );
};

export default ImageBank;
