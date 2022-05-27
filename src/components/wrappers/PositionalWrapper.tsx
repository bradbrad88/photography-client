import React, { ReactNode, useState, useRef, useEffect } from "react";
import classnames from "classnames";
import Menu, { Menu as MenuType } from "components/system/Menu";
import {
  aspectRatio as aspectRatioIcon,
  aspectRatioLock,
  resizeHandle,
} from "assets/svgButtons";
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
  aspectRatio: number;
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
  aspectRatio,
  scale,
  setPosition,
  children,
}: PropTypes) => {
  const initialMouseX = useRef<number>(0);
  const initialMouseY = useRef<number>(0);
  const [resizeHeight, setResizeHeight] = useState<number | null>(null);
  const [resizeWidth, setResizeWidth] = useState<number | null>(null);
  const offsetX = useRef<number>(0);
  const offsetY = useRef<number>(0);
  const initX = useRef<number>(0);
  const initY = useRef<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragLeft, setDragLeft] = useState<number>(0);
  const [dragTop, setDragTop] = useState<number>(0);
  const dragImg = useRef<HTMLImageElement>();
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [menu, setMenu] = useState(false);

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

  const onDragStartResize = (e: React.DragEvent) => {
    e.stopPropagation();
    e.dataTransfer.setDragImage(dragImg.current!, 0, 0);
    initialMouseX.current = e.clientX;
    initialMouseY.current = e.clientY;
  };

  const onDragResize = (e: React.DragEvent) => {
    e.stopPropagation();
    const newWidth = (width * scale + e.clientX - initialMouseX.current) / scale;
    const newHeight = lockAspectRatio
      ? newWidth * (height / width)
      : (height * scale + e.clientY - initialMouseY.current) / scale;

    setResizeHeight(newHeight);
    setResizeWidth(newWidth);
  };

  const onDragEndResize = (e: React.DragEvent) => {
    e.stopPropagation();
    const position: Position = { height: resizeHeight!, width: resizeWidth!, x, y };
    setPosition(id, position);
    setResizeHeight(null);
    setResizeWidth(null);
  };

  const style: React.CSSProperties = {
    position: "absolute",
    width: resizeWidth ? `${resizeWidth * scale}px` : `${width * scale}px`,
    height: resizeHeight ? `${resizeHeight * scale}px` : `${height * scale}px`,
    left: `${x * scale}px`,
    top: `${y * scale}px`,
    transform: dragging
      ? `translate(${dragLeft - initX.current - offsetX.current}px, ${
          dragTop - initY.current - offsetY.current
        }px)`
      : "",
  };

  const aspectRatioClass = classnames("aspect-options", {
    active: lockAspectRatio,
  });

  const setAspectRatio = (ratio: number) => {
    const position: Position = {
      width,
      x,
      y,
      height: width / ratio,
    };
    setPosition(id, position);
    setLockAspectRatio(true);
    setMenu(false);
  };

  const menuObj: MenuType = [
    {
      title: lockAspectRatio ? "Unlock Aspect Ratio" : "Lock Aspect Ratio",
      content: () => setLockAspectRatio(!lockAspectRatio),
    },
    {
      title: "Set Aspect Ratio",
      content: [
        {
          title: "Original",
          content: () => setAspectRatio(aspectRatio),
        },
        {
          title: "16 : 9",
          content: () => setAspectRatio(16 / 9),
        },
        {
          title: "4 : 3",
          content: () => setAspectRatio(4 / 3),
        },
        {
          title: "Square",
          content: () => setAspectRatio(1),
        },
      ],
    },
  ];

  return (
    <div
      className="position"
      style={style}
      draggable
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    >
      <div className="relative-container" draggable={false}>
        <div className="canvas-image-controls hover">
          <div onClick={() => setMenu(!menu)} className={aspectRatioClass}>
            <div className="relative-container">
              {aspectRatioIcon(38)}
              {lockAspectRatio && aspectRatioLock(17)}
            </div>
            {menu && <Menu menu={menuObj} />}
          </div>
          <div className="lock-ratio"></div>
          <div className="set-ratio"></div>
          <div
            onDragStart={onDragStartResize}
            onDrag={onDragResize}
            onDragEnd={onDragEndResize}
            className="resize"
            draggable
          >
            {resizeHandle(20)}
          </div>
        </div>
        <div className="canvas-item">{children}</div>
      </div>
    </div>
  );
};

export default PositionalWrapper;
