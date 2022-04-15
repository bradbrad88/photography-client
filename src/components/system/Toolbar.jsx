import { useState } from "react";
import { menu } from "assets/svgButtons";
import "stylesheets/System.scss";

const Toolbar = () => {
  const [active, setActive] = useState(true);
  return (
    <div className={`toolbar-placement ${active && "active"}`}>
      <div className={`toolbar ${active && "active"}`}>
        <span className="menu" onClick={() => setActive(!active)}>
          {menu(40)}
        </span>
        <h3>Toolbar</h3>
      </div>
    </div>
  );
};

export default Toolbar;
