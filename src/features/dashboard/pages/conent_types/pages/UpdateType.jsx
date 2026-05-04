import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import APIClient from "../../../../../utils/ApiClient";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../../../components/breadcrumbs/Breadcrumbs";
import Input from "../../../../../components/inputs/Input";
import Button from "../../../../../components/buttons/Button";
import Skeleton from "../../../../../components/skeleton/Skeleton";
import HandleError from "../../../../../components/error/HandleError";
import { contentTypeSchema } from "./../../../../../schema/conentType";

const api = new APIClient(endPoints.contentType);

const UpdateType = () => {
  const { id } = useParams();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [endPoints.contentType, id],
    queryFn: () => api.getOne(id),
  });

  const formik = useFormik({
    initialValues: {
      name_ar: data?.name_ar || "",
      name_ku: data?.name_ku || "",
      name_en: data?.name_en || "",
      priority: data?.priority || "",
    },
    validationSchema: contentTypeSchema,
    onSubmit: (d) => handleConfirm.mutate(d),
    enableReinitialize: true,
  });

  const query = useQueryClient();
  const nav = useNavigate();

  const handleConfirm = useMutation({
    mutationFn: (data) => api.updateData({ data, id }),
    onSuccess: () => {
      query.invalidateQueries([endPoints.contentType]);
      nav(-1);
    },
  });

  const { t } = useTranslation();

  if (isLoading) return <Skeleton height="300px" />;

  if (error) return <HandleError error={error} refetch={refetch} />;

  return (
    <>
      <Breadcrumbs
        replace={[{ from: id, text: data?.name_en, fullTextReplace: true }]}
      />

      <form className="dashboard-form" onSubmit={formik.handleSubmit}>
        <div className="inputs-area">
          <Input
            name="name_ar"
            value={formik.values.name_ar}
            onChange={formik.handleChange}
            errorText={t(formik.errors.name_ar)}
            label={t("tags.name_ar")}
          />
          <Input
            name="name_en"
            value={formik.values.name_en}
            onChange={formik.handleChange}
            errorText={t(formik.errors.name_en)}
            label={t("tags.name_en")}
          />
          <Input
            name="name_ku"
            value={formik.values.name_ku}
            onChange={formik.handleChange}
            errorText={t(formik.errors.name_ku)}
            label={t("tags.name_ku")}
          />
          <Input
            name="priority"
            value={formik.values.priority}
            onChange={formik.handleChange}
            errorText={t(formik.errors.priority)}
            label={t("content_types.priority")}
            type="number"
          />
        </div>
        <Button type="submit"> {t("common.save")} </Button>
      </form>
    </>
  );
};

export default UpdateType;
