import React, { useState, useEffect, useRef, useContext } from "react";
import EditContext from "../contexts/GalleryEditContext";
import "../../stylesheets/ImageGallery.css";
import "../../stylesheets/GalleryEdit.css";
import { edit, centerHorizontal, centerVertical } from "../../assets/svgButtons";

const ImageCard = React.forwardRef(
  ({ style, className, image, handleClick, children, ...restOfProps }, ref) => {
    const [spans, setSpans] = useState(0);
    const editContext = useContext(EditContext);
    const imageRef = useRef();
    const NUDGE_VALUE = 5;
    useEffect(() => {
      if (ref.current) {
        console.log(ref.current);
        // getSpans();
        // imageRef.current.addEventListener("load", getSpans);
        ref.current.addEventListener("load", blurring);
        ref.current.addEventListener("load", displayImage);
        // imageRef.current.addEventListener("resize", getSpans);
        // window.addEventListener("resize", getSpans);
      }
    }, []);
    // console.log(image.image_id, ref.current.clientHeight);
    // const getSpans = () => {
    //   if (!imageRef.current) return;
    //   const height = imageRef.current.clientHeight;
    //   const span = Math.ceil(height + 20);
    //   if (span === spans) return;
    //   setSpans(span);
    // };

    // blurring effect of image load-in
    const blurring = () => {
      let load = 0;
      const blur = () => {
        load++;
        if (load > 49) {
          clearInterval(int);
        }
        if (ref.current) {
          ref.current.style.filter = `blur(${scale(load, 0, 50, 10, 0)}px)`;
        }
      };
      let int = setInterval(blur, 10);
      const scale = (num, in_min, in_max, out_min, out_max) => {
        return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
      };
    };

    // wait until completely loaded then blur in
    const displayImage = () => {
      if (!ref.current) return;
      ref.current.style.visibility = "visible";
    };

    // ability to select image in editmode - editContext doesn't encompass the display gallery, just editmode gallery
    const onClick = e => {
      // e.stopPropagation();
      console.log(ref.current);
      if (handleClick) {
        e.stopPropagation();
        handleClick(image);
        return;
      }
      if (!editContext) return;
      editContext.toggleSelectedDisplay(image.image_id);
    };

    const onRemoveClick = () => {
      editContext.removeFromDisplay(image.image_id);
    };

    const handleVertCenter = e => {
      e.stopPropagation();
      const pos = { v: 50 };
      editContext.setImagePosition(image.image_id, pos);
    };
    const handleVertTop = e => {
      e.stopPropagation();
      if (image.position?.v <= 0) return { v: 0 };
      const value = image.position?.v
        ? image.position.v - NUDGE_VALUE
        : 50 - NUDGE_VALUE;
      const pos = { v: value };
      editContext.setImagePosition(image.image_id, pos);
    };
    const handleVertBottom = e => {
      e.stopPropagation();
      if (image.position?.v >= 100) return { v: 100 };
      const value =
        image.position?.v || image.position?.v === 0
          ? image.position.v + NUDGE_VALUE
          : 50 + NUDGE_VALUE;
      const pos = { v: value };
      editContext.setImagePosition(image.image_id, pos);
    };
    const handleHorCenter = e => {
      e.stopPropagation();
      const pos = { h: 50 };
      editContext.setImagePosition(image.image_id, pos);
    };
    const handleHorLeft = e => {
      e.stopPropagation();
      if (image.position?.h <= 0) return { h: 0 };
      const value = image.position?.h
        ? image.position.h - NUDGE_VALUE
        : 50 - NUDGE_VALUE;
      const pos = { h: value };
      editContext.setImagePosition(image.image_id, pos);
    };
    const handleHorRight = e => {
      e.stopPropagation();
      if (image.position?.h >= 100) return { h: 100 };
      const value =
        image.position?.h || image.position?.h === 0
          ? image.position.h + NUDGE_VALUE
          : 50 + NUDGE_VALUE;
      const pos = { h: value };
      editContext.setImagePosition(image.image_id, pos);
    };

    const onMouseDown = e => {
      e.stopPropagation();
    };

    const clientRatio = () => {
      if (!ref.current) return;
      return ref.current.clientWidth / ref.current.clientHeight;
    };

    return (
      <div
        ref={ref}
        key={image.image_id}
        style={{
          ...style,
          backgroundImage: `url(${image.thumbnail})`,
          backgroundRepeat: "none",
          backgroundSize: "cover",
          backgroundPosition: `${
            image.position?.h === undefined ? "50" : image.position.h
          }% ${image.position?.v === undefined ? "50" : image.position.v}%`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "100px",
        }}
        className={`${className} image-card`}
        // draggable={true}
        onClick={onClick}
        {...restOfProps}
      >
        {/* editContext tests for edit mode, disabling tools when in display mode */}
        {editContext && (
          <div className={"tools"}>
            <button className={"remove"} onClick={onRemoveClick}>
              X
            </button>
            {clientRatio() > image.aspect_ratio && (
              <div className={"position vertical"}>
                <button
                  onClick={handleVertBottom}
                  onMouseDown={onMouseDown}
                ></button>
                <button onClick={handleVertCenter} onMouseDown={onMouseDown}>
                  {centerVertical}
                </button>
                <button onClick={handleVertTop} onMouseDown={onMouseDown}></button>
              </div>
            )}
            {clientRatio() < image.aspect_ratio && (
              <div className={"position horizontal"}>
                <button onClick={handleHorRight} onMouseDown={onMouseDown}></button>
                <button onClick={handleHorCenter} onMouseDown={onMouseDown}>
                  {centerHorizontal}
                </button>
                <button onClick={handleHorLeft} onMouseDown={onMouseDown}></button>
              </div>
            )}
            {/* <p style={{ backgroundColor: "#000" }}>{image.image_id}</p> */}
          </div>
        )}
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
