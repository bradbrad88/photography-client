import React, { useState, useEffect, useRef, useMemo } from "react";
import ImageFlareImage from "./ImageFlareImage";
import "../../stylesheets/ImageFlare.css";
const IMAGE_GAP = 800;
const TRAVEL_DISTANCE = 4000;
const images = [
  {
    src: "https://far-out-photography-local.s3.ap-southeast-2.amazonaws.com/1632489422889.jpg",
    hor: 10,
    scale: 1,
  },
  {
    src: "https://far-out-photography-local.s3.ap-southeast-2.amazonaws.com/1632489422889.jpg",
    hor: 90,
    scale: 1.6,
  },
  {
    src: "https://far-out-photography-local.s3.ap-southeast-2.amazonaws.com/1632489422889.jpg",
    hor: 15,
    scale: 1.2,
  },
  {
    src: "https://far-out-photography-local.s3.ap-southeast-2.amazonaws.com/1632489422889.jpg",
    hor: 60,
    scale: 1.1,
  },
  {
    src: "https://far-out-photography-local.s3.ap-southeast-2.amazonaws.com/1632489422889.jpg",
    hor: 85,
    scale: 1.2,
  },
  {
    src: "https://far-out-photography-local.s3.ap-southeast-2.amazonaws.com/1632489422889.jpg",
    hor: 20,
    scale: 1.6,
  },
];
const ImageFlare = ({ windowHeight, windowWidth }) => {
  const [percentScrolled, setPercentScrolled] = useState(0);
  const [pixelsScrolled, setPixelsScrolled] = useState(0);
  const ref = useRef();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const imagesWithScale = useMemo(() => {
    return images.map(image => {
      const rand = Math.random() + 1;
      return { ...image, scale: rand };
    });
  }, []);

  const renderImages = useMemo(() => {
    return images.map((image, idx) => {
      // const rand = Math.random() + 1;

      return (
        <ImageFlareImage
          key={idx}
          percentScrolled={percentScrolled}
          pixelsScrolled={pixelsScrolled}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          scale={image.scale}
          idx={idx}
          src={image.src}
          totalImages={images.length}
          travelDistance={TRAVEL_DISTANCE}
          imageGap={IMAGE_GAP}
          horizontalPercentage={image.hor}
        />
      );
    });
  }, [pixelsScrolled]);

  const containerHeight = useMemo(() => {
    return (images.length - 1) * IMAGE_GAP + TRAVEL_DISTANCE;
  }, []);

  const handleScroll2 = e => {
    const rect = ref.current.getBoundingClientRect();
    let input = ((rect.height - rect.bottom) * 100) / (rect.height - windowHeight);
    if (input < 0) input = 0;
    if (input > 100) input = 100;
    setPercentScrolled(input);
  };

  const handleScroll = () => {
    const { height, bottom } = ref.current.getBoundingClientRect();
    let input = height - bottom;
    if (input < 0) input = 0;
    if (input > height - windowHeight) input = height - windowHeight;
    setPixelsScrolled(input);
  };

  return (
    <div
      ref={ref}
      className={"image-flare"}
      style={{ height: `${containerHeight}px` }}
    >
      <div
        className={`title-container ${
          pixelsScrolled > 0 && pixelsScrolled < containerHeight && "active"
        }`}
      >
        <h1>SOME OF MY WORK</h1>
        <div
          className={"image-flare-progress"}
          style={{ width: `${(pixelsScrolled / containerHeight) * 100}%` }}
        ></div>
      </div>
      {/* <div className={"test"}>{windowHeight}</div> */}
      {renderImages}
    </div>
  );
};

export default ImageFlare;
