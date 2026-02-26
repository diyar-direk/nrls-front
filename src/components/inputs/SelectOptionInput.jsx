import { memo, useCallback, useEffect, useMemo, useState } from "react";
import "./inputs.css";
import Button from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

/**
 * @typedef {Object} OptionItem
 * @property {string} text
 * @property {symbol} icon
 * @property {any} [value]
 * @property {function(): void} [onSelectOption]
 * @property {Object} [props]
 */
/**
 * @typedef {Object} customOptionsProps
 * @property {string} title
 * @property {() => void} [onSelectOption]
 */

/**
 * @typedef {Object} SelectOptionInputProps
 * @property {string} label
 * @property {symbol} labelIcon
 * @property {symbol} icon
 * @property {boolean} notRequired
 * @property {string} placeholder
 * @property {OptionItem[]} options
 * @property {string} [value]
 * @property {customOptionsProps[]} customOptions
 * @property {function(OptionItem): void} onSelectOption
 * @property {function(): void} [onIgnore]
 * @property {string} [errorText]
 * @property {Object} [optionListProps]
 * @property {Object} [wrapperProps]
 */

/**
 * @param {SelectOptionInputProps} props
 */

const SelectOptionInput = ({
  label,
  placeholder,
  onIgnore,
  value,
  options = [],
  onSelectOption,
  errorText,
  customOptions = [],
  optionListProps = {},
  wrapperProps = {},
  notRequired,
  labelIcon,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const toggleOptionArea = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (option, e) => {
      e?.stopPropagation();
      option.onSelectOption ? option.onSelectOption() : onSelectOption(option);
      setIsOpen(false);
      setHighlightIndex(-1);
    },
    [onSelectOption],
  );

  useEffect(() => {
    const onBodyClick = () => {
      if (isOpen) setIsOpen(false);
    };

    window.addEventListener("click", onBodyClick);
    return () => window.removeEventListener("click", onBodyClick);
  }, [isOpen]);

  const optionListClassName = useMemo(
    () => `options active ${optionListProps?.className || ""}`,
    [optionListProps],
  );

  const wrapperClassName = useMemo(
    () => `select-input inp ${wrapperProps?.className || ""}`,
    [wrapperProps],
  );
  const labelClassName = useMemo(
    () => `${!notRequired ? "required" : ""} title`,
    [notRequired],
  );

  const placeholderClassName = useMemo(
    () => `${errorText ? "input-error-style" : ""} placeholder center relative`,
    [errorText],
  );

  return (
    <div {...wrapperProps} className={wrapperClassName}>
      {label && (
        <label
          onFocus={() => setIsOpen(true)}
          onClick={toggleOptionArea}
          className={labelClassName}
        >
          {labelIcon && <FontAwesomeIcon icon={labelIcon} />}
          {label}
        </label>
      )}

      <div onClick={toggleOptionArea} className={placeholderClassName}>
        {icon && <FontAwesomeIcon icon={icon} />}
        <span className="flex-1 ellipsis">{placeholder}</span>
        <FontAwesomeIcon icon={faChevronDown} />

        {isOpen && (
          <article {...optionListProps} className={optionListClassName}>
            {customOptions?.map((itm) => (
              <h3 key={itm.title} onClick={itm.onChange}>
                {itm.icon && <FontAwesomeIcon icon={itm.icon} />}
                {itm.title}
              </h3>
            ))}
            {options?.map((opt, index) => (
              <h3
                key={opt.text || index}
                onClick={(e) => handleSelect(opt, e)}
                className={highlightIndex === index ? "highlight" : ""}
                {...opt.props}
              >
                {opt.icon && <FontAwesomeIcon icon={opt.icon} />}
                {opt.text}
              </h3>
            ))}
          </article>
        )}
      </div>

      {value && (
        <Button onClick={onIgnore} btnStyleType="outlined" btnType="delete">
          {value}
        </Button>
      )}

      {errorText && <p className="field-error">{errorText}</p>}
    </div>
  );
};

export default memo(SelectOptionInput);
