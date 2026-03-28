import { Editor } from "primereact/editor";
import Input from "../../../../../components/inputs/Input";
import { editorHeader } from "../../../../../constant/editor";

const EditorSection = ({ formik, t }) => {
  return (
    <div className="post-inputs editor-container">
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
