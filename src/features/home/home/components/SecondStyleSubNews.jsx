import { faClock, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dateFormatter from "../../../../utils/dateFormatter";
import { Link } from "react-router";
import { homeRoutes } from "../../../../constant/pageRoutes";

const SecondStyleSubNews = ({ data }) => {
  if (data?.length === 0 || !data) return;

  return (
    <div className="sub-news">
      {data?.map((e) => (
        <Link
          key={e.id}
          to={homeRoutes.posts.view(e?.content_type?.name_en, e.id)}
          state={{ content_type: e?.content_type }}
        >
          <article>
            <h3 className="two-line-ellipsis">{e.title}</h3>
            <div className="icons">
              <span className="icon">
                <FontAwesomeIcon icon={faClock} />
                {dateFormatter(e.published_at, "fullDate")}
              </span>
              <span className="icon">
                <FontAwesomeIcon icon={faEye} />
                {e.view_count}
              </span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default SecondStyleSubNews;
