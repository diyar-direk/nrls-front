import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../../../../components/buttons/IconButton";
import { useCallback, useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../../utils/axios";
import endPoints from "../../../../../constant/endPoints";
import PopUp from "../../../../../components/popup/PopUp";
import UploadFile from "../../../../../components/inputs/UploadFile";
import Button from "../../../../../components/buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../constant/icons";
import ConfirmPopUp from "../../../../../components/popup/ConfirmPopUp";
import { useTranslation } from "react-i18next";

const UploadBackup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState(null);
const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      backup_file: null,
      confirmation: true,
    },
    onSubmit: (v) => mutation.mutate(v),
  });

  const onClose = useCallback(() => {
    setIsOpen(false);
    setAction(null);
    formik.resetForm();
  }, [formik]);

  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (d) => {
      const data = new FormData();
      data.append("backup_file", d.backup_file?.file);
      data.append("confirmation", d.confirmation);

      await axiosInstance.post(`${endPoints.backup}${action}`, data);
    },
    onSuccess: () => {
      query.clear();
      onClose();
    },
  });

  return (
    <>
      <IconButton
        icon={faFileExport}
        color="secondry-color"
        title={t("backups.create")}
        onClick={() => setIsOpen(true)}
      />

      <PopUp isOpen={isOpen} className="backup-popup" onClose={onClose}>
        <form onSubmit={(e) => e.preventDefault()}>
          <UploadFile
            name="backup_file"
            title="backup_file"
            value={formik.values.backup_file}
            onChange={(val) => formik.setFieldValue(`backup_file`, val)}
          />
          {formik.values.backup_file && (
            <div className="btns">
              <Button
                type="submit"
                btnStyleType="transparent"
                btnType="update"
                onClick={() => setAction("direct-replace/")}
              >
                <FontAwesomeIcon icon={icons.replaceBackup} />
                replace
              </Button>

              <Button
                btnStyleType="transparent"
                btnType="save"
                type="submit"
                onClick={() => setAction("direct-restore/")}
              >
                <FontAwesomeIcon icon={icons.restoreBackup} />
                restore
              </Button>

              <Button
                btnStyleType="transparent"
                btnType="cancel"
                onClick={onClose}
              >
                <FontAwesomeIcon icon={icons.close} />
                cancel
              </Button>
            </div>
          )}
        </form>
      </PopUp>

      <ConfirmPopUp
        isOpen={action}
        onClose={onClose}
        onConfirm={formik.handleSubmit}
      />
    </>
  );
};

export default UploadBackup;
