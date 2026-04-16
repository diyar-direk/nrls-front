import { Link } from "react-router";
import { faClock, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainTitle from "../../../../components/main_title/MainTitle";
import { useFetchData } from "../../../../hooks/useFetchData";
import endPoints from "../../../../constant/endPoints";
import { homeRoutes } from "../../../../constant/pageRoutes";
import Skeleton from "../../../../components/skeleton/Skeleton";
import PostCard from "../../../../components/post/PostCard";
import { postViewImg } from "../../../../utils/postViewImg";
import dateFormatter from "../../../../utils/dateFormatter";
import { useTranslation } from "react-i18next";

const EventNews = ({ language }) => {
  const { data, isLoading } = useFetchData({
    endPoints: endPoints.posts,
    page_size: 6,
    ordering: { created_at: "-created_at" },
    language,
    content_type: "event",
    is_published: true,
  });

  const { t } = useTranslation();

  if (isLoading)
    return (
      <section className="flex gap-20 container main-section documentaries">
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
      </section>
    );

  if (!data?.totalCount) return;

  return (
    <section className="container main-section documentaries">
      <MainTitle state={{ content_type: "event" }} name={"event"}>
        {t("pages.event")}
      </MainTitle>

      <main className="grid-3">
        {data?.data?.slice(0, 3).map((e) => (
          <PostCard
            authorPage={homeRoutes.author.view}
            data={e}
            key={e.id}
            postPage={(e) => homeRoutes.posts.view(e?.content_type, e.id)}
            className={"card-style-1"}
          />
        ))}
      </main>

      <main className="grid-3 documentary-container">
        {data?.data?.slice(3).map((e) => (
          <Link
            className="documentary"
            key={e.id}
            to={homeRoutes.posts.view(e.content_type, e.id)}>
            <div className="img">
              <img src={postViewImg(e)} alt="" />
            </div>
            <article>
              <h3 className="one-line-ellipsis">{e.title}</h3>
              <p className="one-line-ellipsis">{e.excerpt}</p>

              <div className="icons">
                <span className="icon">
                  <FontAwesomeIcon icon={faClock} />
                  {dateFormatter(e.created_at, "fullDate")}
                </span>
                <span className="icon">
                  <FontAwesomeIcon icon={faEye} />
                  {e.view_count}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </main>
    </section>
  );
};

export default EventNews;
