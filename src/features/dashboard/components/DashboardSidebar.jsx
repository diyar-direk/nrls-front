import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dashboardPages } from "../../../constant/pageRoutes";

const name = "diyar direki";

const DashboardSidebar = () => {
  return (
    <aside className="dashboard-sidebar">
      <nav className="links">
        {dashboardPages.map((e) => (
          <NavLink key={e.to} to={e.to} end>
            <FontAwesomeIcon icon={e.icon} /> <span> {e.title} </span>
          </NavLink>
        ))}
      </nav>
      <div className="user">
        <div className="profile"> {name[0]} </div>
        <article>
          <h3>{name}</h3>
          <p>admin</p>
        </article>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
