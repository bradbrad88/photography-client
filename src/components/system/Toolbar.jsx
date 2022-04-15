import "stylesheets/System.scss";

const Toolbar = ({ active }) => {
  return <div className={`toolbar ${active && "active"}`}>Toolbar</div>;
};

export default Toolbar;
