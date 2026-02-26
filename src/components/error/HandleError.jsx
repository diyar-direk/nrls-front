import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { extarctErrorMessage } from "../../utils/extarctErrorMessage";
import "./error.css";
import { faRotateBackward } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../buttons/IconButton";

const HandleError = ({ error, refetch }) => {
  return (
    <div className="status-error">
      <h3>{extarctErrorMessage(error)}</h3>
      {refetch && (
        <IconButton color="cancel" styleType="transparent" title="refetch">
          <FontAwesomeIcon icon={faRotateBackward} />
        </IconButton>
      )}
    </div>
  );
};

export default HandleError;
