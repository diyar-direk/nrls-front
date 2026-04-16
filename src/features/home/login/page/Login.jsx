import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../../../../components/inputs/Input";
import "../style/style.css";
import Button from "../../../../components/buttons/Button";
import axiosInstance from "../../../../utils/axios";
import endPoints from "./../../../../constant/endPoints";
import { useNavigate } from "react-router";
import { dashboardRouts } from "../../../../constant/pageRoutes";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const Login = () => {
  const nav = useNavigate();

  const query = useQueryClient();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: yup.object({
      username: yup.string().required(t("validation.required")),
      password: yup.string().required(t("validation.required")),
    }),
    onSubmit: async (v) => {
      await axiosInstance.post(endPoints.login, v);
      query.invalidateQueries([endPoints.me]);
      nav(dashboardRouts.user.page);
    },
  });
  return (
    <section
      className="container main-section center"
      style={{ height: "70vh" }}>
      <form onSubmit={formik.handleSubmit} className="login-form">
        <h1>{t("user.login")}</h1>

        <Input
          name="username"
          label={t("user.username")}
          placeholder={t("user.placeholders.username")}
          onChange={formik.handleChange}
          errorText={t(formik.errors.username)}
          value={formik.values.username}
        />
        <Input
          name="password"
          label={t("user.password")}
          placeholder={t("user.placeholders.password")}
          onChange={formik.handleChange}
          errorText={t(formik.errors.password)}
          value={formik.values.password}
          type="password"
        />
        <Button type="submit">{t("user.login")}</Button>
      </form>
    </section>
  );
};

export default Login;
