import { useMemo } from "react";
import "./skeleton.css";

/**
 * @example
 * <Skeleton className="rounded" width="100%" height="40px" />
 * @typedef {Object} Utils
 * @property {string} [className]
 * @property {string} [height=\"40px\"]
 * @property {string} [width=\"100%\"]
 * @property {Object} [style={}]
 * @property {Object} [loaderProps]
 * @param {Utils} props
 * @returns {JSX.Element}
 */

const Skeleton = ({
  className,
  height = "40px",
  width = "100%",
  style = {},
  loaderProps,
  ...props
}) => {
  const classNameMemo = useMemo(
    () => `skeleton ${className || ""}`,
    [className]
  );
  const containerStyle = useMemo(
    () => ({
      ...style,
      width,
      height,
    }),
    [style, width, height]
  );

  return (
    <div className={classNameMemo} style={containerStyle} {...props}>
      <span {...loaderProps} />
    </div>
  );
};

export default Skeleton;
