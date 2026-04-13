import "./style.css";
import Logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChevronDown,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import Tooltip from "../tooltip/Tooltip";
import useDarkMode from "./../../hooks/useDarkMode";
import { homeRoutes } from "../../constant/pageRoutes";
import Search from "./Search";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  const currentDate = useMemo(
    () =>
      new Date().toLocaleDateString("ar-SY", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        numberingSystem: "latn",
      }),
    [],
  );

  const { changeMode } = useDarkMode();

  return (
    <>
      <div className="top-header container">
        <div>
          <div className="date">
            {currentDate}
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          <div className="language">
            <Tooltip text={"language"} placement="bottom">
              <span className="current-language">
                AR <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </Tooltip>
          </div>

          <Tooltip text={"mode"} placement="bottom" onClick={changeMode}>
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

          <NavLink to={"/test"}>
            <div>
              موضوعات وقضايا <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <article>
              <p>دراسات </p>
              <p>تحليلات</p>
              <p>مقال رأي </p>
              <p>ملفات</p>
            </article>
          </NavLink>

          <NavLink to={"/dsa"}>
            <div>
              وسائط <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <article>
              <p>test</p>
            </article>
          </NavLink>

          <NavLink to={"/dsa"}>
            <div>
              فعاليات و نشاطات <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <article>
              <p>test</p>
            </article>
          </NavLink>

          <NavLink to={"/dsa"}>
            <div>
              استبيانات <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <article>
              <p>test</p>
            </article>
          </NavLink>

          <NavLink to={"/dsa"}>
            <div>
              اصدارات
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <article>
              <p>test</p>
            </article>
          </NavLink>

          <NavLink to={homeRoutes.about}>about</NavLink>
          <NavLink to={homeRoutes.contact}>contact us</NavLink>

          {user ? (
            <NavLink to={homeRoutes.dashboard}>dashboard</NavLink>
          ) : (
            <NavLink to={homeRoutes.login}>login</NavLink>
          )}
        </nav>

        <Search />
      </div>
    </>
  );
};

export default Header;
