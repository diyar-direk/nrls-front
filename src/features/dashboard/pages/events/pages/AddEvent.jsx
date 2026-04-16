import { useMutation, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import APIClient from "../../../../../utils/ApiClient";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../../../components/breadcrumbs/Breadcrumbs";
import Input from "../../../../../components/inputs/Input";
import Button from "../../../../../components/buttons/Button";
import { eventsSchema } from "./../../../../../schema/event";
import SelectInputApi from "../../../../../components/inputs/SelectInputApi";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import { eventType } from "../../../../../constant/enums";

const api = new APIClient(endPoints.events);

const AddEvent = () => {
  const { state } = useLocation();

  const formik = useFormik({
    initialValues: {
      post: state?.post || "",
      event_type: "",
      location: "",
      event_date: "",
      attendees_count: "",
    },
    validationSchema: eventsSchema,
    onSubmit: (d) => handleConfirm.mutate(d),
  });

  const query = useQueryClient();
  const nav = useNavigate();

  const handleConfirm = useMutation({
    mutationFn: (d) => api.addData({ ...d, post: d.post?.id }),
    onSuccess: () => {
      query.invalidateQueries([endPoints.events]);
      nav(-1);
    },
  });

  const { t } = useTranslation();

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

export default AddEvent;
