import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import Button from "../buttons/Button";
import { Link } from "react-router";
import { icons } from "../../constant/icons";
import { useTranslation } from "react-i18next";
const TableNoResults = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <div className="table-actions table-no-data">
      <div className="no-data-content">
        <FontAwesomeIcon icon={faInbox} />
        <span>{t("table.no_results")}</span>
        <Link {...props}>
          <Button btnStyleType="transparent">
            <FontAwesomeIcon icon={icons.add} /> {t("common.add")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default memo(TableNoResults);
