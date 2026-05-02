import { useLocation, useParams } from "react-router";
import { useMemo } from "react";
import { useInfiniteFetch } from "../../../../hooks/useInfiniteFetch";
import endPoints from "../../../../constant/endPoints";
import Breadcrumbs from "../../../../components/breadcrumbs/Breadcrumbs";
import EventComponent from "../../../dashboard/pages/posts/components/EventComponent";
import Skeleton from "../../../../components/skeleton/Skeleton";
import { useTranslation } from "react-i18next";

const ViewEvents = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { content_type } = state || {};
  const { i18n } = useTranslation();
  const language = useMemo(() => i18n.language, [i18n.language]);

  const { data, isFetching, loadMoreRef } = useInfiniteFetch({
    endPoint: endPoints.events,
    page_size: 1,
    post: id,
  });

  const results = useMemo(() => data?.pages?.flatMap((e) => e.data), [data]);

  if (!results?.length) return;

  return (
    <>
      <Breadcrumbs
        replace={[
          {
            from: content_type?.name_en,
            text: content_type?.[`name_${language}`],
            fullTextReplace: true,
            props: { state: { content_type } },
          },
          {
            from: id,
            text: results?.[0]?.post_title,
            fullTextReplace: true,
            props: { state: { content_type } },
          },
        ]}
      />
      <section className="main-section container">
        <aside className="post-sidebar events-container">
          {results?.map((e) => (
            <EventComponent data={e} key={e.id} />
          ))}
          {isFetching && <Skeleton height="100px" />}
          <div ref={loadMoreRef} />
        </aside>
      </section>
    </>
  );
};

export default ViewEvents;
