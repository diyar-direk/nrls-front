import {
  faArrowRight,
  faClock,
  faEye,
  faTags,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dateFormatter from "../../../../utils/dateFormatter";
import { Link, useNavigate } from "react-router";
import { postViewImg } from "../../../../utils/postViewImg";
import { homeRoutes } from "../../../../constant/pageRoutes";
import { useCallback } from "react";

const SecondStyleMainNews = ({ data, language }) => {
  const stopPropagation = useCallback((e) => e.stopPropagation(), []);

  const nav = useNavigate();

  const handleClick = useCallback(
    () => nav(homeRoutes.posts.view(data?.id)),
    [nav, data?.id],
  );

  if (!data) return;

  return (
    <div className="main-news" onClick={handleClick}>
      <div className="img">
        <img src={postViewImg(data)} alt="" />
      </div>

      <h3 className="two-line-ellipsis">{data.title}</h3>
      <p className="one-line-ellipsis">{data.excerpt}</p>

      <div className="button">
        <div className="icons">
          <Link
            to={homeRoutes.posts.page}
            onClick={stopPropagation}
            state={{ category: data.category }}
            className="icon link-hover"
          >
            <FontAwesomeIcon icon={faTags} />
            {data.category?.[`name_${language}`] || data.category_name}
          </Link>

          <span className="icon">
            <FontAwesomeIcon icon={faEye} />
            {data.view_count}
          </span>

          {data.author && (
            <Link
              className="link-hover icon"
              to={homeRoutes.author.view(data.author?.id)}
              onClick={stopPropagation}
            >
              <FontAwesomeIcon icon={faUser} />
              {data.author?.full_name}
            </Link>
          )}
          <span className="icon">
            <FontAwesomeIcon icon={faClock} />
            {dateFormatter(data.created_at, "fullDate")}
          </span>
        </div>
        <button className="read-more">
          read more <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default SecondStyleMainNews;
