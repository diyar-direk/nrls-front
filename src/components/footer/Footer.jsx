import { Link } from "react-router";
import "./footer.css";
import Tooltip from "../tooltip/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialLinks } from "../../constant/socialLinks";

const Footer = () => {
  return (
    <footer className="home-footer container">
      <main>
        <h2 className="title">NRLS</h2>
        <p>
          منصتك الأولى للأخبار الموثوقة والشاملة من جميع أنحاء العالم. نقدم لكم
          آخر المستجدات على مدار الساعة.
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
        <h2 className="title">روابط سريعة</h2>
        <div className="links">
          <Link>home</Link>
          <Link>who are we</Link>
          <Link>contact us</Link>
          <Link>login</Link>
        </div>
      </main>
      <main>
        <h2>اقسام الموقع</h2>
        <div className="links">
          <Link>home</Link>
          <Link>who are we</Link>
          <Link>contact us</Link>
          <Link>login</Link>
          <Link>home</Link>
        </div>
      </main>

      <article className="copyright"> جميع الحقوق محفوظة 2026</article>
    </footer>
  );
};

export default Footer;
