import Input from "../../../../../components/inputs/Input";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import { languages } from "../../../../../constant/languages";

const MoreInfoInputs = ({ formik, t }) => {
  return (
    <div className="post-inputs">
      <SelectOptionInput
        label="language"
        onSelectOption={(e) => formik.setFieldValue("language", e.value)}
        value={
          languages?.find((e) => e.value === formik.values.language)?.title
        }
        options={languages.map((e) => ({ text: e.title, value: e.value }))}
        errorText={formik.errors.language}
      />
      <Input
        name="published_at"
        value={formik.values.published_at}
        onChange={formik.handleChange}
        errorText={t(formik.errors.published_at)}
        label={t("published_at")}
        type="date"
        notRequired
      />
      <SelectOptionInput
        label="is_published"
        onSelectOption={(e) => formik.setFieldValue("is_published", e.value)}
        value={formik.values.is_published ? "yes" : "no"}
        options={[
          {
            text: "yes",
            value: true,
          },
          {
            text: "no",
            value: false,
          },
        ]}
        errorText={formik.errors.is_published}
        notRequired
      />
    </div>
  );
};

export default MoreInfoInputs;
