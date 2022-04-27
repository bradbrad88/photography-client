import { useMemo } from "react";
import { Grid, Ripple } from "react-spinners-css";
import { back as backIcon } from "assets/svgButtons";

interface Props {
  text?: string;
  onClick: (...arg: any) => void;
  className?: string;
  icon?: (size?: number) => JSX.Element;
  iconSize?: number;
  img?: string;
  back?: boolean;
  working?: boolean;
}

const Button = ({
  onClick,
  className,
  text = "",
  icon,
  iconSize,
  img,
  back,
  working,
}: Props) => {
  const classes = useMemo(() => {
    if (back) return "back";
    const displayIcon = img || icon ? true : false;
    return `${className} ${displayIcon && "button-image"}`;
  }, [icon, img, className, back]);
  return (
    <button onClick={onClick} className={classes}>
      <>
        {(img || icon) && !back && (
          <div className="button-image">
            <>
              {img && <img src={img} alt={text + " button icon"} />}
              {icon && icon(iconSize)}
            </>
          </div>
        )}
        {back ? (
          backIcon(25)
        ) : (
          <span className="text">{working ? <Ripple color="white" size={45} /> : text}</span>
        )}
      </>
    </button>
  );
};

export default Button;
