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

const Topics = ({ language }) => {
  const { data, isLoading } = useFetchData({
    endPoints: endPoints.posts,
    page_size: 4,
    ordering: { created_at: "-created_at" },
    language,
    content_type: "dialogue_session",
  });
  const stopPropagation = useCallback((e) => e.stopPropagation(), []);

  const nav = useNavigate();

  const handleClick = useCallback(
    (id) => nav(homeRoutes.posts.view(id)),
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
      <MainTitle state={{ content_type: "dialogue_session" }}>
        موضوعات وقضايا
      </MainTitle>

      <main className="topics-container grid-2">
        {data?.data?.map((e) => (
          <div className="topic" key={e.id} onClick={() => handleClick(e.id)}>
            <div className="img">
              <img src={postViewImg(e)} alt="" />
            </div>
            <article>
              <h3 className="two-line-ellipsis">{e.title}</h3>
              <p className="one-line-ellipsis">{e.excerpt}</p>

              <div className="icons">
                <Link
                  to={homeRoutes.posts.page}
                  onClick={stopPropagation}
                  state={{ category: e.category }}
                  className="icon link-hover"
                >
                  <FontAwesomeIcon icon={faTags} />
                  {e?.category?.[`name_${language}`] || e?.category_name}
                </Link>

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
                  {dateFormatter(e.created_at, "fullDate")}
                </span>
              </div>

              <span className="read-more">
                read more <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </article>
          </div>
        ))}
      </main>
    </section>
  );
};

export default Topics;
