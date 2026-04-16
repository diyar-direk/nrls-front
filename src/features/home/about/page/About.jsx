import Breadcrumbs from "./../../../../components/breadcrumbs/Breadcrumbs";
import Img from "../../../../assets/aboutjpg.jpg";
import "../style/style.css";
import { socialLinks } from "./../../../../constant/socialLinks";
import AboutInfo from "../components/AboutInfo";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <Breadcrumbs />
      <section className="container main-section about-page">
        <h1> {t("pages.about")} </h1>
        <main>
          <AboutInfo />
          <div className="img">
            <img src={Img} alt="" />
          </div>
        </main>
      </section>
      <section className="about-contact container">
        <h2> {t("about.contact_email")} </h2>
        <a href={socialLinks.email.to}> {socialLinks.email.text} </a>
      </section>
    </>
  );
};

export default About;
