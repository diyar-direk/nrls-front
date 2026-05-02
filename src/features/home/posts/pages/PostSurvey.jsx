import { useLocation, useParams } from "react-router";
import { useInfiniteFetch } from "../../../../hooks/useInfiniteFetch";
import endPoints from "../../../../constant/endPoints";
import { useCallback, useMemo, useState } from "react";
import Breadcrumbs from "../../../../components/breadcrumbs/Breadcrumbs";
import ViewSurveyWithOptions from "../../../dashboard/pages/posts/components/ViewSurveyWithOptions";
import Skeleton from "../../../../components/skeleton/Skeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../utils/axios";
import Button from "../../../../components/buttons/Button";
import { useTranslation } from "react-i18next";

const PostSurvey = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { content_type } = state || {};

  const { data, isFetching, loadMoreRef } = useInfiniteFetch({
    endPoint: `${endPoints.surveyPost}${id}/`,
    page_size: 2,
  });
  const { i18n } = useTranslation();
  const language = i18n?.language;

  const results = useMemo(() => data?.pages?.flatMap((e) => e.data), [data]);

  const [selected, setSelected] = useState([]);

  const cancel = useCallback(() => setSelected([]), [setSelected]);

  const query = useQueryClient();

  const handleVote = useMutation({
    mutationFn: () => {
      selected.map(
        async (e) => await axiosInstance.post(`${endPoints.vote}${e.id}/`),
      );
    },
    onSuccess: () => {
      cancel();
      query.invalidateQueries([endPoints.surveyOptionsById, id]);
    },
  });
  const { t } = useTranslation();

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
        <main className="survey-container ">
          {results?.map((e) => (
            <section key={e.id} className="survey-section">
              <ViewSurveyWithOptions
                data={e}
                selected={selected}
                setSelected={setSelected}
              />
            </section>
          ))}
          {selected?.length > 0 && (
            <div className="btns">
              <Button
                btnStyleType="transparent"
                btnType="cancel"
                onClick={cancel}
              >
                cancel
              </Button>
              <Button onClick={handleVote.mutate}>{t("common.vote")}</Button>
            </div>
          )}
        </main>
        {isFetching && <Skeleton height="100px" />}
        <div ref={loadMoreRef} />
      </section>
    </>
  );
};

export default PostSurvey;
