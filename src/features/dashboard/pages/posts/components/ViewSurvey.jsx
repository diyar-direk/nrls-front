import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import axiosInstance from "../../../../../utils/axios";
import "../style/survey.css";
import { useCallback, useState } from "react";
import Button from "../../../../../components/buttons/Button";

const ViewSurvey = ({ id }) => {
  const [selected, setSelected] = useState(null);

  const { data } = useQuery({
    queryKey: [endPoints.surveyPost, id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`${endPoints.surveyPost}${id}/`);
      return data.data?.[0];
    },
  });

  const cancel = useCallback(() => setSelected(null), []);
  const query = useQueryClient();

  const { data: options } = useQuery({
    queryKey: [endPoints.surveyOptionsById, id],
    queryFn: async () => {
      const { data: res } = await axiosInstance.get(
        `${endPoints.surveyOptionsById}${data.id}/`,
        { params: { ordering: "-vote_count" } },
      );

      return res.data || [];
    },
    enabled: Boolean(data?.id),
  });

  const handleVote = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`${endPoints.vote}${selected}/`);
    },
    onSuccess: () => {
      cancel();
      query.invalidateQueries([endPoints.surveyOptionsById, id]);
    },
  });

  if (!data || options?.length === 0) return;

  return (
    <main className="survey-container border-bottom">
      <h2 className="question"> {data?.question} </h2>
      <section className="options">
        {options?.map((e) => (
          <div
            className={`option ${e.id === selected ? "active" : ""}`}
            key={e.id}
            onClick={() => setSelected((p) => (p === e.id ? null : e.id))}
          >
            <div className="flex align-center gap-10 flex-1 wrap">
              <p></p>
              {e.option_text}
            </div>
            <span> {e.vote_count} vote </span>
          </div>
        ))}
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
