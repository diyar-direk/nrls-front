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
    (id, name, state) => nav(homeRoutes.posts.view(name, id), { state }),
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
          onClick={() =>
            handleNavigate(e.id, e?.content_type?.name_en, {
              content_type: e.content_type,
            })
          }
        >
          <img src={postViewImg(e)} alt="" />
          <article>
            <div className="btns">
              {e.content_type && (
                <Link
                  className="type"
                  to={homeRoutes.posts.page(e?.content_type?.name_en)}
                  onClick={stopPropagation}
                  state={{ content_type: e.content_type }}
                >
                  {e?.content_type?.[`name_${language}`]}
                </Link>
              )}
              {e.category && (
                <Link
                  to={homeRoutes.posts.page(e?.category?.name_en)}
                  onClick={stopPropagation}
                  state={{ category: e.category }}
                >
                  {e?.category?.[`name_${language}`] || e?.category_name}
                </Link>
              )}
            </div>
            <h2 className="one-line-ellipsis">{e.title}</h2>

            <div className="icons">
              <span>
                <FontAwesomeIcon icon={faClock} />
                {dateFormatter(e.published_at, "fullDate")}
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
