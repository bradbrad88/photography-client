import { Image } from "./Album";

interface PropTypes {
  image: Image;
}

const CanvasImage = ({ image }: PropTypes) => {
  return (
    <div className="image">
      <img src={image.urls?.thumbnail} />
    </div>
  );
};

export default CanvasImage;
