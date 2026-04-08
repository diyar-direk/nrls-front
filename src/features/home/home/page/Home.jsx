import "../style/home.css";
import ReportNews from "../components/ReportNews";
import Topics from "../components/Topics";
import Documentaries from "../components/Documentaries";
import Infographic from "../components/Infographic";
import Publications from "../components/Publications";
import LastNews from "../components/LastNews";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const Home = () => {
  const { i18n } = useTranslation();
  const language = useMemo(() => i18n.language, [i18n.language]);

  return (
    <div className="sub-news-container">
      <LastNews language={language} />

      <ReportNews language={language} />

      <Topics language={language} />

      <Documentaries language={language} />

      <Infographic language={language} />

      <Publications />
    </div>
  );
};

export default Home;
