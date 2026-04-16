import { useMemo, useState } from "react";
import dateFormatter from "../../../../../utils/dateFormatter";
import { useDashboardContext } from "../../../../../context/DashboardContext";
import { useFetchData } from "../../../../../hooks/useFetchData";
import endPoints from "../../../../../constant/endPoints";
import { formatInputsData } from "../../../../../utils/formatInputsData";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../../../components/breadcrumbs/Breadcrumbs";
import TableToolBar from "../../../../../components/table_toolbar/TableToolBar";
import Delete from "../../../../../components/table_toolbar/Delete";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import Add from "../../../../../components/table_toolbar/Add";
import Table from "../../../../../components/table/Table";
import EventsFilter from "../components/EventsFilter";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../constant/icons";
import Button from "../../../../../components/buttons/Button";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../../utils/axios";

const AllEvents = () => {
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [sort, setSort] = useState({});
  const [filter, setFilters] = useState({});
  const { page_size } = useDashboardContext();

  const { data, isLoading, error, refetch } = useFetchData({
    endPoints: endPoints.events,
    page,
    page_size,
    ordering: sort,
    ...formatInputsData(filter),
  });

  const query = useQueryClient();

  const handleCountAction = useMutation({
    mutationFn: async ({ url, id }) =>
      await axiosInstance.post(`${endPoints.events}${url}/${id}/`),
    onSuccess: () => query.invalidateQueries([endPoints.events]),
  });

  const column = useMemo(
    () => [
      {
        name: "post",
        headerName: "pages.posts",
        getCell: ({ row }) => (
          <Link to={dashboardRouts.post.view(row.post)} className="link-hover">
            {row.post_title}
          </Link>
        ),
      },
      {
        name: "event_type",
        headerName: "events.event_type",
        getCell: ({ row, t }) => `${t(`events.types.${row.event_type}`)}`,
      },
      {
        name: "event_date",
        headerName: "events.event_date",
        sort: true,
        getCell: ({ row }) => dateFormatter(row.event_date),
      },
      {
        name: "location",
        headerName: "events.location",
      },
      {
        name: "attendees_count",
        headerName: "events.attendees_count",
        sort: true,
      },
      {
        name: "created_at",
        headerName: "common.created_at",
        sort: true,
        getCell: ({ row }) => dateFormatter(row.created_at, "fullDate"),
      },
      {
        name: "count",
        headerName: "common.count",
        getCell: ({ row }) => (
          <div className="center gap-10">
            <Button
              btnStyleType="transparent"
              btnType="save"
              onClick={() =>
                handleCountAction.mutate({
                  id: row.id,
                  url: "increment-attendees",
                })
              }>
              <FontAwesomeIcon icon={faPlus} />
            </Button>

            <Button
              btnStyleType="transparent"
              btnType="delete"
              onClick={() =>
                handleCountAction.mutate({
                  id: row.id,
                  url: "decrement-attendees",
                })
              }>
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          </div>
        ),
      },

      {
        name: "actions",
        headerName: "common.actions",
        getCell: ({ row }) => (
          <div className="center">
            <Link to={dashboardRouts.events.update(row.id)}>
              <Button btnStyleType="transparent">
                <FontAwesomeIcon icon={icons.update} />
              </Button>
            </Link>
          </div>
        ),
      },
    ],
    [handleCountAction],
  );

  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs />

      <div className="table-container">
        <TableToolBar title={t("pages.events")}>
          <Delete
            data={data?.data}
            endPoint={`${endPoints.events}bulk-hard-delete/`}
            selectedItems={selectedItems}
            setPage={setPage}
            setSelectedItems={setSelectedItems}
          />
          <Add path={dashboardRouts.events.add} />
          <EventsFilter filters={filter} setFilters={setFilters} t={t} />
        </TableToolBar>
        <Table
          colmuns={column}
          currentPage={page}
          data={data?.data}
          dataLength={data?.totalCount}
          loading={isLoading}
          selectedItems={selectedItems}
          setPage={setPage}
          setSelectedItems={setSelectedItems}
          setSort={setSort}
          selectable
          error={error}
          onRefetch={refetch}
          addBtnProps={{ to: dashboardRouts.events.add }}
          sortBy={sort}
        />
      </div>
    </>
  );
};

export default AllEvents;
