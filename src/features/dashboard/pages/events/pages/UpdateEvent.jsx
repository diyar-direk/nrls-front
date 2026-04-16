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
import SelectInputApi from "../../../../../components/inputs/SelectInputApi";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import { eventType } from "../../../../../constant/enums";
import { eventsSchema } from "../../../../../schema/event";
import dateFormatter from "../../../../../utils/dateFormatter";

const api = new APIClient(endPoints.events);

const UpdateEvent = () => {
  const { id } = useParams();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [endPoints.events, id],
    queryFn: () => api.getOne(id),
  });

  const formik = useFormik({
    initialValues: {
      post: data?.post ? { id: data?.post, title: data?.post_title } : "",
      event_type: data?.event_type || "",
      location: data?.location || "",
      event_date: data?.event_date ? dateFormatter(data?.event_date) : "",
      attendees_count: data?.attendees_count || "",
    },
    validationSchema: eventsSchema,
    onSubmit: (d) => handleConfirm.mutate({ ...d, post: d.post?.id }),
    enableReinitialize: true,
  });

  const query = useQueryClient();
  const nav = useNavigate();

  const handleConfirm = useMutation({
    mutationFn: (data) => api.updateData({ data, id }),
    onSuccess: () => {
      query.invalidateQueries([endPoints.events]);
      nav(-1);
    },
  });

  const { t } = useTranslation();

  if (isLoading) return <Skeleton height="300px" />;

  if (error) return <HandleError error={error} refetch={refetch} />;

  return (
    <>
      <Breadcrumbs />

      <form className="dashboard-form" onSubmit={formik.handleSubmit}>
        <div className="inputs-area">
          <SelectInputApi
            endPoint={endPoints.posts}
            onChange={(e) => formik.setFieldValue("post", e)}
            placeholder={
              formik.values.post?.title ||
              `${t("common.select")} ${t("pages.posts")}`
            }
            errorText={t(formik.errors.post)}
            label={t("pages.posts")}
            optionLabel={(e) => e?.title}
          />
          <SelectOptionInput
            label={t("events.event_type")}
            onSelectOption={(e) => formik.setFieldValue("event_type", e.value)}
            value={formik.values.event_type}
            options={eventType.map((e) => ({ text: e, value: e }))}
            errorText={t(formik.errors.event_type)}
          />
          <Input
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            errorText={t(formik.errors.location)}
            label={t("events.location")}
            placeholder={t("events.location_placeholder")}
            notRequired
          />
          <Input
            name="event_date"
            value={formik.values.event_date}
            onChange={formik.handleChange}
            errorText={t(formik.errors.event_date)}
            label={t("events.event_date")}
            type="date"
            notRequired
          />
          <Input
            name="attendees_count"
            value={formik.values.attendees_count}
            onChange={formik.handleChange}
            errorText={t(formik.errors.attendees_count)}
            label={t("events.attendees_count")}
            type="number"
            placeholder={"ex: 100"}
          />
        </div>
        <Button type="submit"> save </Button>
      </form>
    </>
  );
};

export default UpdateEvent;
