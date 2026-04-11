import { Link } from "react-router";
import Button from "../../../../../components/buttons/Button";
import { icons } from "../../../../../constant/icons";
import dateFormatter from "../../../../../utils/dateFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../../utils/axios";
import endPoints from "../../../../../constant/endPoints";
import { useState } from "react";
import ConfirmPopUp from "../../../../../components/popup/ConfirmPopUp";
import IconButton from "../../../../../components/buttons/IconButton";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const EventComponent = ({ data }) => {
  const query = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = useMutation({
    mutationFn: async () =>
      await axiosInstance.delete(`${endPoints.events}${data?.id}/hard-delete/`),
    onSuccess: () => {
      query.invalidateQueries([endPoints.events]);
      setIsOpen(false);
    },
  });

  const handleCountAction = useMutation({
    mutationFn: async (url) =>
      await axiosInstance.post(`${endPoints.events}${url}/${data?.id}/`),
    onSuccess: () => query.invalidateQueries([endPoints.events]),
  });

  return (
    <>
      <div className="main-info">
        <div>
          <p>event_type</p>
          <span> {data?.event_type} </span>
        </div>
        <div>
          <p>event_date</p>
          <span> {dateFormatter(data?.event_date)} </span>
        </div>
        <div>
          <p>location</p>
          <span> {data?.location} </span>
        </div>

        <div>
          <p>attendees_count</p>
          <div className="event-actions">
            <span> {data?.attendees_count} </span>
            <IconButton
              styleType="transparent"
              color="save"
              icon={faPlus}
              onClick={() => handleCountAction.mutate("increment-attendees")}
            />
            <IconButton
              styleType="transparent"
              color="delete"
              icon={faMinus}
              onClick={() => handleCountAction.mutate("decrement-attendees")}
            />
          </div>
        </div>

        <div>
          <p>created_at</p>
          <span> {dateFormatter(data?.created_at)} </span>
        </div>

        <div className="actions" style={{ margin: "0" }}>
          <Link to={dashboardRouts.events.update(data?.id)} className="flex-1">
            <Button btnStyleType="transparent" className="w-100">
              <FontAwesomeIcon icon={icons.update} /> update
            </Button>
          </Link>

          <Button
            btnStyleType="transparent"
            btnType="delete"
            className="flex-1"
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={icons.delete} /> delete
          </Button>
        </div>
      </div>
      <ConfirmPopUp
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete.mutate}
      />
    </>
  );
};

export default EventComponent;
