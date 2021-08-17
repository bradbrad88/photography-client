import React, { useState, useEffect, useRef, useContext } from "react";
import EditContext from "../contexts/GalleryEditContext";
import "../../stylesheets/ImageGallery.css";
import "../../stylesheets/GalleryEdit.css";
import { edit } from "../../assets/svgButtons";

const ImageCard = React.forwardRef(
  ({ style, className, image, handleClick, children, ...restOfProps }, ref) => {
    const [spans, setSpans] = useState(0);
    const editContext = useContext(EditContext);
    const imageRef = useRef();

    useEffect(() => {
      if (imageRef.current) {
        getSpans();
        imageRef.current.addEventListener("load", getSpans);
        imageRef.current.addEventListener("load", blurring);
        imageRef.current.addEventListener("load", displayImage);
        imageRef.current.addEventListener("resize", getSpans);
        window.addEventListener("resize", getSpans);
      }
    }, [image.emphasize]);

    const getSpans = () => {
      if (!imageRef.current) return;
      const height = imageRef.current.clientHeight;
      const span = Math.ceil(height + 20);
      if (span === spans) return;
      setSpans(span);
    };

    // blurring effect of image load-in
    const blurring = () => {
      let load = 0;
      const blur = () => {
        load++;
        if (load > 49) {
          clearInterval(int);
        }
        if (imageRef.current) {
          imageRef.current.style.filter = `blur(${scale(load, 0, 50, 10, 0)}px)`;
        }
      };
      let int = setInterval(blur, 10);
      const scale = (num, in_min, in_max, out_min, out_max) => {
        return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
      };
    };

    // wait until completely loaded then blur in
    const displayImage = () => {
      if (!imageRef.current) return;
      imageRef.current.style.visibility = "visible";
    };

    // ability to select image in editmode - editContext doesn't encompass the display gallery, just editmode gallery
    const onClick = e => {
      // e.stopPropagation();
      if (handleClick) {
        handleClick(image);
        return;
      }
      if (!editContext) return;
      editContext.toggleSelectedDisplay(image.image_id);
    };

    const onRemoveClick = () => {
      editContext.removeFromDisplay(image.image_id);
    };

    return (
      <div
        ref={ref}
        key={image.image_id}
        style={{
          ...style,
          backgroundImage: `url(${image.thumbnail})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          color: "#fff",
          fontSize: "100px",
        }}
        className={`${className} image-card`}
        // draggable={true}
        onClick={onClick}
        {...restOfProps}
      >
        <button onClick={onRemoveClick}>X</button>
        {image.image_id}
        {/* <img
          className={`image-card ${image.selected ? "selected" : ""}`}
          style={{
            gridRowEnd: `span ${spans}`,
            gridColumnEnd: `span ${image.emphasize}`,
          }}
          src={image.thumbnail}
          alt={image.image_desc}
          ref={imageRef}
          onClick={onClick}
        /> */}
        {children}
      </div>
    );
  }
);

// const ImageCard = ({ image, handleClick }) => {
//   const [spans, setSpans] = useState(0);
//   const editContext = useContext(EditContext);
//   const imageRef = useRef();

//   useEffect(() => {
//     if (imageRef.current) {
//       getSpans();
//       imageRef.current.addEventListener("load", getSpans);
//       imageRef.current.addEventListener("load", blurring);
//       imageRef.current.addEventListener("load", displayImage);
//       imageRef.current.addEventListener("resize", getSpans);
//       window.addEventListener("resize", getSpans);
//     }
//   }, [image.emphasize]);

//   const getSpans = () => {
//     if (!imageRef.current) return;
//     const height = imageRef.current.clientHeight;
//     const span = Math.ceil(height + 20);
//     if (span === spans) return;
//     setSpans(span);
//   };

//   // blurring effect of image load-in
//   const blurring = () => {
//     let load = 0;
//     const blur = () => {
//       load++;
//       if (load > 49) {
//         clearInterval(int);
//       }
//       if (imageRef.current) {
//         imageRef.current.style.filter = `blur(${scale(load, 0, 50, 10, 0)}px)`;
//       }
//     };
//     let int = setInterval(blur, 10);
//     const scale = (num, in_min, in_max, out_min, out_max) => {
//       return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
//     };
//   };

//   // wait until completely loaded then blur in
//   const displayImage = () => {
//     if (!imageRef.current) return;
//     imageRef.current.style.visibility = "visible";
//   };

//   // ability to select image in editmode - editContext doesn't encompass the display gallery, just editmode gallery
//   const onClick = e => {
//     e.stopPropagation();
//     if (handleClick) {
//       handleClick(image);
//       return;
//     }
//     if (!editContext) return;
//     editContext.toggleSelectedDisplay(image.image_id);
//   };

//   return (
//     <div>
//       <img
//         className={`image-card ${image.selected ? "selected" : ""}`}
//         style={{
//           gridRowEnd: `span ${spans}`,
//           gridColumnEnd: `span ${image.emphasize}`,
//         }}
//         src={image.thumbnail}
//         alt={image.image_desc}
//         ref={imageRef}
//         onClick={onClick}
//       />
//     </div>
//   );
// };

export default ImageCard;
