import { useNavigate } from "react-router-dom";
import "stylesheets/Dashboard.scss";

const Dashboard = () => {
  const nav = useNavigate();
  return (
    <div className="dashboard">
      <div className="title">
        <h2>React Photography</h2>
      </div>
      <div className="content">
        <button onClick={() => nav("/gallery/new")} id="new-album">
          Create New Album
        </button>
        <button onClick={() => nav("/blog/new")} id="new-blog">
          Post Blog
        </button>
        <button onClick={() => nav("/profile")} id="view-profile">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
