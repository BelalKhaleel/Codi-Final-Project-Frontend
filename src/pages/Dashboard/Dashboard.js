import React from "react";
import { Outlet } from "react-router-dom";
// import Sidebar from "../../components/sidebar";
import "./Dashboard.css";
function DashboardPage() {
  return (
    <div className="main-dashboard">
      <h1>this is the dashboard</h1>
      {/* <Sidebar /> */}
      <div className="dashboard-pages">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardPage;
