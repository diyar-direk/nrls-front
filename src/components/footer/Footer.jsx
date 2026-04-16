import { Link } from "react-router";
import "./footer.css";
import Tooltip from "../tooltip/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialLinks } from "../../constant/socialLinks";
import { homeRoutes } from "../../constant/pageRoutes";
import { useAuth } from "../../context/AuthContext";
import { mediaTyps, publicationTyps, topicTyps } from "../../constant/enums";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { user } = useAuth();

  const { t } = useTranslation();

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
          {user ? (
            <Link to={homeRoutes.dashboard}>{t("pages.dashboard")}</Link>
          ) : (
            <Link to={homeRoutes.login}>{t("footer.login")}</Link>
          )}
        </div>
      </main>

      <main>
        <h2 className="title">{t("footer.categories")}</h2>
        <div className="links">
          <Link to={"/event"}>{t("content_types.event")}</Link>
          <Link to={"/survey"}>{t("content_types.survey")}</Link>
          <Link to={"/topics"} state={{ content_type_multi: topicTyps }}>
            {t("content_types.topics")}
          </Link>
          <Link to={"/media"} state={{ content_type_multi: mediaTyps }}>
            {t("content_types.media")}
          </Link>
          <Link
            to={"/publication"}
            state={{ content_type_multi: publicationTyps }}>
            {t("content_types.publication")}
          </Link>
        </div>
      </main>

      <article className="copyright">{t("footer.copyright")}</article>
    </footer>
  );
};

export default Footer;
