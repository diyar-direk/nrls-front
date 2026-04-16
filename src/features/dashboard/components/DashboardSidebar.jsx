import { Link, NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dashboardPages } from "../../../constant/pageRoutes";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
const DashboardSidebar = ({ onPhoneClick }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const name = useMemo(() => user?.username, [user]);

  return (
    <aside className="dashboard-sidebar">
      <nav className="links">
        {dashboardPages.map((e) => (
          <NavLink
            key={e.to}
            to={e.to}
            end
            title={t(e.title)}
            onClick={onPhoneClick}>
            <FontAwesomeIcon icon={e.icon} /> <span> {t(e.title)} </span>
          </NavLink>
        ))}
        <Link to={"/"} title={t("sidebar.back_to_home")}>
          <FontAwesomeIcon icon={faHome} />
          <span> {t("sidebar.back_to_home")} </span>
        </Link>
      </nav>
      <div className="user">
        <div className="profile"> {name?.[0]} </div>
        <article>
          <h3>{name}</h3>
        </article>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
