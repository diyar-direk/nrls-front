import { useMutation, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import axiosInstance from "../../../../../utils/axios";
import "../style/survey.css";
import { useCallback, useMemo, useState } from "react";
import Button from "../../../../../components/buttons/Button";
import dateFormatter from "../../../../../utils/dateFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faListUl } from "@fortawesome/free-solid-svg-icons";
import { isFutureTime } from "./../../../../../utils/isFutureTime";
import { Link } from "react-router";
import IconButton from "../../../../../components/buttons/IconButton";
import { icons } from "../../../../../constant/icons";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import { useFetchData } from "../../../../../hooks/useFetchData";
import { enqueueSnackbar } from "notistack";

const ViewSurvey = ({ id }) => {
  const [selected, setSelected] = useState(null);

  const { data } = useFetchData({
    endPoints: `${endPoints.surveyPost}${id}/`,
    page_size: 1,
  });

  const firstSurvey = useMemo(() => data?.data?.[0], [data]);

  const cancel = useCallback(() => setSelected(null), []);
  const query = useQueryClient();

  const { data: optionsRes } = useFetchData({
    endPoints: `${endPoints.surveyOptionsById}${firstSurvey?.id}/`,
    ordering: { vote_count: "-vote_count" },
    enabled: Boolean(data?.totalCount === 1),
  });

  const options = useMemo(() => optionsRes?.data, [optionsRes]);

  const handleVote = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`${endPoints.vote}${selected}/`);
    },
    onSuccess: () => {
      cancel();
      query.invalidateQueries([endPoints.surveyOptionsById, id]);
    },
  });

  const voteCount = useMemo(
    () => options?.reduce((acc, el) => acc + (el?.vote_count || 0), 0) || 1,
    [options],
  );

  const handleSelectVote = useCallback(
    (id) => {
      if (!isFutureTime(firstSurvey?.closes_at)) {
        return enqueueSnackbar(
          "The voting period has ended. You can no longer participate.",
          { variant: "info" },
        );
      }

      setSelected((p) => (p === id ? null : id));
    },
    [firstSurvey],
  );

  if (!data?.totalCount) return;

  return (
    <main className="survey-container border-bottom">
      <div className="update-icon">
        {data?.totalCount === 1 ? (
          <Link
            to={dashboardRouts.post.updateSurvey(id, firstSurvey?.id)}
            state={{ data: firstSurvey, options }}
          >
            <IconButton
              icon={icons.update}
              color="update"
              styleType="transparent"
              title="update"
            />
          </Link>
        ) : (
          <Link>
            <Button btnStyleType="transparent">
              <FontAwesomeIcon icon={faListUl} /> view surveies (
              {data?.totalCount})
            </Button>
          </Link>
        )}
      </div>

      <h2 className="question"> {firstSurvey?.question} </h2>
      <section className="options">
        {options?.map((e) => {
          const percent = `${(e.vote_count / voteCount) * 100}%`;
          return (
            <div
              className={`option ${e.id === selected ? "active" : ""}`}
              key={e.id}
              onClick={() => handleSelectVote(e.id)}
            >
              <div className="flex align-center gap-10 flex-1 wrap">
                {isFutureTime(firstSurvey?.closes_at) && <p></p>}
                {e.option_text}
              </div>
              <span> {e.vote_count} vote </span>
              <p className="percent" style={{ width: percent }}></p>
              <p className="percent-value"> {percent} </p>
            </div>
          );
        })}

        {data?.totalCount === 1 && (
          <div className="closes-at">
            <h3 className="colon-after">
              <FontAwesomeIcon icon={faClock} /> closes_at
            </h3>
            <p
              style={{
                color: isFutureTime(firstSurvey?.closes_at) ? "green" : "red",
              }}
            >
              {dateFormatter(firstSurvey?.closes_at)}
            </p>
          </div>
        )}

        {selected && (
          <div className="btns">
            <Button
              btnStyleType="transparent"
              btnType="cancel"
              onClick={cancel}
            >
              cancel
            </Button>
            <Button onClick={handleVote.mutate}> vote </Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default ViewSurvey;
