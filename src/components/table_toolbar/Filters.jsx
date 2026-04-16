import { Fragment, useCallback, useEffect, useState } from "react";
import IconButton from "../buttons/IconButton";
import "./filters.css";
import Input from "../inputs/Input";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "use-debounce";

/**
 * @typedef {Object} FromToFieldsProps
 * @property {string} name
 * @property {string} label
 * @property {"datetime-local" | "date" | "time" | "number"} [type]
 * @property {Array} [roles]
 */

/**
 * @typedef {Object} FilerProps
 * @property {object} filters
 * @property {React.SetStateAction} setFilters
 * @property {boolean} [hideCreatedAtInputs]
 * @property {boolean} [hideCreatedByInputs]
 * @property {FromToFieldsProps[]} FromToFields
 */

/**
 * @param {FilerProps} props
 */

const Filters = ({
  children,
  filters,
  setFilters,
  hideCreatedAtInputs = false,
  FromToFields,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const { user } = useAuth();
  const { role } = user || {};

  const { t } = useTranslation();

  const [localFilters, setLocalFilters] = useState(filters || {});

  const [debouncedValue] = useDebounce(localFilters, 500);

  useEffect(() => {
    setFilters(debouncedValue);
  }, [debouncedValue, setFilters]);

  const handleChange = useCallback((e) => {
    const { value, name } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <>
      <IconButton
        title={t("common.filters")}
        color={isOpen ? "main" : "secondry-color"}
        onClick={toggleOpen}>
        <FontAwesomeIcon icon={faFilter} />
      </IconButton>

      <div className={`${isOpen ? "open" : ""} filters`}>
        {!hideCreatedAtInputs && (
          <>
            <Input
              label={`${t("common.from")} ${t("common.date")}`}
              type="date"
              value={localFilters?.["createdAt_gte"]}
              name="createdAt_gte"
              onInput={handleChange}
              notRequired
            />
            <Input
              label={`${t("common.to")} ${t("common.date")}`}
              type="date"
              value={localFilters?.["createdAt_lte"]}
              name="createdAt_lte"
              onInput={handleChange}
              notRequired
            />
          </>
        )}

        {FromToFields?.map(
          (e, i) =>
            (!e?.roles || e?.roles?.includes(role)) && (
              <Fragment key={i}>
                <Input
                  {...e}
                  label={`${t("common.from")} ${t(e.label)}`}
                  placeholder={`${t("common.from")} ${t(e.label)}`}
                  type={e.type || "date"}
                  value={localFilters?.[`${e.name}_gte`]}
                  name={`${e.name}_gte`}
                  notRequired
                  onInput={handleChange}
                />
                <Input
                  {...e}
                  label={`${t("common.to")} ${t(e.label)}`}
                  placeholder={`${t("common.to")} ${t(e.label)}`}
                  type={e.type || "date"}
                  value={localFilters?.[`${e.name}_lte`]}
                  name={`${e.name}_lte`}
                  notRequired
                  onInput={handleChange}
                />
              </Fragment>
            ),
        )}

        {children}
      </div>
    </>
  );
};

export default Filters;
