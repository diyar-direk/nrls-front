import { memo } from "react";
import Button from "../buttons/Button";
import "./popups.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../constant/icons";
import { useTranslation } from "react-i18next";

/**
 * @typedef {Object} divProps
 * @property {boolean} isOpen
 * @property {string} [heading]
 * @property {string} [confirmText]
 * @property {string} [cancelText]
 * @property {string} [undoneText]
 * @property {() => void} [onConfirm]
 * @property {() => void} [onClose]
 * @property {React.ButtonHTMLAttributes<HTMLButtonElement>} [confirmButtonProps]
 * @property {React.ButtonHTMLAttributes<HTMLButtonElement>} [closeButtonProps]
 */

/**
 * @param {divProps} props
 */
const ConfirmPopUp = ({
  isOpen = false,
  heading,
  confirmText,
  cancelText,
  undoneText,
  onConfirm = () => {},
  onClose = () => {},
  confirmButtonProps = {},
  closeButtonProps = {},
  ...props
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="overlay" role="dialog" {...props} onClick={onClose}>
      <div className="popup confirm-popup" onClick={(e) => e.stopPropagation()}>
        <article className="close">
          <h1>{heading || t("common.are_you_sure")}</h1>
          <FontAwesomeIcon icon={icons.close} onClick={onClose} />
        </article>
        <article className="undone">
          {undoneText || t("common.undoneText")}
        </article>
        <div className="btns">
          <Button
            onClick={onClose}
            btnType="cancel"
            type="button"
            btnStyleType="transparent"
            {...closeButtonProps}
          >
            {cancelText || t("common.cancel")}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            btnType="delete"
            {...confirmButtonProps}
          >
            {confirmText || t("common.confirm")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ConfirmPopUp);
