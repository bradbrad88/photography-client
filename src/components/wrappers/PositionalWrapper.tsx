import React, { ReactNode, useState, useRef, useEffect } from "react";
import { aspectRatio } from "assets/svgButtons";
import "./stylesheets/PositionalWrapper.scss";

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

type PropTypes = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  setPosition: (id: string, position: Position) => void;
  children: ReactNode;
};

const PositionalWrapper = ({
  id,
  x,
  y,
  width,
  height,
  scale,
  setPosition,
  children,
}: PropTypes) => {
  const offsetX = useRef<number>(0);
  const offsetY = useRef<number>(0);
  const initX = useRef<number>(0);
  const initY = useRef<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragLeft, setDragLeft] = useState<number>(0);
  const [dragTop, setDragTop] = useState<number>(0);
  const dragImg = useRef<HTMLImageElement>();
  const [originalAspectRatio, setOriginalAspectRatio] = useState(true);

  useEffect(() => {
    dragImg.current = new Image();
    dragImg.current.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
  }, []);

  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setDragImage(dragImg.current!, 0, 0);
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    initX.current = rect.left;
    initY.current = rect.top;
    offsetX.current = e.clientX - rect.left;
    offsetY.current = e.clientY - rect.top;
  };

  const onDrag = (e: React.DragEvent) => {
    if (!dragging) setDragging(true);
    e.preventDefault();
    setDragLeft(e.clientX);
    setDragTop(e.clientY);
  };

  const onDragEnd = (e: React.DragEvent) => {
    const parent = e.currentTarget.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    if (!offsetX.current || !offsetY.current) return;
    const { left, top } = rect;
    const x = (dragLeft - left - offsetX.current) / scale;
    const y = (dragTop - top - offsetY.current) / scale;
    const position: Position = { height, width, x, y };
    setDragging(false);
    setPosition(id, position);
  };

  const style: React.CSSProperties = {
    position: "absolute",
    width: `${width * scale}px`,
    height: `${height * scale}px`,
    left: `${x * scale}px`,
    top: `${y * scale}px`,
    transform: dragging
      ? `translate(${dragLeft - initX.current - offsetX.current}px, ${
          dragTop - initY.current - offsetY.current
        }px)`
      : "",
  };
  return (
    <div
      className="canvas-item"
      style={style}
      draggable
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    >
      <div
        onClick={() => setOriginalAspectRatio(!originalAspectRatio)}
        className="original-ratio"
      >
        {aspectRatio()}
      </div>
      {children}
    </div>
  );
};

export default PositionalWrapper;
