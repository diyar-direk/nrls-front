import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import APIClient from "../../../../../utils/ApiClient";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../../../components/breadcrumbs/Breadcrumbs";
import Input from "../../../../../components/inputs/Input";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../../components/buttons/Button";
import Skeleton from "./../../../../../components/skeleton/Skeleton";
import HandleError from "./../../../../../components/error/HandleError";
import { useAuth } from "../../../../../context/AuthContext";
import * as Yup from "yup";

const api = new APIClient(endPoints.users);

const UpdateUser = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [id, endPoints.users],
    queryFn: () => api.getOne(id),
  });

  const formik = useFormik({
    initialValues: {
      full_name: data?.full_name || "",
      email: data?.email || "",
      password: "",
      confirm_password: "",
      is_active: data?.is_active || false,
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .required("validation.required")
        .min(2, "validation.min_length")
        .max(20, "validation.max_length"),

      email: Yup.string()
        .required("validation.required")
        .email("validation.email"),

      password: Yup.string()
        .required("validation.required")
        .min(8, "validation.min_password")
        .max(100, "validation.max_password"),

      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "validation.password_match")
        .required("validation.required"),

      is_active: Yup.boolean().default(false),
    }),
    onSubmit: (d) => {
      if (!d.password) {
        delete d.password;
        delete d.confirm_password;
      }
      handleConfirm.mutate(d);
    },
    enableReinitialize: true,
  });
  const query = useQueryClient();
  const nav = useNavigate();

  const handleConfirm = useMutation({
    mutationFn: (data) => api.updateData({ data, id }),
    onSuccess: () => {
      query.invalidateQueries([endPoints.users]);
      nav(-1);
    },
  });

  const { t } = useTranslation();

  const { user } = useAuth();

  if (isLoading) return <Skeleton height="300px" />;

  if (error) return <HandleError error={error} refetch={refetch} />;

  return (
    <>
      <Breadcrumbs
        replace={[{ from: id, text: data?.username, fullTextReplace: true }]}
      />

      <form className="dashboard-form" onSubmit={formik.handleSubmit}>
        <div className="inputs-area">
          <Input
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            errorText={t(formik.errors.password)}
            label={t("user.password")}
            placeholder={t("user.placeholders.password")}
            type="password"
          />
          <Input
            name="confirm_password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            errorText={t(formik.errors.confirm_password)}
            label={t("user.password_conf")}
            placeholder={t("user.placeholders.password_conf")}
            type="password"
          />

          <Input
            name="full_name"
            value={formik.values.full_name}
            onChange={formik.handleChange}
            errorText={t(formik.errors.full_name)}
            label={t("user.full_name")}
            placeholder={t("user.placeholders.full_name")}
          />
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            errorText={t(formik.errors.email)}
            label={t("user.email")}
            placeholder={t("user.placeholders.email")}
          />

          <SelectOptionInput
            label={t("user.account_status")}
            placeholder={t(
              `user.${formik.values?.is_active ? "active" : "inactive"}`,
            )}
            options={[
              {
                text: t("user.active"),
                value: true,
                icon: faCheck,
              },
              { text: t("user.inactive"), value: false, icon: faXmark },
            ]}
            errorText={t(formik.errors.is_active)}
            onSelectOption={(e) => formik.setFieldValue("is_active", e.value)}
            notRequired
          />
        </div>
        <Button type="submit"> save </Button>
      </form>
    </>
  );
};

export default UpdateUser;
