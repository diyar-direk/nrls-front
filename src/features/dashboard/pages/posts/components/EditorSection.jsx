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
        onIgnore={() => formik.setFieldValue("original_post", null)}
        placeholder={
          formik.values.original_post?.title || t("common.select_original_post")
        }
        errorText={t(formik.errors.original_post)}
        label={t("common.original_post")}
        optionLabel={(e) => e?.title}
        notRequired
        value={formik.values?.original_post}
      />
      <Input
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        errorText={t(formik.errors.title)}
        label={t("common.title")}
        placeholder={t("common.title_placeholder")}
      />
      <Input
        name="excerpt"
        value={formik.values.excerpt}
        onChange={formik.handleChange}
        errorText={t(formik.errors.excerpt)}
        label={t("common.excerpt")}
        placeholder={t("common.excerpt_placeholder")}
        elementType="textarea"
        rows={4}
        notRequired
      />
      <div className="editor inp">
        <label>{t("posts.content")}</label>
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
