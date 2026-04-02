import { useCallback, useMemo, useState } from "react";
import endPoints from "../../../../../constant/endPoints";
import { useInfiniteFetch } from "./../../../../../hooks/useInfiniteFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faSliders } from "@fortawesome/free-solid-svg-icons";
import APIClient from "../../../../../utils/ApiClient";
import Comment from "../../../../../components/comments/Comment";
import AddComment from "./AddComment";
import Popup from "../../../../../components/popup/PopUp";
import CommentFilters from "./CommentFilters";

const api = new APIClient(endPoints.comment);

const PostComments = ({ id }) => {
  const [filters, setFilters] = useState({
    created_at: {
      text: "latest comments",
      value: "created_at",
    },
  });

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteFetch({
    endPoint: `${endPoints.comment}by-post/${id}/`,
    ordering: { created_at: filters?.created_at?.value },
    is_approved:
      typeof filters.is_approved === "boolean" ? filters?.is_approved : null,
    page_size: 5,
  });

  const results = useMemo(
    () => ({
      data: data?.pages?.flatMap((e) => e.data),
      count: data?.pages?.[0]?.totalCount,
    }),
    [data],
  );

  const [action, setAction] = useState(null);

  const handleShowAddForm = useCallback(() => {
    setAction((p) => (p === "addComment" ? null : "addComment"));
  }, []);
  const handleShowFilters = useCallback(() => {
    setAction((p) => (p === "filters" ? null : "filters"));
  }, []);

  const selectValue = useCallback((name, value) => {
    setFilters((p) => ({ ...p, [name]: value }));
  }, []);

  return (
    <section className="comments">
      <div className="title-container border-bottom">
        <h3>comments</h3>
        <p data-count={results?.count}> comment </p>
      </div>

      <div className="comment-action-buttons">
        <p
          onClick={handleShowAddForm}
          className={action === "addComment" ? "active" : ""}
        >
          <FontAwesomeIcon icon={faComment} /> add comment
        </p>
        <p onClick={handleShowFilters}>
          <FontAwesomeIcon icon={faSliders} />
          filters
        </p>
      </div>

      {action === "addComment" && (
        <AddComment id={id} api={api} handleShowAddForm={handleShowAddForm} />
      )}

      <div className="comment-container">
        {results?.data?.length ? (
          results?.data?.map((e) => <Comment data={e} key={e.id} showActions />)
        ) : (
          <div style={{ textAlign: "center" }}> no comment yet </div>
        )}

        {isLoading && (
          <div className="comment-loader">
            <span></span>
          </div>
        )}
        {!isLoading && hasNextPage && (
          <p className="more-comments" onClick={fetchNextPage}>
            more comments
          </p>
        )}
      </div>

      <Popup
        isOpen={action === "filters"}
        onClose={handleShowFilters}
        className="comment-filters"
      >
        <CommentFilters filters={filters} selectValue={selectValue} />
      </Popup>
    </section>
  );
};

export default PostComments;
