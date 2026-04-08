import { useLocation, useNavigate, useParams } from "react-router";
import Breadcrumbs from "../../../../../components/breadcrumbs/Breadcrumbs";
import AddSurvey from "../components/AddSurvey";
import Button from "../../../../../components/buttons/Button";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { surveySchema } from "../../../../../schema/survey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../../utils/axios";
import endPoints from "../../../../../constant/endPoints";
import APIClient from "../../../../../utils/ApiClient";
import "../style/style.css";
import dateFormatter from "./../../../../../utils/dateFormatter";

const api = new APIClient(endPoints.surveys);

const UpdateSurveyPage = () => {
  const { post, id } = useParams();
  const { state } = useLocation();

  const { data, options } = state || {};

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      question: data?.question || "",
      is_active: data?.is_active,
      closes_at: dateFormatter(data?.closes_at),
      options: options?.length > 0 ? options : [{ option_text: "" }],
      post,
    },
    validationSchema: surveySchema,
    onSubmit: (v) => handleAddSurvey.mutate(v),
    enableReinitialize: true,
  });

  const query = useQueryClient();

  const nav = useNavigate();

  const handleAddSurvey = useMutation({
    mutationFn: (data) => api.updateData({ data, id }),
    onSuccess: () => {
      formik.values.options.map(async (e) =>
        e.id
          ? await axiosInstance.patch(`${endPoints.surveyOptions}${e.id}/`, e)
          : await axiosInstance.post(endPoints.surveyOptions, {
              ...e,
              survey: id,
            }),
      );
      query.invalidateQueries([endPoints.surveyPost]);
      nav(-1);
    },
  });

  return (
    <>
      <Breadcrumbs
        replace={[
          { text: data?.post_title, from: post },
          { from: id, text: data?.question },
        ]}
      />
      <form className="dashboard-form" onSubmit={formik.handleSubmit}>
        <AddSurvey formik={formik} t={t} />
        <Button type="submit"> save </Button>
      </form>
    </>
  );
};

export default UpdateSurveyPage;
