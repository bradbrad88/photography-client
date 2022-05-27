import MenuItem from "./MenuItem";
import classnames from "classnames";
import "./stylesheets/Menu.scss";

export type Menu = MenuItem[];

export interface MenuItem {
  title: string;
  content: Menu | (() => void);
}

interface PropTypes {
  menu: Menu;
  className?: string;
}

const Menu = ({ menu, className }: PropTypes) => {
  const menuItems = () => {
    return menu.map((menuItem, idx) => <MenuItem data={menuItem} key={idx} />);
  };
  const classes = classnames("menu", className);
  return <div className={classes}>{menuItems()}</div>;
};

export default Menu;
