import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../constant/icons";
import Button from "../../../../../components/buttons/Button";
import Input from "../../../../../components/inputs/Input";
import UploadFile from "../../../../../components/inputs/UploadFile";
const fileAcceptMap = {
  image: "image/*",
  video: "video/*",
  pdf: "application/pdf",
  audio: "audio/*",
};

const AddFilesForm = ({ formik, t }) => {
  return formik?.values?.files?.map((e, i) => {
    const isVideo = e.file_type === "video";

    return (
      <div className="post-inputs" key={i}>
        <div className="file-actions">
          <p>
            <FontAwesomeIcon icon={icons[e.file_type]} />
            {e.file_type}
          </p>

          <Button
            btnStyleType="transparent"
            btnType="delete"
            type="button"
            onClick={() => {
              const updated = formik.values.files.filter(
                (_, index) => index !== i,
              );
              formik.setFieldValue("files", updated);
            }}
          >
            <FontAwesomeIcon icon={icons.delete} />
            delete
          </Button>
        </div>

        {isVideo && (
          <Input
            name={`files.${i}.external_url`}
            value={formik.values.files[i].external_url}
            onChange={formik.handleChange}
            errorText={formik.errors.files?.[i]?.external_url}
            label={t("external_url")}
            placeholder="write a video url"
          />
        )}

        <Input
          name={`files.${i}.alt_text`}
          value={formik.values.files[i].alt_text}
          onChange={formik.handleChange}
          errorText={formik.errors.files?.[i]?.alt_text}
          label={t("alt_text")}
          placeholder="write alt text"
          notRequired
        />

        <Input
          name={`files.${i}.caption`}
          value={formik.values.files[i].caption}
          onChange={formik.handleChange}
          errorText={formik.errors.files?.[i]?.caption}
          label={t("caption")}
          placeholder="write a caption"
          notRequired
          elementType="textarea"
          rows={3}
        />

        {!isVideo && (
          <UploadFile
            name={`files.${i}.src`}
            title="src"
            errorText={formik.errors.files?.[i]?.src}
            notRequired
            value={formik.values?.files?.[i]?.src}
            onChange={(val) => formik.setFieldValue(`files.${i}.src`, val)}
            accept={fileAcceptMap[e.file_type]}
            revoke={false}
          />
        )}
      </div>
    );
  });
};

export default AddFilesForm;
