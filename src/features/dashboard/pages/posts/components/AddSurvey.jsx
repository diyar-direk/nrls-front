import { useCallback, useState } from "react";
import Button from "../../../../../components/buttons/Button";
import IconButton from "../../../../../components/buttons/IconButton";
import Input from "../../../../../components/inputs/Input";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import { icons } from "../../../../../constant/icons";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../../utils/axios";
import endPoints from "../../../../../constant/endPoints";
import ConfirmPopUp from "../../../../../components/popup/ConfirmPopUp";

const AddSurvey = ({ formik, t }) => {
  const removeOption = useCallback(
    (i) => {
      const newOptions = [...formik.values.options];
      newOptions.splice(i, 1);
      formik.setFieldValue("options", newOptions);
    },
    [formik],
  );

  const [deletedInfo, setDeletedInfo] = useState(null);

  const mutate = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(
        `${endPoints.surveyOptions}${deletedInfo.id}/hard-delete/`,
      );
    },
    onSuccess: () => {
      removeOption(deletedInfo.index);
      setDeletedInfo(null);
    },
  });

  return (
    <>
      <div className="post-inputs">
        <Input
          name="question"
          value={formik.values.question}
          onChange={formik.handleChange}
          errorText={t(formik.errors.question)}
          label={t("question")}
          placeholder="enter question text"
          elementType="textarea"
          rows={2}
        />

        <Input
          name="closes_at"
          value={formik.values.closes_at}
          onChange={formik.handleChange}
          errorText={t(formik.errors.closes_at)}
          label={t("closes_at")}
          type="date"
        />

        <SelectOptionInput
          onSelectOption={(e) => formik.setFieldValue("is_active", e.value)}
          placeholder={formik?.values?.is_active ? "active" : "inactive"}
          errorText={formik.errors?.is_active}
          label="is_active"
          notRequired
          options={[
            { text: "active", value: true },
            { text: "inactive", value: false },
          ]}
        />

        {formik.values.options.map((opt, index) => (
          <div key={index} className="add-survey-container">
            <Input
              name={`options[${index}].option_text`}
              value={opt.option_text}
              onChange={formik.handleChange}
              placeholder={`Option ${index + 1}`}
              label={`Option ${index + 1}`}
              errorText={formik.errors?.options?.[index]?.option_text}
              elementType="textarea"
              rows={3}
            />
            {opt.id && <p className="survey-count">{opt.vote_count} vote </p>}
            <IconButton
              icon={icons.delete}
              color="delete"
              styleType="transparent"
              type="button"
              onClick={() =>
                opt.id
                  ? setDeletedInfo({ id: opt.id, index })
                  : removeOption(index)
              }
              title="delete option"
            />
          </div>
        ))}

        <div className="w-100">
          {typeof formik.errors?.options === "string" && (
            <p className="field-error">{formik.errors?.options}</p>
          )}
          <Button
            type="button"
            onClick={() =>
              formik.setFieldValue("options", [
                ...formik.values.options,
                { option_text: "" },
              ])
            }
          >
            Add Option
          </Button>
        </div>
      </div>

      <ConfirmPopUp
        isOpen={deletedInfo}
        onClose={() => setDeletedInfo(null)}
        onConfirm={mutate.mutate}
      />
    </>
  );
};

export default AddSurvey;
