import { useState } from "react";
import dateFormatter from "./../../../../../utils/dateFormatter";
import { useDashboardContext } from "../../../../../context/DashboardContext";
import { useAuth } from "../../../../../context/AuthContext";
import { useFetchData } from "./../../../../../hooks/useFetchData";
import endPoints from "../../../../../constant/endPoints";
import { formatInputsData } from "./../../../../../utils/formatInputsData";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "./../../../../../components/breadcrumbs/Breadcrumbs";
import TableToolBar from "./../../../../../components/table_toolbar/TableToolBar";
import Search from "./../../../../../components/table_toolbar/Search";
import Delete from "./../../../../../components/table_toolbar/Delete";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import Add from "./../../../../../components/table_toolbar/Add";
import Table from "../../../../../components/table/Table";
import { colors } from "../../../../../constant/colors";
import UsersFilter from "../components/UsersFilter";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../constant/icons";
import Button from "../../../../../components/buttons/Button";

const column = [
  {
    name: "username",
    headerName: "user.username",
    getCell: ({ row, user, t }) => (
      <div className="center gap-10">
        {row.username}
        {user?.id === row.id && <p>( {t("user.me")} )</p>}
      </div>
    ),
    sort: true,
  },
  {
    name: "role",
    headerName: "user.role",
    getCell: ({ row, t }) => (
      <div className="gap-10 center enum-style">{t(row.role)}</div>
    ),
  },
  {
    name: "full_name",
    headerName: "user.full_name",
    sort: true,
  },
  {
    name: "is_active",
    headerName: "user.is_active",
    getCell: ({ row }) => (
      <div
        className="gap-10 center enum-style"
        style={{
          color: colors[row.is_active ? "green" : "red"].color,
          backgroundColor: colors[row.is_active ? "green" : "red"].bg,
        }}
      >
        {row.is_active ? "yes" : "no"}
      </div>
    ),
  },
  {
    name: "email",
    headerName: "user.email",
    hidden: true,
  },
  {
    name: "created_by_username",
    headerName: "created_by",
    getCell: ({ row }) => row.created_by_username,
  },
  {
    name: "created_at",
    headerName: "created_at",
    sort: true,
    getCell: ({ row }) => dateFormatter(row.created_at, "fullDate"),
  },
  {
    name: "actions",
    headerName: "actions",
    getCell: ({ row }) => (
      <div className="center">
        <Link to={dashboardRouts.user.update(row.id)}>
          <Button btnStyleType="transparent">
            <FontAwesomeIcon icon={icons.update} />
          </Button>
        </Link>
      </div>
    ),
  },
];

const AllUsers = () => {
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilters] = useState({});
  const { page_size } = useDashboardContext();

  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useFetchData({
    endPoints: endPoints.users,
    page,
    page_size,
    order: sort,
    search,
    ...formatInputsData(filter),
  });

  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs />

      <div className="table-container">
        <TableToolBar title={t("pages.users")}>
          <Search setSearch={setSearch} />
          <Delete
            data={data?.data}
            endPoint={`${endPoints.users}bulk-deleted/`}
            selectedItems={selectedItems}
            setPage={setPage}
            setSelectedItems={setSelectedItems}
          />
          <Add path={dashboardRouts.user.add} />
          <UsersFilter filters={filter} setFilters={setFilters} />
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
          notSelectIf={(row) => row?.id === user?.id}
          addBtnProps={{ to: dashboardRouts.user.add }}
        />
      </div>
    </>
  );
};

export default AllUsers;
