import React, { useState } from "react";
import Menu, { MenuItem as MenuItemType } from "./Menu";

interface PropTypes {
  data: MenuItemType;
}

const MenuItem = ({ data }: PropTypes) => {
  const [active, setActive] = useState<boolean>(false);
  const onClick =
    typeof data.content === "function"
      ? data.content
      : (e: React.MouseEvent) => {
          e.stopPropagation();
          setActive(!active);
        };

  return (
    <div className="menu-item" onClick={onClick}>
      <p>{data.title}</p>
      {typeof data.content !== "function" && active && (
        <Menu className={"sub-menu"} menu={data.content} />
      )}
    </div>
  );
};

export default MenuItem;
