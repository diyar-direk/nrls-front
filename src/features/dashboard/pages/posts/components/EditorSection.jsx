import { Editor } from "primereact/editor";
import Input from "../../../../../components/inputs/Input";
import { editorHeader } from "../../../../../constant/editor";
import endPoints from "../../../../../constant/endPoints";
import SelectInputApi from "../../../../../components/inputs/SelectInputApi";

const EditorSection = ({ formik, t }) => {
  return (
    <div className="post-inputs editor-container">
      <SelectInputApi
        endPoint={endPoints.posts}
        onChange={(e) => formik.setFieldValue("original_post", e)}
        placeholder={
          formik.values.original_post?.title || "select original_post"
        }
        errorText={formik.errors.original_post}
        label="original_post"
        optionLabel={(e) => e?.title}
        notRequired
      />
      <Input
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        errorText={t(formik.errors.title)}
        label={t("title")}
        placeholder={t("title_placeholder")}
      />
      <Input
        name="excerpt"
        value={formik.values.excerpt}
        onChange={formik.handleChange}
        errorText={t(formik.errors.excerpt)}
        label={t("excerpt")}
        placeholder={t("excerpt_placeholder")}
        elementType="textarea"
        rows={4}
        notRequired
      />
      <div className="editor inp">
        <label>{t("content")}</label>
        <Editor
          value={formik.values.content}
          onTextChange={(e) => formik.setFieldValue("content", e.htmlValue)}
          headerTemplate={editorHeader}
        />
      </div>
    </div>
  );
};

export default EditorSection;
