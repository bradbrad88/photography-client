import { ReactNode } from "react";

type PropTypes = {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  children: ReactNode;
};

const PositionalWrapper = ({ children, x, y, width, height, scale }: PropTypes) => {
  const style: React.CSSProperties = {
    position: "absolute",
    width: `${width * scale}px`,
    height: `${height * scale}px`,
    left: `${x * scale}px`,
    top: `${y * scale}px`,
  };
  return (
    <div className="position" style={style}>
      {children}
    </div>
  );
};

export default PositionalWrapper;
