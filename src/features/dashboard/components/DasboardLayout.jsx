import { Outlet } from "react-router";
import "../style/dashboard.css";
import DashboardSidebar from "./DashboardSidebar";
import { useCallback, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { DashboardProvider } from "../../../context/DashboardContext";
import ProtectedRoute from "./../../../components/ProtectedRoute";

const isPhone = window.innerWidth <= 600;

const DasboardLayout = () => {
  const [isClosed, setIsClosed] = useState(
    isPhone || localStorage.getItem("isClosed") || false,
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

  const onPhoneClick = useCallback(() => isPhone && setIsClosed(true), []);

  return (
    <ProtectedRoute>
      <DashboardProvider>
        <DashboardHeader isClosed={isClosed} toggleClose={toggleClose} />

        <main className={`dashboard-container ${isClosed ? "closed" : ""}`}>
          <DashboardSidebar onPhoneClick={onPhoneClick} />

          <div className="dashboard-content">
            <Outlet />
          </div>
        </main>
      </DashboardProvider>
    </ProtectedRoute>
  );
};

export default DasboardLayout;
