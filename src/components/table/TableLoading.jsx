import { memo } from "react";

const TableLoading = () => {
  return (
    <div className="table-loading table-actions">
      <span className="spinner" />
      <span className="loading-text">loading data</span>
    </div>
  );
};

export default memo(TableLoading);
