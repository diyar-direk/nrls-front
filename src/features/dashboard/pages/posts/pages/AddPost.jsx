import { useMutation, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import APIClient from "../../../../../utils/ApiClient";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../../../components/breadcrumbs/Breadcrumbs";
import Input from "../../../../../components/inputs/Input";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import Button from "../../../../../components/buttons/Button";
import "../style/style.css";
import { authorSchema } from "./../../../../../schema/author";
import EditorSection from "./../components/EditorSection";
import { allTyps } from "../../../../../constant/enums";
import SelectInputApi from "./../../../../../components/inputs/SelectInputApi";
import { useMemo } from "react";
import InfoInputsSection from "./../components/InfoInputsSection";
import { languages } from "./../../../../../constant/languages";
import MoreInfoInputs from "./../components/MoreInfoInputs";

const api = new APIClient(endPoints.authors);

const AddPost = () => {
  const { t, i18n } = useTranslation();

  const language = useMemo(() => i18n.language, [i18n]);

  const formik = useFormik({
    initialValues: {
      title: "",
      excerpt: "",
      content: "",
      content_type: "",
      category_id: "",
      language,
      author_id: "",
      is_published: true,
    },
    validationSchema: authorSchema,
    onSubmit: (d) => {
      const form = new FormData();

      Object.entries(d).map(([key, value]) => {
        if (key !== "profile_image" && value) {
          form.append(key, value);
        }
      });

      if (d.profile_image?.file) {
        form.append("profile_image", d.profile_image.file);
      }

      handleConfirm.mutate(form);
    },
  });
  const query = useQueryClient();
  const nav = useNavigate();

  const handleConfirm = useMutation({
    mutationFn: (d) => api.addData(d),
    onSuccess: () => {
      query.invalidateQueries([endPoints.authors]);
      nav(-1);
    },
  });

  return (
    <>
      <Breadcrumbs />

      <nav className="post-tabs">
        <p className="active"> المحتوى والتنسيق </p>
        <p> بيانات الخبر </p>
        <p> مزيد من التفاصيل </p>
        <p> main info </p>
      </nav>

      <form className="dashboard-form" onSubmit={formik.handleSubmit}>
        <EditorSection formik={formik} t={t} />

        <InfoInputsSection formik={formik} language={language} t={t} />

        <MoreInfoInputs formik={formik} t={t} />

        <Button type="submit"> save </Button>
      </form>
    </>
  );
};

export default AddPost;
