import endPoints from "../../../../../constant/endPoints";
import "../style/survey.css";
import { useCallback, useMemo, useState } from "react";
import Button from "../../../../../components/buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { useFetchData } from "../../../../../hooks/useFetchData";
import ViewSurveyWithOptions from "./ViewSurveyWithOptions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../../utils/axios";
import { useTranslation } from "react-i18next";

const ViewSurvey = ({ id, actions, viewSurvey, content_type }) => {
  const { data } = useFetchData({
    endPoints: `${endPoints.surveyPost}${id}/`,
    page_size: 1,
    is_active: actions,
  });

  const firstSurvey = useMemo(() => data?.data?.[0], [data]);

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
      query.invalidateQueries([endPoints.surveyOptionsById, firstSurvey?.post]);
    },
  });

  const { t } = useTranslation();

  if (!data?.totalCount) return;

  return (
    <main className="survey-container border-bottom">
      <ViewSurveyWithOptions
        data={firstSurvey}
        canUpdate={actions}
        selected={selected}
        setSelected={setSelected}
      />
      {selected?.length > 0 && (
        <div className="btns" style={{ marginBottom: "10px" }}>
          <Button btnStyleType="transparent" btnType="cancel" onClick={cancel}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleVote.mutate}>{t("common.vote")}</Button>
        </div>
      )}
      {data?.totalCount > 1 && (
        <div className="update-icon">
          <Link to={viewSurvey(id)} state={{ content_type }}>
            <Button btnStyleType="transparent">
              <FontAwesomeIcon icon={faListUl} /> {t("header.surveys")} (
              {data?.totalCount})
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default ViewSurvey;
