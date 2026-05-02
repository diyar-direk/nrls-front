import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import dateFormatter from "../../../../utils/dateFormatter";
import { Link, useNavigate } from "react-router";
import { useCallback } from "react";
import { homeRoutes } from "../../../../constant/pageRoutes";
import { postViewImg } from "./../../../../utils/postViewImg";

const MainNews = ({ data, language }) => {
  const nav = useNavigate();
  const handleNavigate = useCallback(
    () =>
      nav(homeRoutes.posts.view(data?.content_type?.name_en, data?.id), {
        state: { content_type: data?.content_type },
      }),
    [data, nav],
  );

  const stopPropagation = useCallback((e) => e.stopPropagation(), []);

  if (!data) return;

  return (
    <div className="main-news" onClick={handleNavigate}>
      <img src={postViewImg(data)} alt="" />
      <article>
        <div className="btns">
          {data?.content_type && (
            <Link
              className="type"
              to={homeRoutes.posts.page(
                data?.content_type?.[`name_${language}`],
              )}
              onClick={stopPropagation}
              state={{ content_type: data.content_type }}
            >
              {data?.content_type?.[`name_${language}`]}
            </Link>
          )}

          {data?.category && (
            <Link
              to={homeRoutes.posts.page(data?.category?.[`name_${language}`])}
              onClick={stopPropagation}
              state={{ category: data.category }}
            >
              {data?.category?.[`name_${language}`] || data?.category_name}
            </Link>
          )}
        </div>
        <h2 className="two-line-ellipsis">{data.title}</h2>
        <p className="two-line-ellipsis">{data.excerpt}</p>
        <div className="icons">
          <span>
            <FontAwesomeIcon icon={faClock} />
            {dateFormatter(data.published_at, "fullDate")}
          </span>
          <span>
            <FontAwesomeIcon icon={faEye} />
            {data.view_count}
          </span>
          {data.author && (
            <Link
              className="link-hover"
              to={homeRoutes.author.view(data.author?.id)}
              onClick={stopPropagation}
            >
              <FontAwesomeIcon icon={faUser} />
              {data.author?.full_name}
            </Link>
          )}
        </div>
      </article>
    </div>
  );
};

export default MainNews;
