import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import PositionalWrapper from "components/wrappers/PositionalWrapper";
import "./stylesheets/Canvas.scss";

const SCALE_WIDTH = 12000;
const BUFFER_HEIGHT = 6000;

interface Display {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CanvasItem {
  id: string;
  type: string;
  content: any;
  display: Display;
}

interface PropTypes {
  canvasItems: CanvasItem[];
  maxWidth: number;
  setPosition: (id: string, position: any) => void;
}

const Canvas = ({ canvasItems, maxWidth, setPosition }: PropTypes) => {
  const [width, setWidth] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const ref = useRef<HTMLDivElement>(null);
  const getComponent = useCallback((item: CanvasItem) => {
    switch (item.type) {
      case "image":
        return <div className="image">Image</div>;
      case "text":
        return <div className="text">Text</div>;
      default:
        return null;
    }
  }, []);

  const height = useMemo(() => {
    const maxElement = canvasItems.reduce((p, c) => {
      return Math.max(c.display.height + c.display.y);
    }, 0);
    const height = (maxElement + BUFFER_HEIGHT) * scale;
    return height;
  }, [canvasItems, scale]);

  const items = useMemo(() => {
    return canvasItems.map(item => (
      <PositionalWrapper
        key={item.id}
        id={item.id}
        {...item.display}
        scale={scale}
        setPosition={setPosition}
      >
        {getComponent(item)}
      </PositionalWrapper>
    ));
  }, [canvasItems, getComponent, scale, setPosition]);

  useEffect(() => {
    setWidth(0.7 * maxWidth);
  }, [maxWidth]);

  useEffect(() => {
    setScale(width / SCALE_WIDTH);
  }, [width]);

  return (
    <div ref={ref} style={{ width: `${width}px`, height: `${height}px` }} className="canvas">
      {items}
    </div>
  );
};

export default Canvas;
