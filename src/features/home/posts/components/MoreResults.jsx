import { useTranslation } from "react-i18next";
import RepeatChildren from "../../../../components/RepeatChildren";
import Skeleton from "../../../../components/skeleton/Skeleton";
import endPoints from "../../../../constant/endPoints";
import { homeRoutes } from "../../../../constant/pageRoutes";
import { useFetchData } from "../../../../hooks/useFetchData";
import PostCard from "./../../../../components/post/PostCard";

const MoreResults = ({ language, post }) => {
  const { data, isLoading } = useFetchData({
    endPoints: endPoints.posts,
    language,
    is_published: true,
    page_size: 5,
    id_ne: post?.id,
    content_type_or: post?.content_type,
    category_or: post?.category?.id,
  });

  const { t } = useTranslation();

  if (isLoading)
    return (
      <div className="posts-container">
        <RepeatChildren count={4}>
          <Skeleton height="100px" />
        </RepeatChildren>
      </div>
    );

  if (!data?.totalCount) return;
  return (
    <>
      <h1 className="more-results-title">{t("common.more_results")}</h1>
      <div className="posts-container">
        {data?.data?.map((e) => (
          <PostCard
            key={e.id}
            data={e}
            authorPage={homeRoutes.author.view}
            postPage={(e) => homeRoutes.posts.view(e?.content_type, e.id)}
          />
        ))}
      </div>
    </>
  );
};

export default MoreResults;
