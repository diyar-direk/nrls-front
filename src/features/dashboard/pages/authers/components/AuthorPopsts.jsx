import { useMemo, useState } from "react";
import endPoints from "../../../../../constant/endPoints";
import { useInfiniteFetch } from "../../../../../hooks/useInfiniteFetch";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import DeletePost from "../../posts/components/DeletePost";
import RepeatChildren from "../../../../../components/RepeatChildren";
import PostCard from "../../../../../components/post/PostCard";
import Skeleton from "../../../../../components/skeleton/Skeleton";
import { useParams } from "react-router";

const AuthorPopsts = ({ postPage, actions = true }) => {
  const { id } = useParams();

  const { data, isLoading, loadMoreRef } = useInfiniteFetch({
    endPoint: endPoints.posts,
    page_size: 2,
    author: id,
  });

  const results = useMemo(
    () => ({
      count: data?.pages?.[0]?.totalCount,
      posts: data?.pages?.flatMap((page) => page.data) || [],
    }),
    [data],
  );

  const [deletedId, setDeletedId] = useState(null);

  return (
    <>
      <div className="author-post-results-container">
        <h1 data-count={results?.count || 0} className="author-post-results">
          posts
        </h1>
      </div>

      <div className="posts-container">
        {results?.posts?.map((e) => (
          <PostCard
            key={e.id}
            data={e}
            authorPage={dashboardRouts.author.view}
            postPage={(e) => postPage(e)}
            showStatus={actions}
            showActions={actions}
            setDeletedId={(id) => setDeletedId(id)}
          />
        ))}
        {isLoading && (
          <RepeatChildren count={2}>
            <Skeleton height="100%" style={{ minHeight: "100px" }} />
          </RepeatChildren>
        )}
      </div>
      <div ref={loadMoreRef} />

      <DeletePost deletedId={deletedId} setDeletedId={setDeletedId} />
    </>
  );
};

export default AuthorPopsts;
