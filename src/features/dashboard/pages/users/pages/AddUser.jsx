import { useMutation, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import APIClient from "../../../../../utils/ApiClient";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../../../components/breadcrumbs/Breadcrumbs";
import Input from "../../../../../components/inputs/Input";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { userSchema } from "../../../../../schema/users";
import Button from "../../../../../components/buttons/Button";

const api = new APIClient(endPoints.users);

const AddUser = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      is_active: false,
    },
    validationSchema: userSchema,
    onSubmit: (d) => handleConfirm.mutate(d),
  });
  const query = useQueryClient();
  const nav = useNavigate();

  const handleConfirm = useMutation({
    mutationFn: (d) => api.addData(d),
    onSuccess: () => {
      query.invalidateQueries([endPoints.users]);
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
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            errorText={t(formik.errors.username)}
            label={t("user.username")}
            placeholder={t("user.placeholders.username")}
          />
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
        <Button type="submit"> {t("user.save")} </Button>
      </form>
    </>
  );
};

export default AddUser;
