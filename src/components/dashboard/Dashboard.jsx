import React from "react";
import "stylesheets/Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="title">
        <h2>React Photography</h2>
      </div>
      <div className="content">
        <button id="new-album">Create New Album</button>
        <button id="new-blog">Post Blog</button>
        <button id="view-profile">View Profile</button>
      </div>
    </div>
  );
};

export default Dashboard;
