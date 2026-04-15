import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import Filters from "./../../../../../components/table_toolbar/Filters";
import Input from "../../../../../components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <Filters filters={filters} setFilters={setFilters}>
      <Input
        name="username"
        placeholder={t("user.search_by_username")}
        value={local?.username ?? ""}
        notRequired
        onChange={handleChange}
        label={t("user.username")}
      />

      <Input
        name="full_name"
        placeholder={t("user.search_by_full_name")}
        value={local?.full_name ?? ""}
        notRequired
        onChange={handleChange}
        label={t("user.full_name")}
      />

      <SelectOptionInput
        customOptions={[
          {
            title: t("user.all"),
            onChange: () => setLocal((p) => ({ ...p, is_active: "" })),
          },
        ]}
        label={t("user.account_status")}
        placeholder={t("user.account_status_placeholder")}
        options={[
          { text: t("user.active"), value: true },
          { text: t("user.inactive"), value: false },
        ]}
        onSelectOption={(e) => setLocal((p) => ({ ...p, is_active: e.value }))}
        value={local?.is_active ? t("user.active") : local?.is_active === false && t("user.inactive")}
        notRequired
      />

      <Input
        name="email"
        placeholder={t("table.filters.search_by_email")}
        value={local?.email ?? ""}
        notRequired
        onChange={handleChange}
        label={t("user.email")}
      />
    </Filters>
  );
};

export default UsersFilter;
