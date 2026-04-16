import { faClock } from "@fortawesome/free-solid-svg-icons";
import { getPercent } from "../../../../../utils/getPercent";
import { isFutureTime } from "../../../../../utils/isFutureTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dateFormatter from "../../../../../utils/dateFormatter";
import { useFetchData } from "../../../../../hooks/useFetchData";
import endPoints from "../../../../../constant/endPoints";
import { useCallback, useMemo } from "react";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import IconButton from "../../../../../components/buttons/IconButton";
import { icons } from "../../../../../constant/icons";
import "../style/survey.css";
import { useTranslation } from "react-i18next";

const ViewSurveyWithOptions = ({ data, canUpdate, selected, setSelected }) => {
  const { data: optionsRes } = useFetchData({
    endPoints: `${endPoints.surveyOptionsById}${data?.id}/`,
    ordering: { vote_count: "-vote_count" },
    enabled: Boolean(data?.id),
  });

  const options = useMemo(() => optionsRes?.data, [optionsRes]);

  const voteCount = useMemo(
    () => options?.reduce((acc, el) => acc + (el?.vote_count || 0), 0) || 1,
    [options],
  );

  const handleSelectVote = useCallback(
    (e) => {
      if (!isFutureTime(data?.closes_at)) {
        return enqueueSnackbar(
          "The voting period has ended. You can no longer participate.",
          { variant: "info" },
        );
      }

      setSelected((prev) => {
        const existing = prev.find((s) => s.survey === e.survey);

        if (existing) {
          if (existing.id === e.id) {
            return prev.filter((el) => el.id !== existing.id);
          }

          return prev.map((el) => (el.survey === e.survey ? e : el));
        }

        return [...prev, e];
      });
    },
    [data, setSelected],
  );

  const { t } = useTranslation();

  if (!data) return;

  return (
    <>
      {canUpdate && (
        <div className="update-icon">
          <Link
            to={dashboardRouts.post.updateSurvey(data?.post, data?.id)}
            state={{ data, options }}>
            <IconButton
              icon={icons.update}
              color="update"
              styleType="transparent"
              title="update"
            />
          </Link>
        </div>
      )}

      <h2 className="question"> {data?.question} </h2>
      <section className="options">
        {options?.map((e) => {
          const percent = `${parseInt(getPercent(e.vote_count, voteCount))}%`;
          return (
            <div
              className={`option ${selected.some((s) => s.id === e.id) ? "active" : ""}`}
              key={e.id}
              onClick={() => handleSelectVote(e)}>
              <div className="flex align-center gap-10 flex-1 wrap">
                {isFutureTime(data?.closes_at) && <p></p>}
                {e.option_text}
              </div>
              <span>
                {e.vote_count} {t("common.vote")}
              </span>
              <span> {percent} </span>
              <p className="percent" style={{ width: percent }}></p>
            </div>
          );
        })}

        <div className="closes-at">
          <h3 className="colon-after">
            <FontAwesomeIcon icon={faClock} /> {t("common.closes_at")}
          </h3>
          <p
            style={{
              color: isFutureTime(data?.closes_at) ? "green" : "red",
            }}>
            {dateFormatter(data?.closes_at)}
          </p>
        </div>
      </section>
    </>
  );
};

export default ViewSurveyWithOptions;
