import { Link } from "react-router";
import IconButton from "../buttons/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { icons } from "../../constant/icons";

const Add = ({ path, ...props }) => {
  const { t } = useTranslation();

  return (
    <Link to={path} {...props}>
      <IconButton color="secondry-color" title={t("common.add")}>
        <FontAwesomeIcon icon={icons.add} />
      </IconButton>
    </Link>
  );
};

export default Add;
