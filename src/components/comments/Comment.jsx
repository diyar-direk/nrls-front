import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dateFormatter from "../../utils/dateFormatter";
import ReadMoreText from "../read_more/ReadMoreText";
import { useClickOutside } from "./../../hooks/useClickOutside";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import endPoints from "../../constant/endPoints";
import CommentActions from "./CommentActions";
import ConfrimPopup from "../popup/ConfirmPopUp";

const Comment = ({ data, showActions }) => {
  const { isOpen, ref, toggleOpen } = useClickOutside();

  const [deletePopup, setDeletePopup] = useState(false);
  const query = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`${endPoints.comment}${data.id}/hard-delete/`);
    },
    onSuccess: () => {
      query.invalidateQueries(endPoints.comment);
      setDeletePopup(null);
    },
  });

  return (
    <>
      <div className="comment">
        {showActions && (
          <div className="actions" ref={ref}>
            <FontAwesomeIcon
              icon={faEllipsis}
              className="menu"
              onClick={toggleOpen}
            />
            {isOpen && (
              <CommentActions data={data} setDeletePopup={setDeletePopup} />
            )}
          </div>
        )}

        <div className="date-container">
          <h4> {data.name} </h4>
          {!data.is_approved && showActions && <span>not approved</span>}
          <p>{dateFormatter(data.created_at, "fullDate")}</p>
        </div>

        <a href={`mailto:${data.email}`}>{data.email} </a>
        <ReadMoreText word={data.comment} letters={220} />
      </div>

      {showActions && (
        <ConfrimPopup
          isOpen={deletePopup}
          onClose={() => setDeletePopup(false)}
          onConfirm={mutation.mutate}
        />
      )}
    </>
  );
};

export default Comment;
