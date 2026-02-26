import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import Button from "../buttons/Button";
import { Link } from "react-router";
import { icons } from "../../constants/icons";

const TableNoResults = ({ ...props }) => {
  return (
    <div className="table-actions table-no-data">
      <div className="no-data-content">
        <FontAwesomeIcon icon={faInbox} />
        <span>no results</span>
        <Link {...props}>
          <Button btnStyleType="transparent">
            <FontAwesomeIcon icon={icons.add} /> add data
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default memo(TableNoResults);
