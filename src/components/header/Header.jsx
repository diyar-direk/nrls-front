import "./style.css";
import { NavLink } from "react-router";
import { homeRoutes } from "../../constant/pageRoutes";
import Search from "./Search";
import { useAuth } from "../../context/AuthContext";
import NestedMenu from "./NestedMenu";
import TopHeader from "./TopHeader";
import IconButton from "./../buttons/IconButton";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

const Header = ({ types }) => {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const language = i18n?.language;
  const { isOpen, ref, toggleOpen, setIsOpen } = useClickOutside();

  const handleClick = useCallback(() => {
    if (!isOpen) return;
    setIsOpen(false);
  }, [isOpen, setIsOpen]);

  return (
    <>
      <TopHeader />

      <div className="bottom-header container" ref={ref}>
        <IconButton icon={faBars} className="menu" onClick={toggleOpen} />

        <nav className={isOpen ? "open" : ""}>
          <NavLink to={"/"} className="link" onClick={handleClick}>
            {t("header.home")}
          </NavLink>

          {types?.map((e) =>
            e.categories_count ? (
              <NestedMenu
                nestedClick={handleClick}
                data={e}
                lang={language}
                key={e.id}
              />
            ) : (
              <NavLink
                to={e.name_en}
                className="link"
                onClick={handleClick}
                key={e.id}
                state={{ content_type: e }}
              >
                {e[`name_${language}`]}
              </NavLink>
            ),
          )}

          <NavLink to={homeRoutes.about} className="link" onClick={handleClick}>
            {t("header.about")}
          </NavLink>

          <NavLink
            to={homeRoutes.contact}
            className="link"
            onClick={handleClick}
          >
            {t("header.contact")}
          </NavLink>

          {user && (
            <NavLink to={homeRoutes.dashboard} className="link">
              {t("header.dashboard")}
            </NavLink>
          )}
        </nav>

        <Search />
      </div>
    </>
  );
};

export default Header;
