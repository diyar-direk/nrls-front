/**
 * @typedef {Object} divProps
 * @property {boolean} isOpen
 * @property {() => void} [onClose]
 */

import { memo, useMemo } from "react";
import IconButton from "../buttons/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../constants/icons";
import "./popups.css";
import { useTranslation } from "react-i18next";

/**
 * @param {divProps & React.HTMLAttributes<HTMLDivElement>} props
 */
const PopUp = ({
  isOpen = false,
  onClose = () => {},
  className,
  children,
  ...props
}) => {
  const popupClassName = useMemo(() => `popup ${className || ""}`, [className]);

  const { t } = useTranslation();

  if (!isOpen) return;

  return (
    <div className="overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={popupClassName}
        {...props}
      >
        <div className="close-btn">
          <IconButton
            color="delete"
            styleType="transparent"
            title={t("close")}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={icons.close} />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
};

export default memo(PopUp);
