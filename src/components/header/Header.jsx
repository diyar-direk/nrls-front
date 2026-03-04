import "./style.css";
import Logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChevronDown,
  faMagnifyingGlass,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import Tooltip from "../tooltip/Tooltip";
import useDarkMode from "./../../hooks/useDarkMode";

const Header = () => {
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
          <NavLink>home</NavLink>
          <NavLink to={"/dsa"}>about</NavLink>
          <NavLink to={"/dsa"}>
            <div>
              media <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <article>
              <p>test</p>
              <p>test</p>
              <p>test</p>
            </article>
          </NavLink>
          <NavLink to={"/dsa"}>about</NavLink>
        </nav>

        <div className="search">
          <label htmlFor="home-search">
            <input type="text" placeholder="search...." id="home-search" />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </label>
        </div>
      </div>
    </>
  );
};

export default Header;
