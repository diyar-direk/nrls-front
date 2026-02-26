import IconButton from "../buttons/IconButton";
import PopUp from "../popup/PopUp";
import Button from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../constants/icons";
import { useTranslation } from "react-i18next";
const AddPopup = ({ children, onSubmit, isOpen, onClose, onOpen }) => {
  const { t } = useTranslation();

  return (
    <>
      <IconButton color="secondry-color" title={t("add")} onClick={onOpen}>
        <FontAwesomeIcon icon={icons.add} />
      </IconButton>

      <PopUp isOpen={isOpen} onClose={onClose} className="add-popup">
        <form onSubmit={onSubmit}>
          {children}
          <div className="add-popup-actions">
            <Button type="submit"> {t("save")} </Button>
            <Button btnType="cancel" onClick={onClose} type="button">
              {t("cancel")}
            </Button>
          </div>
        </form>
      </PopUp>
    </>
  );
};

export default AddPopup;
