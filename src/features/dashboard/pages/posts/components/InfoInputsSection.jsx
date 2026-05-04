import SelectInputApi from "../../../../../components/inputs/SelectInputApi";
import endPoints from "../../../../../constant/endPoints";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

const InfoInputsSection = ({ formik, language }) => {
  const { t } = useTranslation();

  const selectContentType = useCallback(
    (type) => {
      const { category } = formik.values;
      formik.setFieldValue("content_type", type);
      if (type.id !== category?.content_type?.id)
        formik.setFieldValue("category", "");
    },
    [formik],
  );

  const selectCategory = useCallback(
    (category) => {
      formik.setFieldValue("category", category);
      formik.setFieldValue("content_type", category.content_type);
    },
    [formik],
  );

  return (
    <div className="post-inputs">
      <SelectInputApi
        endPoint={endPoints.contentType}
        onChange={(e) => selectContentType(e)}
        placeholder={
          formik.values.content_type?.[`name_${language}`] ||
          `${t("common.select")} ${t("common.content_type")}`
        }
        errorText={t(formik.errors.content_type)}
        label={t("common.content_type")}
        optionLabel={(e) => `${e?.name_en} - ${e?.name_ar} - ${e?.name_ku}`}
        params={{ ordering: { priority: "priority" } }}
      />

      <SelectInputApi
        endPoint={endPoints.categories}
        onChange={(e) => selectCategory(e)}
        placeholder={
          formik.values.category?.[`name_${language}`] ||
          `${t("common.select")} ${t("common.category")}`
        }
        errorText={!formik.values.category && t(formik.errors.category)}
        label={t("common.category")}
        optionLabel={(e) => `${e?.name_en} - ${e?.name_ar} - ${e?.name_ku}`}
        params={{ content_type: formik.values?.content_type?.id || null }}
      />
      <SelectInputApi
        endPoint={endPoints.authors}
        onChange={(e) => formik.setFieldValue("author", e)}
        placeholder={
          formik.values.author?.full_name ||
          `${t("common.select")} ${t("pages.author")}`
        }
        errorText={t(formik.errors.author)}
        label={t("pages.author")}
        optionLabel={(e) => e?.full_name}
        notRequired
      />
    </div>
  );
};

export default InfoInputsSection;
