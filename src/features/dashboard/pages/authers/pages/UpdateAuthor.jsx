import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import APIClient from "../../../../../utils/ApiClient";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../../../components/breadcrumbs/Breadcrumbs";
import Input from "../../../../../components/inputs/Input";
import Button from "../../../../../components/buttons/Button";
import UploadPhoto from "../../../../../components/inputs/UploadPhoto";
import "../style/style.css";
import { authorSchema } from "../../../../../schema/author";
import Skeleton from "../../../../../components/skeleton/Skeleton";
import HandleError from "../../../../../components/error/HandleError";
import imgServerSrc from "../../../../../utils/imgServerSrc";

const api = new APIClient(endPoints.authors);

const UpdateAuthor = () => {
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [endPoints.authors, id],
    queryFn: () => api.getOne(id),
  });

  const formik = useFormik({
    initialValues: {
      full_name: data?.full_name || "",
      email: data?.email || "",
      bio: data?.bio || "",
      profile_image: "",
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
      } else delete d.profile_image;

      handleConfirm.mutate(form);
    },
    enableReinitialize: true,
  });

  const query = useQueryClient();
  const nav = useNavigate();

  const handleConfirm = useMutation({
    mutationFn: (data) => api.updateData({ data, id }),
    onSuccess: () => {
      query.invalidateQueries([endPoints.authors]);
      nav(-1);
    },
  });

  const { t } = useTranslation();

  if (isLoading)
    return (
      <>
        <Skeleton height="200px" width="50%" />
        <Skeleton height="250px" />
      </>
    );

  if (error) return <HandleError error={error} refetch={refetch} />;

  return (
    <>
      <Breadcrumbs replace={[{ from: id, text: data?.full_name,fullTextReplace:true }]} />

      <form className="dashboard-form" onSubmit={formik.handleSubmit}>
        <UploadPhoto
          name="profile_image"
          title={t("author.profile_image")}
          errorText={t(formik.errors?.profile_image)}
          notRequired
          value={formik.values.profile_image}
          onChange={(e) => formik.setFieldValue("profile_image", e)}
          className="author-profile-form"
          defaultImage={
            data?.profile_image && imgServerSrc(data?.profile_image)
          }
        />

        <div className="inputs-area">
          <Input
            name="full_name"
            value={formik.values.full_name}
            onChange={formik.handleChange}
            errorText={t(formik.errors.full_name)}
            label={t("author.full_name")}
            placeholder={t("author.full_name_placeholder")}
          />
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            errorText={t(formik.errors.email)}
            label={t("author.email")}
            placeholder={t("user.placeholders.email")}
          />

          <Input
            name="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            errorText={t(formik.errors.bio)}
            label={t("author.bio")}
            placeholder={t("author.bio_placeholder")}
            elementType="textarea"
            rows={5}
            notRequired
          />
        </div>
        <Button type="submit"> save </Button>
      </form>
    </>
  );
};

export default UpdateAuthor;
