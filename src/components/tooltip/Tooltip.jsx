import { memo, useMemo } from "react";
import "./tooltip.css";

/**
 * @component
 * @param {Object} props - Component props
 * @param {string} props.text - The tooltip text to display
 * @param {"top" | "bottom" | "left" | "right"} [props.placement="top"] - Tooltip position
 * @param {string} [props.className] - Additional custom class names
 * @param {React.ReactNode} props.children - Wrapped element that triggers the tooltip
 * @param {...any} props - Any additional div props (onClick, style, etc.)
 *
 * @example
 * <Tooltip text="Delete item" placement="bottom">
 *   <button>Delete</button>
 * </Tooltip>
 *
 * @returns {JSX.Element}
 */
const Tooltip = ({
  text,
  placement = "top",
  className,
  children,
  ...props
}) => {
 
  const classNameMemo = useMemo(
    () => `${className || ""} ${placement} tooltip-container`,
    [className, placement],
  );

  return (
    <div className={classNameMemo} {...props}>
      {children}
      <span className="tooltip-text">{text}</span>
    </div>
  );
};

export default memo(Tooltip);
