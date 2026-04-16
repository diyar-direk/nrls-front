import { faArrowRight, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dateFormatter from "../../utils/dateFormatter";

const CardFooter = ({ data, isDraft, t }) => {
  return (
    <div className="card-footer">
      <p className="time">
        <FontAwesomeIcon icon={faClock} />
        {dateFormatter(data?.created_at || new Date(), "fullDate")}
      </p>
      {!isDraft && (
        <span>
          {t("common.read_more")} <FontAwesomeIcon icon={faArrowRight} />
        </span>
      )}
    </div>
  );
};

export default CardFooter;
