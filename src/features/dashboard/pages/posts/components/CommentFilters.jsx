import { useMemo } from "react";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";

const CommentFilters = ({ selectValue, filters }) => {
  const approvedPlaceholder = useMemo(() => {
    if (typeof filters?.is_approved === "boolean") {
      return filters?.is_approved ? "approved" : "not approved";
    }

    return "all";
  }, [filters?.is_approved]);

  return (
    <div>
      <SelectOptionInput
        customOptions={[{ title: "all" }]}
        label="comment status"
        notRequired
        options={[
          {
            text: "approved",
            value: true,
          },
          {
            text: "not apporved",
            value: false,
          },
        ]}
        placeholder={approvedPlaceholder}
        onSelectOption={(e) => selectValue("is_approved", e.value)}
      />
      <SelectOptionInput
        label="comment status"
        notRequired
        options={[
          {
            text: "latest comments",
            value: "-created_at",
          },
          {
            text: "oldest comments",
            value: "created_at",
          },
        ]}
        placeholder={filters?.created_at?.text}
        onSelectOption={(e) => selectValue("created_at", e)}
      />
    </div>
  );
};

export default CommentFilters;
