import { useFetchData } from "./../../../../../hooks/useFetchData";
import endPoints from "../../../../../constant/endPoints";
import Skeleton from "../../../../../components/skeleton/Skeleton";
import { useMemo } from "react";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import { Link } from "react-router";
import imgServerSrc from "../../../../../utils/imgServerSrc";
import Button from "../../../../../components/buttons/Button";

const MoreFromAuthor = ({ author, id }) => {
  const { data, isLoading } = useFetchData({
    endPoints: endPoints.posts,
    author: author?.id,
    page_size: 3,
    id_ne: id,
  });

  const results = useMemo(
    () => ({ data: data?.data, count: data?.totalCount }),
    [data],
  );

  if (isLoading) return <Skeleton height="50px" />;

  if (!results?.count) return;

  return (
    <>
      <p className="section-title">
        more from
        <Link
          className="author-name link-hover"
          to={dashboardRouts.author.view(author?.id)}
        >
          {author?.full_name}
        </Link>
      </p>

      {results?.data?.map((e) => (
        <Link
          className="more-posts"
          key={e.id}
          to={dashboardRouts.post.view(e.id)}
        >
          <img
            src={imgServerSrc(
              e?.featured_image || e?.original_post?.featured_image,
            )}
            alt=""
          />
          <div>
            <h5 className="two-line-ellipsis">{e?.title}</h5>
            <p className="one-line-ellipsis"> {e?.excerpt} </p>
          </div>
        </Link>
      ))}

      {results?.count > 3 && (
        <Link to={dashboardRouts.author.view(author?.id)}>
          <Button btnStyleType="transparent" className="w-100">
            view all results ({results?.count})
          </Button>
        </Link>
      )}
    </>
  );
};

export default MoreFromAuthor;
