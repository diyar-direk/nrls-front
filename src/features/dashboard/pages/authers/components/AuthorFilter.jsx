import Filters from "../../../../../components/table_toolbar/Filters";
import Input from "../../../../../components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const AuthorFilter = ({ filters, setFilters, t }) => {
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
        placeholder={t("common.search")}
        value={local?.full_name ?? ""}
        notRequired
        onChange={handleChange}
        label={t("author.full_name")}
      />
      <Input
        name="email"
        placeholder={t("common.search")}
        value={local?.email ?? ""}
        notRequired
        onChange={handleChange}
        label={t("author.email")}
      />

      <Input
        name="bio"
        placeholder={t("common.search")}
        value={local?.bio ?? ""}
        notRequired
        onChange={handleChange}
        label={t("author.bio")}
      />
    </Filters>
  );
};

export default AuthorFilter;
