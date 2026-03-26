import Filters from "../../../../../components/table_toolbar/Filters";
import Input from "../../../../../components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const AuthorFilter = ({ filters, setFilters }) => {
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
        name="full_name"
        placeholder="search by full_name"
        value={local?.full_name ?? ""}
        notRequired
        onChange={handleChange}
        label="full_name"
      />
      <Input
        name="email"
        placeholder="search by email"
        value={local?.email ?? ""}
        notRequired
        onChange={handleChange}
        label="email"
      />
      <Input
        name="slug"
        placeholder="search by slug"
        value={local?.slug ?? ""}
        notRequired
        onChange={handleChange}
        label="slug"
      />
      <Input
        name="bio"
        placeholder="search by bio"
        value={local?.bio ?? ""}
        notRequired
        onChange={handleChange}
        label="bio"
      />
    </Filters>
  );
};

export default AuthorFilter;
