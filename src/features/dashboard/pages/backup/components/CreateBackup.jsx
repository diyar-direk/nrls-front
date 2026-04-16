import IconButton from "../../../../../components/buttons/IconButton";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import PopUp from "../../../../../components/popup/PopUp";
import Button from "../../../../../components/buttons/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../../utils/axios";
import endPoints from "../../../../../constant/endPoints";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const CreateBackup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      include_media: true,
      compress: false,
    },
    onSubmit: (v) => mutation.mutate(v),
  });
const {t} = useTranslation();
  const onClose = useCallback(() => setIsOpen(false), []);
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (d) =>
      await axiosInstance.post(`${endPoints.backup}create/`, d),
    onSuccess: () => {
      query.invalidateQueries([endPoints.backup]);
      onClose();
    },
  });

  return (
    <>
      <IconButton
        color="secondry-color"
        title={t("backups.create")}
        onClick={() => setIsOpen(true)}
        icon={faCloudUploadAlt}
      />

      <PopUp isOpen={isOpen} className="backup-popup" onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="include_media" className="backup-checkbox">
            <input
              type="checkbox"
              name="include_media"
              id="include_media"
              value={formik.values.include_media}
              checked={formik.values.include_media}
              onChange={formik.handleChange}
            />
            include_media
          </label>
          <label htmlFor="compress" className="backup-checkbox">
            <input
              type="checkbox"
              name="compress"
              id="compress"
              value={formik.values.compress}
              checked={formik.values.compress}
              onChange={formik.handleChange}
            />
            compress
          </label>

          <div className="btns">
            <Button type="submit"> create </Button>
            <Button
              btnStyleType="transparent"
              btnType="cancel"
              onClick={onClose}
            >
              cancel
            </Button>
          </div>
        </form>
      </PopUp>
    </>
  );
};

export default CreateBackup;
