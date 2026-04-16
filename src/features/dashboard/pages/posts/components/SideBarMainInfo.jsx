import { Link } from "react-router";
import { colors } from "../../../../../constant/colors";
import dateFormatter from "../../../../../utils/dateFormatter";
import { useTranslation } from "react-i18next";
import { languages } from "../../../../../constant/languages";

const SideBarMainInfo = ({
  data,
  view,
  authorView,
  language,
  showPublishStatus,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <p className="section-title">{t("common.post_info")}</p>

      <div className="main-info">
        {data?.original_post && (
          <div>
            <p>{t("common.original_post")}</p>
            <Link className="link-hover" to={view}>
              {data?.original_post?.title}
            </Link>
          </div>
        )}

        {showPublishStatus && (
          <div>
            <p>{t("common.is_published")}</p>
            <span
              className="enum"
              style={{
                "--main-color":
                  colors[data?.is_published ? "green" : "red"].color,
              }}>
              {data?.is_published ? t("common.yes") : t("common.no")}
            </span>
          </div>
        )}

        <div>
          <p>{t("common.content_type")}</p>
          <span
            className="enum"
            style={{
              "--main-color": `var(--color-${data?.content_type})`,
            }}>
            {t(`content_types.${data?.content_type}`)}
          </span>
        </div>

        <div>
          <p>{t("common.category")}</p>
          <span> {data?.category?.[`name_${language}`]} </span>
        </div>

        <div>
          <p>{t("common.language")}</p>
          <span>
            {languages?.find((l) => l.value === data?.language)?.title}
          </span>
        </div>

        {data?.author && (
          <div>
            <p>{t("pages.author")}</p>
            <Link className="link-hover" to={authorView(data?.author?.id)}>
              {data?.author?.full_name}
            </Link>
          </div>
        )}

        {showPublishStatus && data?.published_at && (
          <div>
            <p>{t("common.published_at")}</p>
            <span> {dateFormatter(data?.published_at)} </span>
          </div>
        )}

        <div>
          <p>{t("common.created_at")}</p>
          <span> {dateFormatter(data?.created_at, "fullDate")} </span>
        </div>

        <div>
          <p>{t("common.updated_at")}</p>
          <span> {dateFormatter(data?.updated_at, "fullDate")} </span>
        </div>

        <div>
          <p>{t("common.view_count")}</p>
          <span> {data?.view_count} </span>
        </div>
      </div>
    </>
  );
};

export default SideBarMainInfo;
