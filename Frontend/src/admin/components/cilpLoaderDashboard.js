import React from "react";
import Default from "@bit/joshk.react-spinners-css.default";
import "./clipLoaderDashboard.css";

const clipLoaderDashboard = ({ loading }) => {
  return (
    <div className="box-load-dashboard-master">
      <div className="box-load-dashboard">
        <Default color="#B23CFD" loading={loading} size={60} css />
      </div>
    </div>
  );
};

export default clipLoaderDashboard;
