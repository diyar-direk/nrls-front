import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialLinks } from "../../../../constant/socialLinks";
import { useTranslation } from "react-i18next";

const Socials = () => {
  const { t } = useTranslation();
  return (
    <div className="socials">
      <div>
        <h2>{t("pages.contact_us")}</h2>
        <p>{t("contact.description")}</p>
      </div>

      <div className="social">
        {Object.keys(socialLinks)?.map((e) => (
          <a href={socialLinks[e].to} target="_blank" key={e}>
            <div className="icon">
              <FontAwesomeIcon icon={socialLinks[e].icon} />
            </div>
            <div className="info">
              <p> {e} </p>
              <h3> {socialLinks[e].text} </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Socials;
