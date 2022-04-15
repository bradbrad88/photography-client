import { useState } from "react";
import Header from "./system/Header";
import Main from "./system/Main";
import Toolbar from "./system/Toolbar";

const View = () => {
  const [active, setActive] = useState(true);

  return (
    <div className="view">
      <Header setToolbar={() => setActive(!active)} />
      <div className="page">
        <Toolbar active={active} />
        <Main />
      </div>
    </div>
  );
};

export default View;
