import { memo } from "react";
import Button from "../buttons/Button";
import {
  faArrowRotateRight,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { extarctErrorMessage } from "../../utils/extarctErrorMessage";

const TabelError = ({ error, onRefetch }) => {
  return (
    <div className="table-error">
      <div className="table-error-content">
        <FontAwesomeIcon icon={faCircleExclamation} className="icon" />
        <span>{extarctErrorMessage(error)}</span>
      </div>

      <Button onClick={onRefetch}>
        <FontAwesomeIcon icon={faArrowRotateRight} />
        refetch data
      </Button>
    </div>
  );
};

export default memo(TabelError);
