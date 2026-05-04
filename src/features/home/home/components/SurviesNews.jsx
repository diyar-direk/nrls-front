import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faClock,
  faEye,
  faTags,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
import { useFetchData } from "../../../../hooks/useFetchData";
import endPoints from "../../../../constant/endPoints";
import Skeleton from "../../../../components/skeleton/Skeleton";
import { postViewImg } from "../../../../utils/postViewImg";
import dateFormatter from "../../../../utils/dateFormatter";
import { homeRoutes } from "../../../../constant/pageRoutes";
import { useCallback } from "react";
import MainTitle from "../../../../components/main_title/MainTitle";
import { useTranslation } from "react-i18next";

const SurviesNews = ({ language, content_type }) => {
  const { data, isLoading } = useFetchData({
    endPoints: endPoints.posts,
    page_size: 4,
    ordering: { published_at: "-published_at" },
    language,
    content_type: content_type?.id,
    is_published: true,
  });
  const stopPropagation = useCallback((e) => e.stopPropagation(), []);

  const nav = useNavigate();

  const { t } = useTranslation();

  const handleClick = useCallback(
    (name, id, state) => nav(homeRoutes.posts.view(name, id), { state }),
    [nav],
  );

  if (isLoading)
    return (
      <section className="flex gap-20 container main-section">
        <Skeleton height="100px" />
        <Skeleton height="100px" />
      </section>
    );

  if (!data?.totalCount) return;

  return (
    <section className="container main-section">
      <MainTitle content_type={content_type} lang={language} />

      <main className="topics-container grid-2">
        {data?.data?.map((e) => (
          <div
            className="topic"
            key={e.id}
            onClick={() =>
              handleClick(e.content_type?.name_en, e.id, {
                content_type: e.content_type,
              })
            }
          >
            <div className="img">
              <img src={postViewImg(e)} alt="" />
            </div>
            <article>
              <h3 className="two-line-ellipsis">{e.title}</h3>
              <p className="one-line-ellipsis">{e.excerpt}</p>

              <div className="icons">
                {e?.category && (
                  <Link
                    to={homeRoutes.posts.page(e?.category?.name_en)}
                    onClick={stopPropagation}
                    state={{ category: e.category }}
                    className="icon link-hover"
                  >
                    <FontAwesomeIcon icon={faTags} />
                    {e?.category?.[`name_${language}`] || e?.category_name}
                  </Link>
                )}

                <span className="icon">
                  <FontAwesomeIcon icon={faEye} />
                  {e.view_count}
                </span>

                {e.author && (
                  <Link
                    className="link-hover icon"
                    to={homeRoutes.author.view(e.author?.id)}
                    onClick={stopPropagation}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    {e.author?.full_name}
                  </Link>
                )}
                <span className="icon">
                  <FontAwesomeIcon icon={faClock} />
                  {dateFormatter(e.published_at, "fullDate")}
                </span>
              </div>

              <span className="read-more">
                {t("common.read_more")} <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </article>
          </div>
        ))}
      </main>
    </section>
  );
};

export default SurviesNews;
