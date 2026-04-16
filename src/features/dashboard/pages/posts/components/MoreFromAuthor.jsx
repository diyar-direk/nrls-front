import { useFetchData } from "./../../../../../hooks/useFetchData";
import endPoints from "../../../../../constant/endPoints";
import Skeleton from "../../../../../components/skeleton/Skeleton";
import { useMemo } from "react";
import { Link } from "react-router";
import Button from "../../../../../components/buttons/Button";
import { postViewImg } from "./../../../../../utils/postViewImg";
import { useTranslation } from "react-i18next";

const MoreFromAuthor = ({ author, id, authorView, view }) => {
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

  const { t } = useTranslation();

  if (isLoading) return <Skeleton height="50px" />;

  if (!results?.count) return;

  return (
    <>
      <p className="section-title">
        {t("common.other_from")}
        <Link className="author-name link-hover" to={authorView(author?.id)}>
          {author?.full_name}
        </Link>
      </p>

      {results?.data?.map((e) => (
        <Link className="more-posts" key={e.id} to={view(e.id)}>
          <img src={postViewImg(e)} alt="" />
          <div>
            <h5 className="two-line-ellipsis">{e?.title}</h5>
            <p className="one-line-ellipsis"> {e?.excerpt} </p>
          </div>
        </Link>
      ))}

      {results?.count > 3 && (
        <Link to={authorView(author?.id)}>
          <Button btnStyleType="transparent" className="w-100">
            view all results ({results?.count})
          </Button>
        </Link>
      )}
    </>
  );
};

export default MoreFromAuthor;
