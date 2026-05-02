import { useParams } from "react-router";
import Breadcrumbs from "../../../../../components/breadcrumbs/Breadcrumbs";
import { useInfiniteFetch } from "../../../../../hooks/useInfiniteFetch";
import endPoints from "../../../../../constant/endPoints";
import { useCallback, useMemo, useState } from "react";
import Skeleton from "../../../../../components/skeleton/Skeleton";
import ViewSurveyWithOptions from "../components/ViewSurveyWithOptions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../../utils/axios";
import Button from "../../../../../components/buttons/Button";
import { useTranslation } from "react-i18next";

const SurveiesPage = () => {
  const { id } = useParams();

  const { data, isFetching, loadMoreRef } = useInfiniteFetch({
    endPoint: `${endPoints.surveyPost}${id}/`,
    page_size: 2,
  });

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
          { from: id, text: results?.[0]?.post_title, fullTextReplace: true },
        ]}
      />
      <main className="survey-container ">
        {results?.map((e) => (
          <section key={e.id} className="survey-section">
            <ViewSurveyWithOptions
              data={e}
              canUpdate
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
              {t("common.cancel")}
            </Button>
            <Button onClick={handleVote.mutate}>{t("common.vote")}</Button>
          </div>
        )}
      </main>
      {isFetching && <Skeleton height="100px" />}
      <div ref={loadMoreRef} />
    </>
  );
};

export default SurveiesPage;
