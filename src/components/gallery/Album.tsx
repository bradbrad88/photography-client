import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import galleryContext from "contexts/GalleryContext";
import Button from "components/elements/Button";

const Album = () => {
  const { gallery, deleteAlbum } = galleryContext();
  const { albumId } = useParams();
  const nav = useNavigate();

  const album = useMemo(() => {
    return gallery.find(album => album.url === albumId);
  }, [gallery, albumId]);

  const images = useMemo(() => {
    if (!album) return null;
    return album.images.map(image => <img src={image.url} key={image.id} alt={"TODO"} />);
  }, [album]);

  const onDelete = async () => {
    const success = await deleteAlbum(album?.id!);
    if (success) nav("/gallery");
  };

  if (!album) return null;
  return (
    <div className="album">
      <h1>{album.title}</h1>
      {images}
      <Button text="Delete" onClick={onDelete} />
    </div>
  );
};

export default Album;
