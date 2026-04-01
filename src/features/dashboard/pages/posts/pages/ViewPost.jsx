import { Link, useParams } from "react-router";
import APIClient from "../../../../../utils/ApiClient";
import { useQuery } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import Skeleton from "../../../../../components/skeleton/Skeleton";
import HandleError from "./../../../../../components/error/HandleError";
import Breadcrumbs from "./../../../../../components/breadcrumbs/Breadcrumbs";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo } from "react";
import imgServerSrc from "../../../../../utils/imgServerSrc";
import { dashboardRouts, homeRoutes } from "../../../../../constant/pageRoutes";
import dateFormatter from "../../../../../utils/dateFormatter";
import "../style/style.css";
import "quill/dist/quill.snow.css";
import { colors } from "./../../../../../constant/colors";
import MoreFromAuthor from "../components/MoreFromAuthor";
import Button from "../../../../../components/buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../constant/icons";
import PostComments from "../components/PostComments";

const api = new APIClient(endPoints.posts);

const ViewPost = () => {
  const { id } = useParams();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [endPoints.posts, id],
    queryFn: () => api.getOne(id),
  });

  const { i18n } = useTranslation();
  const language = useMemo(() => i18n.language, [i18n.language]);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}${homeRoutes.posts.view(id)}`;

    if (navigator.share) {
      await navigator.share({
        title: document.title,
        url,
      });
    }
  }, [id]);

  if (isLoading) return <Skeleton height="400px" />;

  if (error) return <HandleError error={error} refetch={refetch} />;

  return (
    <>
      <Breadcrumbs replace={[{ from: id, text: data?.title }]} />
      <section className="post-view-container">
        <main className="post-main-info">
          <h1 className="post-title border-bottom">{data?.title}</h1>

          {data?.excerpt && (
            <div className="border-bottom">
              <p className="excerpt"> {data?.excerpt} </p>
            </div>
          )}

          <div className="post-info">
            <Link
              className="author  link-hover"
              to={dashboardRouts.author.view(data?.author?.id)}
            >
              <article className="author-profile">
                {data?.author?.full_name?.[0]}
              </article>
              {data?.author?.full_name}
            </Link>
            <div>
              <p> content_type </p>
              <span>{data?.content_type}</span>
            </div>
            <div>
              <p> category </p>
              <span>{data?.category?.[`name_${language}`]}</span>
            </div>
            <div>
              <p> views </p>
              <span>{data?.view_count}</span>
            </div>
            <div>
              <p> created_at </p>
              <span>{dateFormatter(data?.created_at, "fullDate")}</span>
            </div>
          </div>

          <div className="cover-image">
            <img
              src={imgServerSrc(
                data?.featured_image || data?.original_post?.featured_image,
              )}
              alt=""
            />
          </div>

          <div
            className="ql-editor border-bottom"
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>

          <div className="tags border-bottom">
            <p>tags</p>
            {data?.tags?.map((e) => (
              <button key={e.id}> {e[`name_${language}`]} </button>
            ))}
          </div>

          <PostComments id={id} />
        </main>
        <aside className="post-sidebar">
          <p className="section-title">post info</p>

          <div className="main-info">
            {data?.original_post && (
              <div>
                <p>original_post</p>
                <Link
                  className="link-hover"
                  to={dashboardRouts.post.view(data?.original_post?.id)}
                >
                  {data?.original_post?.title}
                </Link>
              </div>
            )}

            <div>
              <p>is_published</p>
              <span
                className="enum"
                style={{
                  "--main-color":
                    colors[data?.is_published ? "green" : "red"].color,
                }}
              >
                {data?.is_published ? "yes" : "no"}
              </span>
            </div>

            <div>
              <p>content_type</p>
              <span
                className="enum"
                style={{
                  "--main-color": `var(--color-${data?.content_type})`,
                }}
              >
                {data?.content_type}
              </span>
            </div>

            <div>
              <p>category</p>
              <span> {data?.category?.[`name_${language}`]} </span>
            </div>

            <div>
              <p>author</p>
              <Link
                className="link-hover"
                to={dashboardRouts.author.view(data?.author?.id)}
              >
                {data?.author?.full_name}
              </Link>
            </div>
            {data?.published_at && (
              <div>
                <p>published_at</p>
                <span> {dateFormatter(data?.published_at)} </span>
              </div>
            )}
            <div>
              <p>created_at</p>
              <span> {dateFormatter(data?.created_at, "fullDate")} </span>
            </div>
            <div>
              <p>updated_at</p>
              <span> {dateFormatter(data?.updated_at, "fullDate")} </span>
            </div>

            <div>
              <p>view_count</p>
              <span> {data?.view_count} </span>
            </div>
          </div>

          <div className="actions">
            <Link to={dashboardRouts.post.update(id)} className="flex-1">
              <Button btnStyleType="transparent" className="w-100">
                <FontAwesomeIcon icon={icons.update} /> update
              </Button>
            </Link>
            <Button
              btnStyleType="transparent"
              className="flex-1"
              btnType="save"
              onClick={handleShare}
            >
              <FontAwesomeIcon icon={icons.share} /> share
            </Button>
          </div>

          <MoreFromAuthor author={data?.author} />
        </aside>
      </section>
    </>
  );
};

export default ViewPost;
