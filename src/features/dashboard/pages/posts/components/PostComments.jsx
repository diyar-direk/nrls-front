import { useMemo } from "react";
import endPoints from "../../../../../constant/endPoints";
import { useInfiniteFetch } from "./../../../../../hooks/useInfiniteFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import APIClient from "../../../../../utils/ApiClient";
import Comment from "../../../../../components/comments/Comment";
import AddComment from "./AddComment";

const api = new APIClient(endPoints.comment);

const PostComments = ({ id }) => {
  const { data, isLoading } = useInfiniteFetch({
    endPoint: `${endPoints.comment}by-post/${id}/`,
  });

  const results = useMemo(
    () => ({
      data: data?.pages?.flatMap((e) => e.data),
      count: data?.pages?.[0]?.totalCount,
    }),
    [data],
  );

  return (
    <section className="comments">
      <div className="title-container border-bottom">
        <h3>
          <FontAwesomeIcon icon={faComment} /> comments
        </h3>
        <p data-count={results?.count}> comment </p>
      </div>

      <AddComment id={id} api={api} />

      <div className="comment-container">
        {results?.data?.map((e) => (
          <Comment data={e} key={e.id} />
        ))}
        {isLoading && (
          <div className="comment-loader">
            <span></span>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostComments;
