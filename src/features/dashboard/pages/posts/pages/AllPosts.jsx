import { useInfiniteFetch } from "./../../../../../hooks/useInfiniteFetch";
import endPoints from "./../../../../../constant/endPoints";
import { useCallback, useMemo, useState } from "react";
import Breadcrumbs from "./../../../../../components/breadcrumbs/Breadcrumbs";
import PostCard from "../../../../../components/post/PostCard";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import RepeatChildren from "../../../../../components/RepeatChildren";
import Skeleton from "../../../../../components/skeleton/Skeleton";
import "../style/style.css";
import { formatInputsData } from "./../../../../../utils/formatInputsData";
import "../../../../home/posts/style/style.css";
import PostTyps from "../components/PostTyps";
import AllPostsHeader from "../components/AllPostsHeader";
import DeletePost from "../components/DeletePost";
import PostFilters from "../components/PostFilters";

const AllPosts = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ created_at: "-created_at" });

  const { data, isLoading, loadMoreRef } = useInfiniteFetch({
    endPoint: endPoints.posts,
    page_size: 5,
    ...formatInputsData(filters),
    ordering: sort,
  });

  const results = useMemo(
    () => ({
      count: data?.pages?.[0]?.totalCount,
      posts: data?.pages?.flatMap((page) => page.data) || [],
    }),
    [data],
  );

  const [openFilters, setOpenFilters] = useState(false);

  const toggleFilters = useCallback(() => setOpenFilters((p) => !p), []);

  const [deletedId, setDeletedId] = useState(null);

  return (
    <>
      <Breadcrumbs />

      <PostTyps filters={filters} setFilters={setFilters} />

      <div className="post-filters">
        <h1 data-count={results?.count || 0}>results</h1>
        <AllPostsHeader
          setSort={setSort}
          toggleFilters={toggleFilters}
          sort={sort}
        />
      </div>

      <div className="posts-container">
        {results?.posts?.map((e) => (
          <PostCard
            key={e.id}
            data={e}
            authorPage={dashboardRouts.author.view}
            postPage={dashboardRouts.post.view}
            showStatus
            showActions
            setDeletedId={(id) => setDeletedId(id)}
          />
        ))}
        {isLoading && (
          <RepeatChildren count={4}>
            <Skeleton height="100%" style={{ minHeight: "100px" }} />
          </RepeatChildren>
        )}
      </div>
      <div ref={loadMoreRef} />

      <DeletePost deletedId={deletedId} setDeletedId={setDeletedId} />

      {openFilters && (
        <PostFilters
          onClose={toggleFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </>
  );
};

export default AllPosts;
