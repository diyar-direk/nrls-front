import { memo, useMemo } from "react";
import "./button.css";

/**
 * @typedef {Object} Utils
 * @property {boolean} disabled
 * @property {boolean} isSending
 * @property {string} isSendingText
 * @property {string} className
 * @property {"contained" | "outlined" | "transparent"} btnStyleType
 * @property {"delete" | "main" | "save" | "cancel" | "update"} btnType
 */

/**
 * @param {Utils & React.ButtonHTMLAttributes<HTMLButtonElement>} ButtonProps
 */
const Button = ({
  disabled = false,
  isSending = false,
  isSendingText = "",
  children,
  btnStyleType = "contained",
  btnType = "main",
  className = "",
  ...props
}) => {
  const buttonClassName = useMemo(
    () =>
      `btn ${isSending ? "sending" : ""} ${
        btnStyleType || "contained"
      } ${btnType} ${className || ""}`,
    [className, isSending, btnStyleType, btnType],
  );

  const buttonText = useMemo(
    () => (isSending ? `${isSendingText || "sending"} ...` : children),
    [isSending, isSendingText, children],
  );

  return (
    <button
      disabled={disabled || isSending}
      className={buttonClassName}
      {...props}
    >
      {isSending && <article className="btn-loader" />}
      {buttonText}
    </button>
  );
};

export default memo(Button);
