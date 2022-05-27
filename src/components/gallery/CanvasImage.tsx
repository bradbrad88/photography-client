import { Image } from "./Album";

interface PropTypes {
  image: Image;
}

const CanvasImage = ({ image }: PropTypes) => {
  return (
    <div className="image" draggable={false}>
      <img src={image.urls?.thumbnail} draggable={false} />
    </div>
  );
};

export default CanvasImage;
