import { useMemo } from "react";

interface Props {
  text: string;
  onClick: (...arg: any) => void;
  className?: string;
  icon?: (size?: number) => JSX.Element;
  iconSize?: number;
  img?: string;
}

const Button = ({ onClick, className, text, icon, iconSize, img }: Props) => {
  const classes = useMemo(() => {
    const displayIcon = img || icon ? true : false;
    return `${className} ${displayIcon && "button-image"}`;
  }, [icon, img, className]);
  return (
    <button onClick={onClick} className={classes}>
      <>
        {(img || icon) && (
          <div className="button-image">
            <>
              {img && <img src={img} alt={text + " button icon"} />}
              {icon && icon(iconSize)}
            </>
          </div>
        )}
        <span className="text">{text}</span>
      </>
    </button>
  );
};

export default Button;
