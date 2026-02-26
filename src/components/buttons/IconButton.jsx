import { useMemo } from "react";
/**
 * @typedef {Object} IconButtonProps
 * @property {string} [className]
 * @property {string} [title]
 * @property {"top" | "bottom" | "left" | "right"} [placement]
 * @property {"body-color" | "secondry-color" | "main" | "delete" | "save" | "cancel" | "update"} [color]
 * @property {"contained" | "outlined" | "transparent"} [styleType]
 */

/**
 * @param {IconButtonProps & React.HTMLAttributes<HTMLButtonElement>} props
 */

const IconButton = ({
  children,
  className,
  title,
  placement = "bottom",
  color = "body-color",
  styleType = "contained",
  ...props
}) => {
  const classNameMemo = useMemo(
    () => `${className || ""} ${color} icon-button ${styleType}`,
    [className, color, styleType],
  );
  return (
    <button type={props.type || "button"} {...props} className={classNameMemo}>
      {children}
      {title && <p className={`${placement} icon-button-hover`}> {title} </p>}
    </button>
  );
};

export default IconButton;
