import { memo } from "react";
import Button from "../buttons/Button";
import "./popups.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../constants/icons";

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
  heading = "are you sure you want to do this",
  confirmText = "confirm",
  cancelText = "cancel",
  undoneText = "this cant be undone",
  onConfirm = () => {},
  onClose = () => {},
  confirmButtonProps = {},
  closeButtonProps = {},
  ...props
}) => {
  if (!isOpen) return null;

  return (
    <div className="overlay" role="dialog" {...props} onClick={onClose}>
      <div className="popup confirm-popup" onClick={(e) => e.stopPropagation()}>
        <article className="close">
          <h1>{heading}</h1>
          <FontAwesomeIcon icon={icons.close} onClick={onClose} />
        </article>
        <article className="undone">{undoneText}</article>
        <div className="btns">
          <Button
            onClick={onClose}
            btnType="cancel"
            type="button"
            btnStyleType="transparent"
            {...closeButtonProps}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            btnType="delete"
            {...confirmButtonProps}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ConfirmPopUp);
