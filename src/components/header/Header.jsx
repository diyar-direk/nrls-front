import "./style.css";
import { NavLink } from "react-router";
import { homeRoutes } from "../../constant/pageRoutes";
import Search from "./Search";
<<<<<<< HEAD
import { useAuth } from "../../context/AuthContext";
import { mediaTyps, publicationTyps, topicTyps } from "../../constant/enums";
import NestedMenu from "./NestedMenu";
import TopHeader from "./TopHeader";
import IconButton from "./../buttons/IconButton";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useClickOutside } from "../../hooks/useClickOutside";
=======
import AuthHelper from "../../utils/authHelper";
import { useTranslation } from "react-i18next";
>>>>>>> e37cc5a (tran.. v1)

const Header = () => {
  const { user } = useAuth();

<<<<<<< HEAD
  const { isOpen, ref, toggleOpen } = useClickOutside();

  return (
    <>
      <TopHeader />

      <div className="bottom-header container" ref={ref}>
        <IconButton icon={faBars} className="menu" onClick={toggleOpen} />
=======
  const { changeMode } = useDarkMode();
const { t } = useTranslation();
  return (
    <>
      <div className="top-header container">
        <div>
          <div className="date">
            {currentDate}
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          <div className="language">
            <Tooltip text={t("header.language")} placement="bottom">
              <span className="current-language">
                AR <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </Tooltip>
          </div>

          <Tooltip text={t("header.mode")} placement="bottom" onClick={changeMode}>
            <FontAwesomeIcon icon={faMoon} className="mode" />
          </Tooltip>
        </div>
        <Link className="logo" to={"/"}>
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="bottom-header container">
        <nav>
          <NavLink to={"/"}>home</NavLink>
>>>>>>> e37cc5a (tran.. v1)

        <nav className={isOpen ? "open" : ""}>
          <NavLink to={"/"} className="link">
            home
          </NavLink>

          <NestedMenu name={"topics"} values={topicTyps} />
          <NestedMenu name={"media"} values={mediaTyps} />
          <NestedMenu name={"publication"} values={publicationTyps} />

          <NavLink to={"/event"} className="link">
            event
          </NavLink>

          <NavLink to={"/survey"} className="link">
            survey
          </NavLink>

          <NavLink to={homeRoutes.about} className="link">
            about
          </NavLink>

          <NavLink to={homeRoutes.contact} className="link">
            contact us
          </NavLink>

<<<<<<< HEAD
          {user ? (
            <NavLink to={homeRoutes.dashboard} className="link">
              dashboard
            </NavLink>
          ) : (
            <NavLink to={homeRoutes.login} className="link">
              login
            </NavLink>
=======
          <NavLink to={homeRoutes.about}>{t("header.about")}</NavLink>
          <NavLink to={homeRoutes.contact}>{t("header.contact")}</NavLink>

          {isAuthenticated ? (
            <NavLink to={homeRoutes.dashboard}>{t("header.dashboard")}</NavLink>
          ) : (
            <NavLink to={homeRoutes.login}>{t("header.login")}</NavLink>
>>>>>>> e37cc5a (tran.. v1)
          )}
        </nav>

        <Search />
      </div>
    </>
  );
};

export default Header;
