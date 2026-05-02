import { Link } from "react-router";
import "./footer.css";
import Tooltip from "../tooltip/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialLinks } from "../../constant/socialLinks";
import { homeRoutes } from "../../constant/pageRoutes";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Footer = ({ types }) => {
  const { user } = useAuth();

  const { t, i18n } = useTranslation();
  const language = i18n?.language;

  return (
    <footer className="home-footer container">
      <main>
        <h2 className="title">NRLS</h2>
        <p>{t("footer.description")}</p>
        <div className="social-links">
          {Object.keys(socialLinks)?.map((e) => (
            <a href={socialLinks[e].to} target="_blank" key={e}>
              <Tooltip text={e}>
                <FontAwesomeIcon icon={socialLinks[e].icon} />
              </Tooltip>
            </a>
          ))}
        </div>
      </main>
      <main>
        <h2 className="title">{t("footer.quick_links")}</h2>
        <div className="links">
          <Link to="/">{t("footer.home")}</Link>
          <Link to={homeRoutes.about}>{t("footer.about")}</Link>
          <Link to={homeRoutes.contact}>{t("footer.contact")}</Link>
          {user && (
            <Link to={homeRoutes.dashboard}>{t("pages.dashboard")}</Link>
          )}
        </div>
      </main>

      <main>
        <h2 className="title">{t("footer.categories")}</h2>
        <div className="links">
          {types?.map((e) => (
            <Link to={e.name_en} key={e.id} state={{ content_type: e }}>
              {e[`name_${language}`]}
            </Link>
          ))}
        </div>
      </main>

      <article className="copyright">{t("footer.copyright")}</article>
    </footer>
  );
};

export default Footer;
