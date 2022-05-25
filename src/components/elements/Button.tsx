import { useMemo } from "react";
import { Ripple } from "react-spinners-css";
import { back as backIcon } from "assets/svgButtons";
import classnames from "classnames";

interface Props {
  text?: string;
  onClick: (...arg: any) => void;
  className?: string;
  icon?: (size?: number) => JSX.Element;
  iconSize?: number;
  img?: string;
  back?: boolean;
  working?: boolean;
  style?: React.CSSProperties;
}

const Button = ({
  onClick,
  className,
  text = "",
  icon,
  iconSize = 24,
  img,
  back,
  working,
  style,
}: Props) => {
  const classes = classnames(
    {
      //  "button-image": img || icon,
      "icon-only": (img || icon) && !text,
      "text-only": text && !(img || icon),
      back,
    },
    className
  );

  const styleProperties: React.CSSProperties = {
    // width: img || icon ? "3rem" : "14rem",
    ...style,
  };

  return (
    <button onClick={onClick} className={classes} style={styleProperties}>
      {working ? (
        <Ripple color="white" size={45} />
      ) : (
        <>
          {(img || icon) && (
            <div className="button icon">
              {img && <img src={img} alt={text + " button icon"} />}
              {icon && icon(iconSize)}
            </div>
          )}
          {text && <span className="text">{text}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
