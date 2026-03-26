/**
 * @typedef {Object} divProps
 * @property {string} src
 * @property {() => void} [onClose]
 */

import { memo, useMemo } from "react";
import IconButton from "../buttons/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./popups.css";
import { useTranslation } from "react-i18next";
import { icons } from "../../constant/icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

/**
 * @param {divProps & React.HTMLAttributes<HTMLDivElement>} props
 */
const ImgViewPopup = ({
  src = false,
  onClose = () => {},
  className,
  imgProps,
  ...props
}) => {
  const popupClassName = useMemo(() => `popup ${className || ""}`, [className]);

  const { t } = useTranslation();

  if (!src) return;

  return (
    <div className="overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={popupClassName}
        {...props}
      >
        <div className="close-btn gap-10">
          <a href={src} download={src} target="_blank">
            <IconButton
              color="save"
              styleType="transparent"
              title={t("download")}
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faDownload} />
            </IconButton>
          </a>
          <IconButton
            color="delete"
            styleType="transparent"
            title={t("close")}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={icons.close} />
          </IconButton>
        </div>
        <img src={src} alt="view-img" {...imgProps} />
      </div>
    </div>
  );
};

export default memo(ImgViewPopup);
