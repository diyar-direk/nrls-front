import { faClock, faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dateFormatter from "../../../../utils/dateFormatter";
import { homeRoutes } from "../../../../constant/pageRoutes";
import { Link, useNavigate } from "react-router";
import { useCallback } from "react";
import { postViewImg } from "../../../../utils/postViewImg";

const SubNews = ({ data, language }) => {
  const nav = useNavigate();
  const handleNavigate = useCallback(
    (id) => nav(homeRoutes.posts.view(id)),
    [nav],
  );
  const stopPropagation = useCallback((e) => e.stopPropagation(), []);

  if (!data?.length) return;

  return (
    <div className="sub-news-container">
      {data?.map((e) => (
        <div
          className="sub-news"
          key={e.id}
          onClick={() => handleNavigate(e.id)}
        >
          <img src={postViewImg(e)} alt="" />
          <article>
            <div className="btns">
              <Link
                className="type"
                style={{
                  "--main-color": `var(--color-${e?.content_type})`,
                }}
                to={homeRoutes.posts.page}
                onClick={stopPropagation}
                state={{ content_type: e.content_type }}
              >
                {e.content_type}
              </Link>
              <Link
                to={homeRoutes.posts.page}
                onClick={stopPropagation}
                state={{ category: e.category }}
              >
                {e?.category?.[`name_${language}`] || e?.category_name}
              </Link>
            </div>
            <h2 className="one-line-ellipsis">{e.title}</h2>

            <div className="icons">
              <span>
                <FontAwesomeIcon icon={faClock} />
                {dateFormatter(e.created_at, "fullDate")}
              </span>
              <span>
                <FontAwesomeIcon icon={faEye} />
                {e.view_count}
              </span>
              {e.author && (
                <Link
                  className="link-hover"
                  to={homeRoutes.author.view(e.author?.id)}
                  onClick={stopPropagation}
                >
                  <FontAwesomeIcon icon={faUser} />
                  {e.author?.full_name}
                </Link>
              )}
            </div>
          </article>
        </div>
      ))}
    </div>
  );
};

export default SubNews;
