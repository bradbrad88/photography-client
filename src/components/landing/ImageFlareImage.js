import React, { useState, useMemo, useRef, useEffect } from "react";

const ImageFlareImage = ({
  src,
  scale,
  percentScrolled,
  pixelsScrolled,
  idx,
  windowWidth,
  windowHeight,
  travelDistance,
  imageGap,
  horizontalPercentage,
}) => {
  // const [rand, setRand] = useState(0);
  const ref = useRef();
  const [height, setHeight] = useState(0);
  // const [offsetY, setOffsetY] = useState(0);
  const width = useMemo(() => {
    return windowWidth * 0.25 * scale;
  }, [windowWidth, scale]);

  const calcOffsetY = () => {
    return (
      (-1 *
        (windowHeight + height * (scale * 2)) *
        (pixelsScrolled - imageGap * idx)) /
      travelDistance
    );
  };

  const calcZIndex = useMemo(() => {
    return parseInt(scale * 1000);
  }, []);

  useEffect(() => {
    // setRand(Math.random());
  }, []);
  const calcOffsetX = useMemo(() => {
    return (horizontalPercentage / 100) * (windowWidth - width);
  }, [windowWidth, scale]);

  const calcShadow = () => {
    const min = (-5 * scale * 50) / 100;
    const max = (20 * scale * 50) / 100;
    const percent = calcOffsetY() / (windowHeight + height);
    // const hor = 10 * scale;
    const hor = scale * 5 + (horizontalPercentage * 3) / 100;
    const ver = percent * (max - min) - min;
    // const blur = (20 * (scale - 0.8) * 100) / (horizontalPercentage * 2);
    const blur = 8 * scale;
    const spread = 2 * scale;
    return `${hor}px ${ver}px ${blur}px ${spread}px rgba(0, 0, 0, 0.2)`;
  };

  const onLoad = () => {
    setHeight(ref.current.clientHeight);
  };

  return (
    <div
      ref={ref}
      className={`image-container ${pixelsScrolled > 0 && "active"}`}
      style={{
        transform: `translateX(${calcOffsetX}px) translateY(${calcOffsetY()}px)`,
        zIndex: `${calcZIndex}`,
        boxShadow: calcShadow(),
      }}
    >
      <img onLoad={onLoad} src={src} style={{ width: `${width}px` }} />
    </div>
  );
};

export default ImageFlareImage;
