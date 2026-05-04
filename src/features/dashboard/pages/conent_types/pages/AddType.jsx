import { useMutation, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import APIClient from "../../../../../utils/ApiClient";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../../../components/breadcrumbs/Breadcrumbs";
import Input from "../../../../../components/inputs/Input";
import Button from "../../../../../components/buttons/Button";
import { contentTypeSchema } from "./../../../../../schema/conentType";

const api = new APIClient(endPoints.contentType);

const AddType = () => {
  const formik = useFormik({
    initialValues: {
      name_ar: "",
      name_ku: "",
      name_en: "",
      priority: "",
    },
    validationSchema: contentTypeSchema,
    onSubmit: (d) => handleConfirm.mutate(d),
  });

  const query = useQueryClient();
  const nav = useNavigate();

  const handleConfirm = useMutation({
    mutationFn: (d) => api.addData(d),
    onSuccess: () => {
      query.invalidateQueries([endPoints.contentType]);
      nav(-1);
    },
  });

  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs />

      <form className="dashboard-form" onSubmit={formik.handleSubmit}>
        <div className="inputs-area">
          <Input
            name="name_ar"
            value={formik.values.name_ar}
            onChange={formik.handleChange}
            errorText={t(formik.errors.name_ar)}
            label={t("tags.name_ar")}
            placeholder={t("tags.search_by_ar")}
          />
          <Input
            name="name_en"
            value={formik.values.name_en}
            onChange={formik.handleChange}
            errorText={t(formik.errors.name_en)}
            label={t("tags.name_en")}
            placeholder={t("tags.search_by_en")}
          />
          <Input
            name="name_ku"
            value={formik.values.name_ku}
            onChange={formik.handleChange}
            errorText={t(formik.errors.name_ku)}
            label={t("tags.name_ku")}
            placeholder={t("tags.search_by_ku")}
          />
          <Input
            name="priority"
            value={formik.values.priority}
            onChange={formik.handleChange}
            errorText={t(formik.errors.priority)}
            label={t("content_types.priority")}
            type="number"
            placeholder="ex: 10"
          />
        </div>
        <Button type="submit"> {t("common.save")} </Button>
      </form>
    </>
  );
};

export default AddType;
