import { useMemo, useState } from "react";
import dateFormatter from "./../../../../../utils/dateFormatter";
import { useDashboardContext } from "../../../../../context/DashboardContext";
import { useFetchData } from "./../../../../../hooks/useFetchData";
import endPoints from "../../../../../constant/endPoints";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "./../../../../../components/breadcrumbs/Breadcrumbs";
import TableToolBar from "./../../../../../components/table_toolbar/TableToolBar";
import Table from "../../../../../components/table/Table";
import CreateBackup from "../components/CreateBackup";
import "../style/style.css";
import Button from "../../../../../components/buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Restore from "../components/Restore";
import Replace from "../components/Replace";
import { icons } from "../../../../../constant/icons";
import Delete from "../components/Delete";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../../utils/axios";
import UploadBackup from "../components/UploadBackup";
import { enqueueSnackbar } from "notistack";

const Backups = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [replace, setReplace] = useState(null);
  const [restore, setRestore] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const { page_size } = useDashboardContext();

  const { data, isLoading, error, refetch } = useFetchData({
    endPoints: endPoints.backup,
    page,
    page_size,
    ordering: sort,
  });

  const { t } = useTranslation();

  const handleDownload = useMutation({
    mutationFn: async (name) => {
      const { data } = await axiosInstance.get(
        `${endPoints.backup}download/${name}/`,
        {
          responseType: "blob",
        },
      );

      return { data, name };
    },

    onMutate: () =>
      enqueueSnackbar({
        message: t("backup.download_started"),
        variant: "info",
      }),

    onSuccess: ({ data, name }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", name);
      document.body.appendChild(link);

      link.click();
      link.remove();

      enqueueSnackbar({
        message: "Downloaded successfully",
        variant: "success",
      });
    },
  });

  const column = useMemo(
    () => [
      {
        name: "filename",
        headerName: t("backups.filename"),
        sort: true,
      },
      {
        name: "file_path",
        headerName: t("backups.file_path")
      },
      {
        name: "type",
        headerName: t("backups.type"),
      },
      {
        name: "size",
        headerName: t("backups.size"),
        sort: true,
      },
      {
        name: "created_at",
        headerName: t("backups.created_at"),
        sort: true,
        getCell: ({ row }) => dateFormatter(row.created_at, "fullDate"),
      },
      {
        name: "actions",
        headerName: t("backups.actions"),
        getCell: ({ row }) => (
          <div className="center gap-10">
            <Button
              btnStyleType="transparent"
              btnType="delete"
              onClick={() => setSelectedFile(row.filename)}
            >
              <FontAwesomeIcon icon={icons.delete} />
            </Button>

            <Button
              btnStyleType="transparent"
              btnType="save"
              onClick={() => handleDownload.mutate(row.filename)}
            >
              <FontAwesomeIcon icon={faDownload} />
            </Button>
          </div>
        ),
      },
      {
        name: "backup actions",
        headerName: t("backups.backup_actions"),
        getCell: ({ row }) => (
          <div className="center gap-10">
            <Button
              btnStyleType="transparent"
              btnType="update"
              onClick={() => setReplace(row)}
            >
              <FontAwesomeIcon icon={icons.replaceBackup} />
              {t("backups.replace")}
            </Button>
            <Button
              btnStyleType="transparent"
              btnType="save"
              onClick={() => setRestore(row)}
            >
              <FontAwesomeIcon icon={icons.restoreBackup} />
              {t("backups.restore")}
            </Button>
          </div>
        ),
      },
    ],
    [handleDownload],
  );

  return (
    <>
      <Breadcrumbs />

      <div className="table-container">
        <TableToolBar title={t("pages.backup")}>
          <CreateBackup />
          <UploadBackup />
        </TableToolBar>
        <Table
          colmuns={column}
          currentPage={page}
          data={data?.data}
          dataLength={data?.totalCount}
          loading={isLoading}
          setPage={setPage}
          setSort={setSort}
          error={error}
          onRefetch={refetch}
          sortBy={sort}
        />
      </div>
      {restore && <Restore restore={restore} setRestore={setRestore} />}
      {replace && <Replace replace={replace} setReplace={setReplace} />}
      {selectedFile && (
        <Delete file={selectedFile} setSelectedFile={setSelectedFile} />
      )}
    </>
  );
};

export default Backups;
