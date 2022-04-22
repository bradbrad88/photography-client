import { useMemo, useContext } from "react";
import { useParams } from "react-router-dom";
import GalleryContext from "contexts/GalleryContext";

const Album = () => {
  const { gallery } = useContext(GalleryContext);
  const { albumId } = useParams();

  const album = useMemo(() => {
    return gallery.find(album => album.url === albumId);
  }, [gallery, albumId]);

  const images = useMemo(() => {
    if (!album) return null;
    return album.images.map(image => (
      <img src={image.url} key={image.id} alt={"TODO"} />
    ));
  }, [album]);

  if (!album) return null;
  return (
    <div className="album">
      <h1>{album.title}</h1>
      {images}
    </div>
  );
};

export default Album;
