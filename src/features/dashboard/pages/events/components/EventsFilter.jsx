import Filters from "../../../../../components/table_toolbar/Filters";
import Input from "../../../../../components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import SelectInputApi from "../../../../../components/inputs/SelectInputApi";
import endPoints from "../../../../../constant/endPoints";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import { eventType } from "../../../../../constant/enums";

const EventsFilter = ({ filters, setFilters, t }) => {
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
        { label: t("events.event_date"), name: "event_date" },
        {
          label: t("events.attendees_count"),
          name: "attendees_count",
          type: "number",
        },
      ]}>
      <SelectInputApi
        endPoint={endPoints.posts}
        onChange={(e) => handleSelect("post", e)}
        placeholder={local?.post?.title || t("common.all")}
        label={t("pages.posts")}
        optionLabel={(e) => e?.title}
        notRequired
        customOptions={[
          {
            title: t("common.all"),
            onChange: () => handleSelect("post", null),
          },
        ]}
      />
      <SelectOptionInput
        onSelectOption={(e) => handleSelect("event_type", e.value)}
        placeholder={
          filters?.event_type
            ? t(`events.types.${filters?.event_type}`)
            : t("common.all")
        }
        label={t("events.event_type")}
        notRequired
        customOptions={[
          {
            title: t("common.all"),
            onChange: () => handleSelect("event_type", null),
          },
        ]}
        options={eventType.map((e) => ({
          text: t(`events.types.${e}`),
          value: e,
        }))}
      />
      <Input
        name="location"
        placeholder={t("common.search")}
        value={local?.location ?? ""}
        notRequired
        onChange={handleChange}
        label={t("events.location")}
      />
    </Filters>
  );
};

export default EventsFilter;
