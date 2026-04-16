import SelectInputApi from "../../../../../components/inputs/SelectInputApi";
import endPoints from "../../../../../constant/endPoints";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import { allTyps } from "../../../../../constant/enums";
import { useTranslation } from "react-i18next";

const InfoInputsSection = ({ formik, language }) => {
  const { t } = useTranslation();

  return (
    <div className="post-inputs">
      <SelectOptionInput
        label={t("common.content_type")}
        onSelectOption={(e) => formik.setFieldValue("content_type", e.value)}
        value={formik.values.content_type}
        options={allTyps.map((e) => ({ text: e, value: e }))}
        errorText={t(formik.errors.content_type)}
      />
      <SelectInputApi
        endPoint={endPoints.categories}
        onChange={(e) => formik.setFieldValue("category", e)}
        placeholder={
          formik.values.category?.[`name_${language}`] ||
          `${t("common.select")} ${t("common.category")}`
        }
        errorText={t(formik.errors.category)}
        label={t("common.category")}
        optionLabel={(e) => `${e.name_en} - ${e.name_ar} - ${e.name_ku}`}
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
