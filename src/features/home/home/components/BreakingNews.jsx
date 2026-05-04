import { Link } from "react-router";
import { homeRoutes } from "../../../../constant/pageRoutes";
import { useTranslation } from "react-i18next";

const BreakingNews = ({ data }) => {
  const { t } = useTranslation();

  if (data?.length === 0) return;

  return (
    <div className="breacking-news">
      <h3>{t("pages.breaking_news")}</h3>
      <div className="ticker">
        <article className="ticker-content">
          {data?.map((e) => (
            <Link
              key={e.id}
              to={homeRoutes.posts.view(e.content_type?.name_en, e.id)}
              state={{ content_type: e.content_type }}
            >
              {e.title?.length < 100 ? e.title : `${e.title.slice(0, 100)} ...`}
            </Link>
          ))}
        </article>
      </div>
    </div>
  );
};

export default BreakingNews;
