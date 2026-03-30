import { useCallback } from "react";
import ConfirmPopUp from "../../../../../components/popup/ConfirmPopUp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import axiosInstance from "../../../../../utils/axios";

const DeletePost = ({ setDeletedId, deletedId }) => {
  const handleClose = useCallback(() => setDeletedId(null), [setDeletedId]);

  const queryclient = useQueryClient();
  const handleDelete = useMutation({
    mutationFn: async (id) => {
      await axiosInstance.delete(`${endPoints.posts}${id}/hard-delete/`);
    },
    onSuccess: () => {
      setDeletedId(null);
      queryclient.invalidateQueries([endPoints.posts]);
    },
  });

  const handleConfirmDelete = useCallback(() => {
    handleDelete.mutate(deletedId);
  }, [handleDelete, deletedId]);

  return (
    <ConfirmPopUp
      isOpen={deletedId}
      onClose={handleClose}
      onConfirm={handleConfirmDelete}
    />
  );
};

export default DeletePost;
