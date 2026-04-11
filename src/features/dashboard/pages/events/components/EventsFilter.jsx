import Filters from "../../../../../components/table_toolbar/Filters";
import Input from "../../../../../components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import SelectInputApi from "../../../../../components/inputs/SelectInputApi";
import endPoints from "../../../../../constant/endPoints";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import { eventType } from "../../../../../constant/enums";

const EventsFilter = ({ filters, setFilters }) => {
  const [local, setLocal] = useState(filters);

  const [debouncedValue] = useDebounce(local, 500);

  useEffect(() => {
    setFilters(debouncedValue);
  }, [debouncedValue, setFilters]);

  const handleChange = useCallback(
    (e) => setLocal((p) => ({ ...p, [e.target.name]: e.target.value })),
    [],
  );
  const handleSelect = useCallback(
    (name, value) => setLocal((p) => ({ ...p, [name]: value })),
    [],
  );

  return (
    <Filters
      filters={filters}
      setFilters={setFilters}
      FromToFields={[
        { label: "event date", name: "event_date" },
        { label: "attendess_count", name: "attendess_count", type: "number" },
      ]}
    >
      <SelectInputApi
        endPoint={endPoints.posts}
        onChange={(e) => handleSelect("post", e)}
        placeholder={local?.post?.title || "all"}
        label="post"
        optionLabel={(e) => e?.title}
        notRequired
        customOptions={[
          { title: "all", onChange: () => handleSelect("post", null) },
        ]}
      />
      <SelectOptionInput
        onSelectOption={(e) => handleSelect("event_type", e.value)}
        placeholder={local?.event_type || "all"}
        label="event_type"
        notRequired
        customOptions={[
          { title: "all", onChange: () => handleSelect("event_type", null) },
        ]}
        options={eventType.map((e) => ({ text: e, value: e }))}
      />
      <Input
        name="location"
        placeholder="search by location"
        value={local?.location ?? ""}
        notRequired
        onChange={handleChange}
        label="location"
      />
    </Filters>
  );
};

export default EventsFilter;
