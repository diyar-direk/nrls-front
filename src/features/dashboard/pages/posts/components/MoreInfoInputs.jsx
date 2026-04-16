import { useCallback } from "react";
import Input from "../../../../../components/inputs/Input";
import SelectInputApi from "../../../../../components/inputs/SelectInputApi";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import endPoints from "../../../../../constant/endPoints";
import { languages } from "../../../../../constant/languages";

const MoreInfoInputs = ({ formik, t }) => {
  const handleSelectTag = useCallback(
    (e) => {
      const prev = formik.values.tags || [];
      const isExist = prev.find((t) => t.id === e.id);
      if (isExist) {
        formik.setFieldValue(
          "tags",
          prev.filter((t) => t.id !== e.id),
        );
      } else {
        formik.setFieldValue("tags", [...prev, e]);
      }
    },
    [formik],
  );

  const handleIgnore = useCallback(
    (e) => {
      const prev = formik.values.tags || [];
      formik.setFieldValue(
        "tags",
        prev.filter((t) => t.id !== e.id),
      );
    },
    [formik],
  );

  return (
    <div className="post-inputs">
      <SelectOptionInput
        label={t("common.language")}
        onSelectOption={(e) => formik.setFieldValue("language", e.value)}
        value={
          languages?.find((e) => e.value === formik.values.language)?.title
        }
        options={languages.map((e) => ({ text: e.title, value: e.value }))}
        errorText={t(formik.errors.language)}
      />
      <SelectInputApi
        endPoint={endPoints.tags}
        onChange={(e) => handleSelectTag(e)}
        placeholder={`${t("common.select")} ${t("pages.tags")}`}
        errorText={t(formik.errors.tags)}
        label={t("pages.tags")}
        optionLabel={(e) => `${e.name_en} - ${e.name_ar} - ${e.name_ku}`}
        isArray
        value={formik.values.tags}
        notRequired
        onIgnore={handleIgnore}
      />
      <SelectOptionInput
        label={t("common.is_published")}
        onSelectOption={(e) => formik.setFieldValue("is_published", e.value)}
        value={t(`common.${formik.values.is_published ? "yes" : "no"}`)}
        options={[
          {
            text: t("common.yes"),
            value: true,
          },
          {
            text: t("common.no"),
            value: false,
          },
        ]}
        errorText={t(formik.errors.is_published)}
        notRequired
      />
      <Input
        name="published_at"
        value={formik.values.published_at}
        onChange={formik.handleChange}
        errorText={t(formik.errors.published_at)}
        label={t("common.published_at")}
        type="date"
        notRequired
      />
    </div>
  );
};

export default MoreInfoInputs;
