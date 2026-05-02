import "../style/home.css";
import TopicsNews from "../components/TopicsNews";
import SurviesNews from "../components/SurviesNews";
import EventNews from "../components/EventNews";
import MediaNews from "../components/MediaNews";
import Publications from "../components/Publications";
import LastNews from "../components/LastNews";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useOutletContext } from "react-router";

const Home = () => {
  const { i18n } = useTranslation();
  const language = useMemo(() => i18n.language, [i18n.language]);

  const { types } = useOutletContext();

  const componentsOrder = [
    TopicsNews,
    MediaNews,
    EventNews,
    SurviesNews,
    Publications,
  ];

  return (
    <div className="sub-news-container">
      <LastNews language={language} />

      {types?.map((e, i) => {
        const Component = componentsOrder[i % componentsOrder.length];

        return <Component key={e.id} content_type={e} language={language} />;
      })}
    </div>
  );
};

export default Home;
