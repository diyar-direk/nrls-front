import SelectInputApi from "../../../../../components/inputs/SelectInputApi";
import endPoints from "../../../../../constant/endPoints";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import { allTyps } from "../../../../../constant/enums";

const InfoInputsSection = ({ formik, language }) => {
  return (
    <div className="post-inputs">
      <SelectOptionInput
        label="content_type"
        onSelectOption={(e) => formik.setFieldValue("content_type", e.value)}
        value={formik.values.content_type}
        options={allTyps.map((e) => ({ text: e, value: e }))}
        errorText={formik.errors.content_type}
      />
      <SelectInputApi
        endPoint={endPoints.categories}
        onChange={(e) => formik.setFieldValue("category", e)}
        placeholder={
          formik.values.category?.[`name_${language}`] || "select category"
        }
        errorText={formik.errors.category}
        label="category"
        optionLabel={(e) => `${e.name_en} - ${e.name_ar} - ${e.name_ku}`}
      />
      <SelectInputApi
        endPoint={endPoints.authors}
        onChange={(e) => formik.setFieldValue("author", e)}
        placeholder={formik.values.author?.full_name || "select author"}
        errorText={formik.errors.author}
        label="author"
        optionLabel={(e) => e?.full_name}
        notRequired
      />
    </div>
  );
};

export default InfoInputsSection;
