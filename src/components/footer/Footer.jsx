import { Link } from "react-router";
import "./footer.css";
import Tooltip from "../tooltip/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialLinks } from "../../constant/socialLinks";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="home-footer container">
      <main>
        <h2 className="title">NRLS</h2>
        <p>
         {t("footer.description")}
        </p>
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
          <Link to="/about">{t("footer.about")}</Link>
          <Link to="/contact">{t("footer.contact")}</Link>
          <Link to="/login">{t("footer.login")}</Link>
        </div>
      </main>
      <main>
        <h2 className="title">{t("footer.categories")}</h2>
        <div className="links">
          <Link to="/">{t("footer.home")}</Link>
          <Link to="/about">{t("footer.about")}</Link>
          <Link to="/contact">{t("footer.contact")}</Link>
          <Link to="/login">{t("footer.login")}</Link>
          <Link to="/">{t("footer.home")}</Link>
        </div>
      </main>

      <article className="copyright">{t("footer.copyright")}</article>
    </footer>
  );
};

export default Footer;
