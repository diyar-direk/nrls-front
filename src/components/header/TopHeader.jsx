import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../tooltip/Tooltip";
import { Link } from "react-router";
import { useMemo } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import Logo from "../../assets/logo.png";
import { useClickOutside } from "./../../hooks/useClickOutside";
import { useTranslation } from "react-i18next";
import { languages } from "./../../constant/languages";
import {
  faCalendarAlt,
  faChevronDown,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

const TopHeader = () => {
  const { isOpen, ref, toggleOpen } = useClickOutside();

  const { i18n } = useTranslation();

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
    <div className="top-header container">
      <div>
        <div className="date">
          {currentDate}
          <FontAwesomeIcon icon={faCalendarAlt} />
        </div>
        <div className="language" ref={ref}>
          <Tooltip text={"language"} placement="bottom" onClick={toggleOpen}>
            <span className="current-language">
              {languages.find((l) => l.value === i18n.language)?.value}
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </Tooltip>

          {isOpen && (
            <div className="language-div">
              {languages.map((l) => (
                <p
                  key={l.value}
                  className={i18n.language === l.value ? "active" : ""}
                  onClick={() => i18n.changeLanguage(l.value)}
                >
                  {l.title}
                </p>
              ))}
            </div>
          )}
        </div>

        <Tooltip text={"mode"} placement="bottom" onClick={changeMode}>
          <FontAwesomeIcon icon={faMoon} className="mode" />
        </Tooltip>
      </div>

      <Link className="logo" to={"/"}>
        مركز روجافا للدراسات الاستراتيجية
        <img src={Logo} alt="" />
      </Link>
    </div>
  );
};

export default TopHeader;
