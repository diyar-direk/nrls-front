import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../buttons/Button";
import { useDebounce } from "use-debounce";
import { useInfiniteFetch } from "../../hooks/useInfiniteFetch";
import "./inputs.css";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "./../skeleton/Skeleton";
import RepeatChildren from "./../RepeatChildren";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { icons } from "./../../constant/icons";

/**

 * @component
 *
 * @param {Object} props
 *
 * @param {string} [props.label]
 * 
 * @param {symbol} [props.labelIcon]
 *
 * @param {boolean} [props.notRequired=false]
 * 
 * @param {boolean} [props.hideButtonValue=false]
 * 
 * @param {string} props.placeholder
 *
 * @param {(option: any) => string} props.optionLabel
 *
 * @param {(option: any) => void} props.onChange
 *
 * @param {(option?: any) => void} props.onIgnore
 *
 * @param {any | any[]} props.value
 *
 * @param {boolean} [props.isArray=false]
 *
 * @param {string} props.endPoint
 *
 * @param {Object} [props.params={}]
 *
 * @param {string} [props.errorText]
 *
 * @param {number} [props.delay=500]
 *
 * @param {Array<{
 *   title: string,
 *   onChange: () => void
 * }>} [props.customOptions=[]]
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props.rest
 *
 * @returns {JSX.Element}
 *
 * @example
 * <SelectInputApi
 *   label="city"
 *   placeholder="select city"
 *   endPoint="/cities"
 *   optionLabel={(e) => e.name}
 *   value={city.name}
 *   onChange={setSelected}
 *   onIgnore={() => setSelected(null)}
 *   labelIcon={faUser}
 * />
 */

const SelectInputApi = ({
  placeholder,
  label,
  optionLabel,
  onChange,
  onIgnore,
  value,
  endPoint,
  isArray,
  errorText,
  delay = 500,
  customOptions = [],
  notRequired,
  params = {},
  hideButtonValue,
  labelIcon,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, delay);
  const { t } = useTranslation();
  const { data, loadMoreRef, isFetching } = useInfiniteFetch({
    endPoint: endPoint,
    page_size: 3,
    search: debouncedSearch,
    ...params,
  });

  const items = data?.pages?.flatMap((data) => data.data);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const toggleOpen = useCallback(
    (e) => {
      stopPropagation(e);
      setIsOpen((prev) => !prev);
    },
    [stopPropagation],
  );

  useEffect(() => {
    const onBodyClick = () => {
      if (isOpen) setIsOpen(false);
    };

    window.addEventListener("click", onBodyClick);

    return () => {
      window.removeEventListener("click", onBodyClick);
    };
  }, [isOpen, isArray]);

  const labelClassName = useMemo(
    () => `${!notRequired ? "required" : ""} title font-color`,
    [notRequired],
  );

  const handleChange = useCallback((e) => onChange(e), [onChange]);
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value.toLowerCase());
  }, []);

  const optionClassName = useMemo(
    () => `${isOpen ? "active " : ""} options`,
    [isOpen],
  );

  const placeholderClassName = useMemo(
    () => `${errorText ? "input-error-style" : ""} placeholder center relative`,
    [errorText],
  );

  return (
    <div className="select-input inp">
      {label && (
        <label className={labelClassName} onClick={toggleOpen}>
          {labelIcon && <FontAwesomeIcon icon={labelIcon} />}
          {label}
        </label>
      )}

      <div className={placeholderClassName} onClick={toggleOpen}>
        <span className="flex-1 ellipsis"> {placeholder}</span>
        <FontAwesomeIcon icon={faChevronDown} />

        <div {...props} className={optionClassName}>
          <label
            htmlFor="search"
            onClick={stopPropagation}
            className="auto-complete-search"
          >
            <input
              value={search}
              onChange={handleSearch}
              placeholder={t("filters.search")}
              id="search"
            />
            <FontAwesomeIcon icon={icons.search} />
          </label>
          <article>
            {customOptions?.map((itm) => (
              <h3 key={itm.title} onClick={itm.onChange}>
                {itm.title}
              </h3>
            ))}

            {items?.map((itm, i) => (
              <h3
                key={itm.id}
                onClick={() => handleChange(itm)}
                ref={i === items?.length - 1 ? loadMoreRef : null}
                className={`${isArray ? "array" : ""} ${
                  isArray && value?.some((v) => v.id === itm.id)
                    ? "selected"
                    : ""
                }`}
              >
                {optionLabel(itm)}
              </h3>
            ))}
            {isFetching && (
              <RepeatChildren count={3}>
                <Skeleton height="20px" width="90%" />
              </RepeatChildren>
            )}
          </article>
        </div>
      </div>

      {!hideButtonValue && isArray && value?.length > 0 ? (
        <div className="array-of-values">
          {value?.map((span, i) => (
            <Button
              onClick={() => onIgnore(span)}
              key={span.id || i}
              btnStyleType="transparent"
              type="button"
            >
              {typeof span === "string" ? span : optionLabel(span)}
              <FontAwesomeIcon icon={icons.close} />
            </Button>
          ))}
        </div>
      ) : (
        !hideButtonValue &&
        !isArray &&
        value && (
          <Button onClick={onIgnore} btnStyleType="transparent" type="button">
            {typeof value === "string" ? value : optionLabel(value)}
            <FontAwesomeIcon icon={icons.close} />
          </Button>
        )
      )}
      {errorText && <p className="field-error">{errorText}</p>}
    </div>
  );
};

export default SelectInputApi;
