import { Link } from "react-router";
import dateFormatter from "../../../../../utils/dateFormatter";
import imgServerSrc from "../../../../../utils/imgServerSrc";
import { useTranslation } from "react-i18next";

const PostViewMainInfo = ({ data, authorView, language }) => {
  const { t } = useTranslation();

  return (
    <div className="post-info">
      {data?.author && (
        <Link className="author  link-hover" to={authorView(data?.author?.id)}>
          <article className="author-profile">
            {data?.author?.profile_image ? (
              <img alt="" src={imgServerSrc(data?.author?.profile_image)} />
            ) : (
              data?.author?.full_name?.[0]
            )}
          </article>
          {data?.author?.full_name}
        </Link>
      )}

      {data?.content_type && (
        <div>
          <p>{t("common.content_type")}</p>
          <span>{data?.content_type?.[`name_${language}`]}</span>
        </div>
      )}

      {data?.category && (
        <div>
          <p>{t("common.category")}</p>
          <span>{data?.category?.[`name_${language}`]}</span>
        </div>
      )}

      <div>
        <p>{t("common.views")}</p>
        <span>{data?.view_count}</span>
      </div>
      <div>
        <p>{t("common.published_at")}</p>
        <span>{dateFormatter(data?.published_at, "fullDate")}</span>
      </div>
    </div>
  );
};

export default PostViewMainInfo;
