import { memo } from "react";
import "./tooltip.css";

const Tooltip = ({ text, children }) => {
  return (
    <div className="tooltip-container">
      {children}
      <span className="tooltip-text">{text}</span>
    </div>
  );
};

export default memo(Tooltip);
