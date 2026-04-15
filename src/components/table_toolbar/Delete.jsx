import { useCallback, useState } from "react";
import ConfirmPopUp from "../popup/ConfirmPopUp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import IconButton from "./../buttons/IconButton";
import APIClient from "../../utils/ApiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { icons } from "../../constant/icons";

const Delete = ({
  setSelectedItems,
  queryKey,
  selectedItems,
  setPage,
  data,
  endPoint,
}) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handleDeletePopUpClose = useCallback(() => {
    setSelectedItems(new Set());
    setIsPopUpOpen(false);
  }, [setSelectedItems]);

  const queryclient = useQueryClient();
  const apiClient = new APIClient(endPoint);
  const handleDelete = useMutation({
    mutationFn: (ids) => apiClient.deleteAll({ ids }),
    onSuccess: () => {
      if (data?.length === selectedItems?.size) {
        setPage((prev) => Math.max(1, prev - 1));
      }
      setIsPopUpOpen(false);
      setSelectedItems(new Set());
      queryclient.invalidateQueries([queryKey || endPoint]);
    },
  });

  const handleConfirmDelete = useCallback(() => {
    handleDelete.mutate([...selectedItems]);
  }, [handleDelete, selectedItems]);

  const { t } = useTranslation();

  return (
    <>
      <IconButton
        color="secondry-color"
        title={t("common.delete")}
        disabled={!selectedItems?.size}
        onClick={() => selectedItems?.size && setIsPopUpOpen(true)}
      >
        <FontAwesomeIcon
          icon={icons.delete}
          style={{ color: selectedItems?.size ? "red" : "inherit" }}
        />
      </IconButton>
      <ConfirmPopUp
        isOpen={isPopUpOpen}
        onClose={handleDeletePopUpClose}
        onConfirm={handleConfirmDelete}
        confirmButtonProps={{ isSending: handleDelete.isLoading }}
      />
    </>
  );
};

export default Delete;
