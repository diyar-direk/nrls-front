import { Link, useParams } from "react-router";
import APIClient from "../../../../../utils/ApiClient";
import { useQuery } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import Skeleton from "../../../../../components/skeleton/Skeleton";
import HandleError from "./../../../../../components/error/HandleError";
import Breadcrumbs from "./../../../../../components/breadcrumbs/Breadcrumbs";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import "quill/dist/quill.snow.css";
import MoreFromAuthor from "../components/MoreFromAuthor";
import Button from "../../../../../components/buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../constant/icons";
import PostViewMainSections from "../components/PostViewMainSections";
import SideBarMainInfo from "../components/SideBarMainInfo";
import SharePost from "../components/SharePost";
import Events from "../components/Events";

const api = new APIClient(endPoints.posts);

const ViewPost = () => {
  const { id } = useParams();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [endPoints.posts, id],
    queryFn: () => api.getOne(id),
  });

  const { i18n } = useTranslation();
  const language = useMemo(() => i18n.language, [i18n.language]);

  if (isLoading) return <Skeleton height="400px" />;

  if (error) return <HandleError error={error} refetch={refetch} />;

  return (
    <>
      <Breadcrumbs replace={[{ from: id, text: data?.title }]} />
      {data?.original_post && (
        <p className="original-post-action one-line-ellipsis">
          original_post
          <Link
            to={dashboardRouts.post.view(data?.original_post?.id)}
            className="link-hover"
          >
            {data?.original_post?.title}
          </Link>
        </p>
      )}
      <section className="post-view-container">
        <PostViewMainSections
          authorView={dashboardRouts.author.view}
          data={data}
          language={language}
          actions
          allPostsView={dashboardRouts.post.page}
          viewSurvey={dashboardRouts.post.viewSurvey}
        />

        <aside className="post-sidebar">
          <SideBarMainInfo
            authorView={dashboardRouts.author.view}
            data={data}
            language={language}
            view={dashboardRouts.post.view(data?.original_post?.id)}
            showPublishStatus
          />

          <div className="actions">
            <Link to={dashboardRouts.post.update(id)} className="flex-1">
              <Button btnStyleType="transparent" className="w-100">
                <FontAwesomeIcon icon={icons.update} /> update
              </Button>
            </Link>

            <SharePost id={id} name={data?.content_type} />
          </div>

          <p className="section-title">evenets </p>

          <Events post={id} />

          <div className="actions">
            <Link
              to={dashboardRouts.events.add}
              state={{ post: data }}
              className="flex-1"
            >
              <Button btnStyleType="transparent" className="w-100">
                <FontAwesomeIcon icon={icons.add} /> add event
              </Button>
            </Link>
          </div>

          {data?.author && (
            <MoreFromAuthor
              author={data?.author}
              id={id}
              authorView={dashboardRouts.author.view}
              view={dashboardRouts.post.view}
            />
          )}
        </aside>
      </section>
    </>
  );
};

export default ViewPost;
