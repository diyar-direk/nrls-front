import { Outlet } from "react-router";
import "../style/dashboard.css";
import DashboardSidebar from "./DashboardSidebar";
import { useCallback, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { DashboardProvider } from "../../../context/DashboardContext";

const DasboardLayout = () => {
  const [isClosed, setIsClosed] = useState(
    localStorage.getItem("isClosed") || false,
  );

  const toggleClose = useCallback(
    () =>
      setIsClosed((p) => {
        const toggeld = !p;
        localStorage.setItem("isClosed", toggeld);
        return toggeld;
      }),
    [],
  );

  return (
    <DashboardProvider>
      <DashboardHeader isClosed={isClosed} toggleClose={toggleClose} />

      <main className={`dashboard-container ${isClosed ? "closed" : ""}`}>
        <DashboardSidebar />

        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </DashboardProvider>
  );
};

export default DasboardLayout;
