import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import IconButton from "../buttons/IconButton";
import PopUp from "../popup/PopUp";
import Button from "../buttons/Button";
import ConfirmPopUp from "../popup/ConfirmPopUp";
import { formatSizeFromKB } from "./../../utils/formatSizeFromKB";
import "./inputs.css";
import { icons } from "../../constants/icons";
import { useTranslation } from "react-i18next";

const UploadMultiFiles = ({
  label,
  value = [],
  onChange = () => {},
  onDelete = () => {},
  errorText,
  accept = "image/png,image/jpg,image/jpeg",
  icon = faFile,
  className = "",
  maxFiles = 5,
  hideNameAndSize,
  labelIcon,
  ...props
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openedImage, setOpenedImage] = useState(null);
  const [deletedFile, setDeletedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const acceptedTypes = useMemo(() => accept.split(","), [accept]);

  const createPreview = (file) => {
    if (!(file instanceof File)) {
      return file;
    }

    return {
      file,
      preview: URL.createObjectURL(file),
    };
  };

  useEffect(() => {
    if (!value?.length) {
      setUploadedFiles([]);
      return;
    }

    const withPreview = value.map((f) =>
      f.preview || !(f instanceof File) ? f : createPreview(f),
    );
    setUploadedFiles(withPreview);
  }, [value]);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
  }, [uploadedFiles]);

  const processFiles = useCallback(
    (files) => {
      const filtered = files.filter(
        (f) => acceptedTypes.includes(f.type) || !(f instanceof File),
      );

      const previews = filtered.map(createPreview);

      const notRepeated = uploadedFiles.filter(
        (file) =>
          !files.some(
            (f) => f.name === file.file.name && f.size === f.file.size,
          ),
      );
      let merged = [...notRepeated, ...previews];

      merged = merged.slice(0, maxFiles);

      setUploadedFiles(merged);
      onChange(merged.map((f) => (!(f.file instanceof File) ? f : f.file)));
    },
    [acceptedTypes, maxFiles, uploadedFiles, onChange],
  );

  const handleInputChange = useCallback(
    (e) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
      processFiles(files);
      e.target.value = "";
    },
    [processFiles],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      processFiles(Array.from(e.dataTransfer.files || []));
    },
    [processFiles],
  );

  const handleDelete = useCallback(() => {
    if (!deletedFile) return;

    const filtered = uploadedFiles.filter(
      (f) =>
        f.file.name !== deletedFile.file.name ||
        f.src !== deletedFile.src ||
        f.file.size !== deletedFile.file.size,
    );

    !(deletedFile instanceof File) && URL.revokeObjectURL(deletedFile.preview);

    setUploadedFiles(filtered);
    onDelete(deletedFile.id ? deletedFile.id : deletedFile.file);
    onChange(filtered.map((f) => (!(f instanceof File) ? f : f.file)));
    setDeletedFile(null);
  }, [deletedFile, uploadedFiles, onDelete, onChange]);

  const containerClass = useMemo(
    () => `multiple-upload-container ${className}`,
    [className],
  );

  const hideInputArea = useMemo(
    () => uploadedFiles?.length >= maxFiles,
    [uploadedFiles.length, maxFiles],
  );

  const { t } = useTranslation();

  return (
    <>
      <div className={containerClass} {...props}>
        {label && (
          <label htmlFor="mutli-file-select">
            {labelIcon && <FontAwesomeIcon icon={labelIcon} />}
            {label}
          </label>
        )}

        {!hideInputArea && (
          <label
            className={`styled ${isDragging ? "dragging" : ""}`}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            htmlFor="mutli-file-select"
          >
            <input
              type="file"
              hidden
              multiple
              accept={accept}
              aria-label="Upload multiple files"
              onChange={handleInputChange}
              id="mutli-file-select"
            />

            <FontAwesomeIcon icon={icon} />
            <span>
              {isDragging
                ? t("upload.drop")
                : `${t("upload.upload")} ${t("upload.drag")}`}
            </span>
          </label>
        )}

        {errorText && <p className="field-error">{errorText}</p>}

        <div className="uploaded-images">
          {uploadedFiles.map((f) => (
            <div
              key={`${f.file?.name}-${f.file?.size || f.id}`}
              className="itm"
            >
              {f.file?.type.startsWith("image") ? (
                <img
                  src={f.preview || f.src}
                  alt={f.file?.name}
                  className="file"
                  onClick={() => setOpenedImage(f.preview || f.src)}
                />
              ) : (
                <iframe src={f.preview} title={f.file?.name} className="file" />
              )}

              {!hideNameAndSize && (
                <article>
                  {f.file?.name && (
                    <div className="info">
                      <h4 className="colon-after">{t("upload.file_name")}</h4>
                      <p>{f.file?.name}</p>
                    </div>
                  )}
                  {f.file?.size && (
                    <div className="info">
                      <h4 className="colon-after">{t("upload.file_size")}</h4>
                      <p>{formatSizeFromKB(f.file?.size)}</p>
                    </div>
                  )}
                </article>
              )}

              <IconButton
                color="delete"
                styleType="transparent"
                onClick={() => setDeletedFile(f)}
              >
                <FontAwesomeIcon icon={icons.delete} />
              </IconButton>
            </div>
          ))}
        </div>
      </div>

      <ConfirmPopUp
        isOpen={!!deletedFile}
        onClose={() => setDeletedFile(null)}
        onConfirm={handleDelete}
      />

      <PopUp
        isOpen={openedImage}
        onClose={() => setOpenedImage(null)}
        className="upload-popup"
      >
        <>
          <img
            src={openedImage || ""}
            alt=""
            onClick={() => window.open(openedImage, "_blank")}
          />

          <Button
            btnType="delete"
            type="button"
            onClick={() => setOpenedImage(null)}
          >
            {t("close")}
          </Button>
        </>
      </PopUp>
    </>
  );
};

export default memo(UploadMultiFiles);
