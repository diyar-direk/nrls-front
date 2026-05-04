import { Link } from "react-router";
import endPoints from "../../../../../constant/endPoints";
import { icons } from "../../../../../constant/icons";
import { dashboardRouts, homeRoutes } from "../../../../../constant/pageRoutes";
import { useFetchData } from "../../../../../hooks/useFetchData";
import EventComponent from "./EventComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../../components/buttons/Button";
import { useTranslation } from "react-i18next";

const Events = ({ post, actions }) => {
  const { data } = useFetchData({
    endPoints: endPoints.events,
    post: post?.id,
    page_size: 1,
  });
  const { t } = useTranslation();

  return (
    <>
      {(actions || data?.totalCount > 0) && (
        <p className="section-title">{t("pages.event")}</p>
      )}
      {data?.totalCount > 0 && (
        <EventComponent data={data?.data?.[0]} actions={actions} />
      )}
      <div className="actions">
        {actions && (
          <Link
            to={dashboardRouts.events.add}
            state={{ post }}
            className="flex-1"
          >
            <Button btnStyleType="transparent" className="w-100">
              <FontAwesomeIcon icon={icons.add} /> {t("common.add")}{" "}
              {t("pages.event")}
            </Button>
          </Link>
        )}
        {data?.totalCount > 1 && (
          <Link
            to={
              actions
                ? dashboardRouts.post.events(post?.id)
                : homeRoutes.posts.events(post?.content_type?.name_en, post?.id)
            }
            state={{ content_type: post?.content_type }}
            className="flex-1"
          >
            <Button btnStyleType="transparent" className="w-100">
              {t("events.view_all")} ({data?.totalCount})
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Events;
