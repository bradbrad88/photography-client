import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import PositionalWrapper, { Position } from "components/wrappers/PositionalWrapper";
import CanvasImage from "./CanvasImage";
import "./stylesheets/Canvas.scss";

const SCALE_WIDTH = 12000;
const BUFFER_HEIGHT = 6000;

export interface CanvasItem {
  id: string;
  type: "text" | "image";
  content: any;
  position: Position;
}

interface PropTypes {
  canvasItems: CanvasItem[];
  maxWidth: number;
  setPosition: (id: string, position: any) => void;
  addImageToDisplay: (id: string, display: Position) => void;
}

const Canvas = ({ canvasItems, maxWidth, setPosition, addImageToDisplay }: PropTypes) => {
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const ref = useRef<HTMLDivElement>(null);

  const getComponent = useCallback((item: CanvasItem) => {
    switch (item.type) {
      case "image":
        return <CanvasImage image={item.content} />;
      case "text":
        return <div className="text">Text</div>;
      default:
        return null;
    }
  }, []);

  const height = useMemo(() => {
    const maxElement = canvasItems.reduce((p, c) => {
      return Math.max(c.position.height + c.position.y);
    }, 0);
    const height = (maxElement + BUFFER_HEIGHT) * scale;
    return height;
  }, [canvasItems, scale]);

  const items = useMemo(() => {
    return canvasItems.map(item => (
      <PositionalWrapper
        key={item.id}
        id={item.id}
        {...item.position}
        scale={scale}
        setPosition={setPosition}
      >
        {getComponent(item)}
      </PositionalWrapper>
    ));
  }, [canvasItems, getComponent, scale, setPosition]);

  useEffect(() => {
    setCanvasWidth(0.7 * maxWidth);
  }, [maxWidth]);

  useEffect(() => {
    setScale(canvasWidth / SCALE_WIDTH);
  }, [canvasWidth]);

  const onDrop = (e: React.DragEvent) => {
    // console.log("drop");
    // console.log(e.dataTransfer.getData("text/plain"));
    const data = e.dataTransfer.getData("text/plain");
    try {
      const { imageId, aspectRatio } = JSON.parse(data);

      const width = canvasWidth / 3 / scale;
      const height = width / aspectRatio;
      const parentRect = e.currentTarget.getBoundingClientRect();
      if (!parentRect) return;
      const { left, top } = parentRect;
      const display: Position = {
        width,
        height,
        x: (e.clientX - left) / scale,
        y: (e.clientY - top) / scale,
      };
      // console.log("client x", e.clientX);
      // console.log("rect left", left);
      // console.log("");
      addImageToDisplay(imageId, display);
    } catch (error) {}
  };

  const onDrag = () => {
    console.log("dragging");
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      style={{ width: `${canvasWidth}px`, height: `${height}px` }}
      className="canvas"
      onDrop={onDrop}
      onDrag={onDrag}
      onDragOver={onDragOver}
    >
      {items}
    </div>
  );
};

export default Canvas;
