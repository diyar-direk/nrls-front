import { useLocation, useNavigate, useParams } from "react-router";
import "../style/survey.css";
import "../style/style.css";
import Breadcrumbs from "../../../../../components/breadcrumbs/Breadcrumbs";
import { useTranslation } from "react-i18next";
import AddSurvey from "../components/AddSurvey";
import { useFormik } from "formik";
import { surveySchema } from "../../../../../schema/survey";
import Button from "../../../../../components/buttons/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import axiosInstance from "../../../../../utils/axios";
import APIClient from "../../../../../utils/ApiClient";

const api = new APIClient(endPoints.surveys);

const AddSurveyPage = () => {
  const { state } = useLocation();
  const { post } = useParams();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      question: "",
      is_active: true,
      closes_at: "",
      options: [{ option_text: "" }],
      post,
    },
    validationSchema: surveySchema,
    onSubmit: (v) => handleAddSurvey.mutate(v),
  });

  const query = useQueryClient();

  const nav = useNavigate();

  const handleAddSurvey = useMutation({
    mutationFn: async (d) => api.addData(d),
    onSuccess: (data) => {
      const { id: survey } = data;
      formik.values.options.map(
        async (e) =>
          await axiosInstance.post(endPoints.surveyOptions, {
            ...e,
            survey,
          }),
      );
      query.invalidateQueries([endPoints.surveyPost]);
      nav(-1);
    },
  });

  return (
    <>
      <Breadcrumbs replace={[{ text: state?.title, from: post }]} />
      <form className="dashboard-form" onSubmit={formik.handleSubmit}>
        <AddSurvey formik={formik} t={t} />
        <Button type="submit"> save </Button>
      </form>
    </>
  );
};

export default AddSurveyPage;
