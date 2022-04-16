import Main from "./system/Main";
import Toolbar from "./system/Toolbar";

const View = () => {
  return (
    <div className="view">
      <div className="page">
        <Toolbar />
        <Main />
      </div>
    </div>
  );
};

export default View;
