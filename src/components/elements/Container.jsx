import { Outlet } from "react-router-dom";
const Container = ({ children, classNames = [] }) => {
  const classes = () => {
    let arr;
    typeof classNames === "string" ? (arr = [classNames]) : (arr = [...classNames]);
    arr.unshift("container");
    return arr.join(" ");
  };

  return (
    <div className={classes()}>
      {children}
      <Outlet />
    </div>
  );
};

export default Container;
