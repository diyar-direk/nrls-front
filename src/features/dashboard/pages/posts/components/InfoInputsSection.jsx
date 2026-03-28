import SelectInputApi from "../../../../../components/inputs/SelectInputApi";
import endPoints from "../../../../../constant/endPoints";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import { allTyps } from "../../../../../constant/enums";

const InfoInputsSection = ({ formik, language }) => {
  return (
    <div className="post-inputs">
      <SelectInputApi
        endPoint={endPoints.posts}
        onChange={(e) => formik.setFieldValue("original_post_id", e)}
        placeholder={formik.values.original_post_id?.title || "select category"}
        errorText={formik.errors.original_post_id}
        label="original_post_id"
        optionLabel={(e) => e?.title}
        notRequired
      />
      <SelectOptionInput
        label="content_type"
        onSelectOption={(e) => formik.setFieldValue("content_type", e.value)}
        value={formik.values.content_type}
        options={allTyps.map((e) => ({ text: e, value: e }))}
        errorText={formik.errors.content_type}
      />
      <SelectInputApi
        endPoint={endPoints.categories}
        onChange={(e) => formik.setFieldValue("category_id", e)}
        placeholder={
          formik.values.category_id?.[`name_${language}`] || "select category"
        }
        errorText={formik.errors.category_id}
        label="category_id"
        optionLabel={(e) => `${e.name_en} - ${e.name_ar} - ${e.name_ku}`}
      />
      <SelectInputApi
        endPoint={endPoints.authors}
        onChange={(e) => formik.setFieldValue("author_id", e)}
        placeholder={formik.values.author_id?.full_name || "select category"}
        errorText={formik.errors.author_id}
        label="author_id"
        optionLabel={(e) => e?.full_name}
        notRequired
      />
    </div>
  );
};

export default InfoInputsSection;
