import { useState } from "react";
import { menu, home, gallery, blog, profile } from "assets/svgButtons";
import "stylesheets/System.scss";
import NavItem from "./NavItem";

const Toolbar = () => {
  const [active, setActive] = useState(true);
  return (
    <div className={`toolbar-placement ${active && "active"}`}>
      <div className={`toolbar ${active && "active"}`}>
        <span className="menu icon" onClick={() => setActive(!active)}>
          {menu(40)}
        </span>
        <div></div>
        <div></div>
        <NavItem title={"Home"} icon={home} path={"/"} />
        <NavItem title={"Gallery"} icon={gallery} path={"/gallery"} />
        <NavItem title={"Blogs"} icon={blog} path={"/blog"} />
        <NavItem title={"Profile"} icon={profile} path={"/profile"} />
        {/* <>
          <p>Gallery</p>
          <span className="icon">{gallery(40)}</span>
        </> */}
      </div>
    </div>
  );
};

export default Toolbar;
