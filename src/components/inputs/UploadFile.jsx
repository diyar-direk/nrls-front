import { memo, useCallback, useEffect, useMemo, useState } from "react";
import "./upload-file.css";
import Button from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { icons } from "../../constant/icons";

function UploadFile({
  onChange = () => {},
  title = "",
  name = "",
  errorText,
  value,
  accept = "*/*",
  notRequired,
  className,
  revoke = true,
  defaultValue,
  defaultType = "image",
}) {
  const [isDragging, setIsDragging] = useState(false);

  const fileType = useMemo(() => {
    if (value?.file) {
      if (value.file.type.startsWith("image")) return "image";
      if (value.file.type.startsWith("video")) return "video";
      if (value.file.type === "application/pdf") return "pdf";
      if (value.file.type.startsWith("audio")) return "audio";
      return "file";
    }

    if (defaultValue) return defaultType;

    return null;
  }, [value, defaultValue, defaultType]);

  const handleChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      onChange({ name: e.target.name, file, url });
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      onChange({ name, file, url });
      setIsDragging(false);
    },
    [onChange, name],
  );

  const handleRemove = useCallback(() => {
    onChange("");
  }, [onChange]);

  useEffect(() => {
    return () => {
      if (value?.file && value?.url && revoke) {
        URL.revokeObjectURL(value.url);
      }
    };
  }, [value, revoke]);

  const { t } = useTranslation();

  const renderPreview = () => {
    const src = value?.url || defaultValue;
    if (!src) return null;

    switch (fileType) {
      case "image":
        return <img src={src} alt="" className="preview-img" />;

      case "video":
        return <video className="preview-video" src={src} controls />;

      case "pdf":
        return <iframe src={src} className="preview-pdf" title="pdf" />;
      case "audio":
        return <audio className="preview-audio" src={src} controls />;

      default:
        return (
          <a href={src} target="_blank" rel="noreferrer">
            Open File
          </a>
        );
    }
  };

  return (
    <div className={`${className || ""} upload-file font-color`}>
      <label className={`${!notRequired ? "required" : ""}`}>{title}</label>

      <div className="upload-container">
        <div
          className={`upload-frame ${isDragging ? "dragging" : ""} ${
            errorText ? "error" : ""
          }`}
        >
          {value?.url && (
            <Button
              onClick={handleRemove}
              className="remove-btn"
              btnType="delete"
              type="button"
            >
              <FontAwesomeIcon icon={icons.close} />
            </Button>
          )}

          <label
            htmlFor={name}
            className="upload-label"
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDrop={handleDrop}
          >
            {value?.url || defaultValue ? (
              renderPreview()
            ) : (
              <div className="upload-placeholder">
                {isDragging ? (
                  <h2>{t("upload.drop")}</h2>
                ) : (
                  <>
                    <h2>
                      {t("upload.upload")} {title}
                    </h2>
                    <p>{t("upload.drag")}</p>
                  </>
                )}
              </div>
            )}
          </label>
        </div>

        <div className="upload-actions">
          <input
            onChange={handleChange}
            id={name}
            name={name}
            type="file"
            hidden
            accept={accept}
          />

          {errorText && <span className="field-error">{errorText}</span>}
        </div>
      </div>
    </div>
  );
}

export default memo(UploadFile);
