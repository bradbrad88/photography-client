import React, { ReactNode, useRef } from "react";

type PropTypes = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  setPosition: (id: string, position: any) => void;
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
  const offsetX = useRef<number>();

  const onDragStart = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    offsetX.current = e.clientX - rect.left;
  };

  const onDragEnd = (e: React.DragEvent) => {
    const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (!parentRect || !offsetX.current) return;
    const canvasX = (e.clientX - offsetX.current - parentRect.left) / scale;
    setPosition(id, canvasX);
  };

  const style: React.CSSProperties = {
    position: "absolute",
    width: `${width * scale}px`,
    height: `${height * scale}px`,
    left: `${x * scale}px`,
    top: `${y * scale}px`,
  };
  return (
    <div
      className="position"
      style={style}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}
    </div>
  );
};

export default PositionalWrapper;
