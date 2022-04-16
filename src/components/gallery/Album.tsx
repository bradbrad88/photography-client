import { useMemo } from "react";

interface Props {
  album?: AlbumObject[] | undefined;
}

interface AlbumObject {
  src: string;
  alt: string;
}

const Album = ({ album = [] }: Props) => {
  const renderAlbum = useMemo(() => {
    return album.map(image => (
      <img src={image.src} alt={image.alt} key={image.src} />
    ));
  }, [album]);
  return <div className="album">Hi, im an album{renderAlbum}</div>;
};

export default Album;
