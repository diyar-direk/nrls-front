import endPoints from "../../../../../constant/endPoints";
import { useFetchData } from "../../../../../hooks/useFetchData";
import EventComponent from "./EventComponent";

const Events = ({ post }) => {
  const { data } = useFetchData({
    endPoints: endPoints.events,
    post,
    page_size: 1,
  });

  return (
    <>{data?.totalCount > 0 && <EventComponent data={data?.data?.[0]} />}</>
  );
};

export default Events;
