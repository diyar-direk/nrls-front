import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import Filters from "./../../../../../components/table_toolbar/Filters";
import Input from "../../../../../components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const UsersFilter = ({ filters, setFilters }) => {
  const [local, setLocal] = useState(filters);

  const [debouncedValue] = useDebounce(local, 500);

  useEffect(() => {
    setFilters(debouncedValue);
  }, [debouncedValue, setFilters]);

  const handleChange = useCallback(
    (e) => setLocal((p) => ({ ...p, [e.target.name]: e.target.value })),
    [],
  );

  return (
    <Filters filters={filters} setFilters={setFilters}>
      <Input
        name="username"
        placeholder="search by username"
        value={local?.username ?? ""}
        notRequired
        onChange={handleChange}
        label="username"
      />

      <Input
        name="full_name"
        placeholder="search by full_name"
        value={local?.full_name ?? ""}
        notRequired
        onChange={handleChange}
        label="full_name"
      />

      <SelectOptionInput
        customOptions={[
          {
            title: "all",
            onChange: () => setLocal((p) => ({ ...p, is_active: "" })),
          },
        ]}
        label="account status"
        placeholder="all"
        options={[
          { text: "active", value: true },
          { text: "inactive", value: false },
        ]}
        onSelectOption={(e) => setLocal((p) => ({ ...p, is_active: e.value }))}
        value={local?.is_active ? "yes" : local?.is_active === false && "no"}
        notRequired
      />

      <Input
        name="email"
        placeholder="search by email"
        value={local?.email ?? ""}
        notRequired
        onChange={handleChange}
        label="email"
      />
    </Filters>
  );
};

export default UsersFilter;
