import React, {
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import "./inputs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

/**
 * @typedef {Object} utlis
 * @property {string} label
 * @property {boolean} notRequired
 * @property {"input"|"textarea"} elementType
 * @property {React.HTMLAttributes<HTMLLabelElement>} labelProps
 * @property {string} errorText
 * @property {React.ReactNode} icon
 * @property {React.ReactNode} labelIcon
 * @property {React.HTMLAttributes<HTMLParagraphElement>} helperTextProps
 * @property {React.HTMLAttributes<HTMLDivElement>} containerProps
 */

/**
 * @param {React.InputHTMLAttributes<HTMLInputElement> & utlis} props
 */
const Input = (props, ref) => {
  const {
    label,
    labelProps,
    errorText,
    helperTextProps,
    containerProps,
    elementType = "input",
    icon,
    labelIcon,
    notRequired,
    ...rest
  } = props;

  const divContainerClassName = useMemo(() => {
    return `${containerProps?.className || ""} inp`.trim();
  }, [containerProps]);

  const localRef = useRef(null);

  const setRefs = useCallback(
    (el) => {
      localRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref],
  );

  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = rest.type === "password";

  const computedType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : rest.type || "text";

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((s) => !s);
    if (localRef.current) localRef.current.focus();
  }, []);

  const labelClassName = useMemo(
    () => `${!notRequired ? "required" : ""} ${labelProps?.className || ""}`,
    [notRequired, labelProps],
  );

  const inputWrapperClassName = useMemo(
    () => `${errorText ? "input-error-style" : ""} relative input-wrapper`,
    [errorText],
  );

  return (
    <div {...containerProps} className={divContainerClassName}>
      {label && (
        <label
          {...labelProps}
          htmlFor={rest.id || rest.name}
          className={labelClassName}
        >
          {labelIcon && <FontAwesomeIcon icon={labelIcon} />}
          {label}
        </label>
      )}

      {elementType === "textarea" ? (
        <textarea
          id={rest.id || rest.name}
          {...rest}
          ref={setRefs}
          className={inputWrapperClassName}
        />
      ) : (
        <div className={inputWrapperClassName}>
          {icon && <span className="input-icon">{icon}</span>}
          <input
            id={rest.id || rest.name}
            {...rest}
            type={computedType}
            ref={setRefs}
          />
          {isPasswordField && (
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
              className="password"
            />
          )}
        </div>
      )}

      {errorText && (
        <p className="field-error" {...helperTextProps}>
          {errorText}
        </p>
      )}
    </div>
  );
};

export default memo(forwardRef(Input));
