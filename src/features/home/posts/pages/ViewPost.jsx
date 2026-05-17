import { Link, useLocation, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import "quill/dist/quill.snow.css";
import APIClient from "../../../../utils/ApiClient";
import endPoints from "../../../../constant/endPoints";
import Skeleton from "../../../../components/skeleton/Skeleton";
import HandleError from "./../../../../components/error/HandleError";
import MoreFromAuthor from "./../../../dashboard/pages/posts/components/MoreFromAuthor";
import Breadcrumbs from "../../../../components/breadcrumbs/Breadcrumbs";
import { homeRoutes } from "../../../../constant/pageRoutes";
import PostViewMainSections from "../../../dashboard/pages/posts/components/PostViewMainSections";
import SideBarMainInfo from "../../../dashboard/pages/posts/components/SideBarMainInfo";
import SharePost from "../../../dashboard/pages/posts/components/SharePost";
import "../style/style.css";
import MoreResults from "../components/MoreResults";
import Events from "../../../dashboard/pages/posts/components/Events";

const api = new APIClient(endPoints.posts);

const ViewPost = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { content_type: type } = state || {};

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [endPoints.posts, id],
    queryFn: () => api.getOne(id),
  });

  const { i18n } = useTranslation();
  const language = useMemo(() => i18n.language, [i18n.language]);
  const { t } = useTranslation();

  const content_type = useMemo(
    () => type || data?.content_type,
    [type, data?.content_type],
  );

  if (isLoading) return <Skeleton height="400px" />;

  if (error) return <HandleError error={error} refetch={refetch} />;

  return (
    <>
      <Breadcrumbs
        replace={[
          {
            from: content_type?.name_en,
            text: content_type?.[`name_${language}`],
            fullTextReplace: true,
            props: {
              state: { content_type },
            },
          },
          { from: id, text: data?.title, fullTextReplace: true },
        ]}
      />
      <div className="main-section container">
        {data?.original_post && (
          <p className="original-post-action one-line-ellipsis">
            {t("common.original_post")}
            <Link
              className="link-hover"
              to={homeRoutes.posts.view(
                content_type?.name_en,
                data?.original_post?.id,
              )}
            >
              {data?.original_post?.title}
            </Link>
          </p>
        )}
        <section className="post-view-container">
          <PostViewMainSections
            authorView={homeRoutes.author.view}
            data={data}
            language={language}
            allPostsView={(e) => homeRoutes.posts.page(e?.[`name_${language}`])}
            viewSurvey={(id) =>
              homeRoutes.posts.viewSurvey(data?.content_type?.name_en, id)
            }
          />

          <aside className="post-sidebar">
            <SideBarMainInfo
              authorView={homeRoutes.author.view}
              data={data}
              language={language}
              view={homeRoutes.posts.view(
                content_type?.name_en,
                data?.original_post?.id,
              )}
            />

            <div className="actions">
              <SharePost id={id} name={data?.content_type?.name_en} />
            </div>

            <Events post={data} />

            {data?.author && (
              <MoreFromAuthor
                author={data?.author}
                id={id}
                authorView={homeRoutes.author.view}
                view={(id) => homeRoutes.posts.view(data?.content_type, id)}
              />
            )}
          </aside>
        </section>
        <MoreResults language={language} post={data} />
      </div>
    </>
  );
};

export default ViewPost;
