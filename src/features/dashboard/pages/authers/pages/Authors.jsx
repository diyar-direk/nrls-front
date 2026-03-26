import { useState } from "react";
import dateFormatter from "../../../../../utils/dateFormatter";
import { useDashboardContext } from "../../../../../context/DashboardContext";
import { useFetchData } from "../../../../../hooks/useFetchData";
import endPoints from "../../../../../constant/endPoints";
import { formatInputsData } from "../../../../../utils/formatInputsData";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../../../components/breadcrumbs/Breadcrumbs";
import TableToolBar from "../../../../../components/table_toolbar/TableToolBar";
import Search from "../../../../../components/table_toolbar/Search";
import Delete from "../../../../../components/table_toolbar/Delete";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import Add from "../../../../../components/table_toolbar/Add";
import Table from "../../../../../components/table/Table";
import AuthorFilter from "../components/AuthorFilter";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../constant/icons";
import Button from "../../../../../components/buttons/Button";
import "../style/style.css";
import imgServerSrc from "./../../../../../utils/imgServerSrc";

const column = [
  {
    name: "profile_image",
    headerName: "profile_image",
    getCell: ({ row }) => (
      <Link className="center" to={dashboardRouts.author.view(row.id)}>
        {row.profile_image ? (
          <img
            src={imgServerSrc(row.profile_image)}
            alt=""
            className="author-profile-tabel"
          />
        ) : (
          <p className="author-profile-tabel"> {row.full_name?.[0]} </p>
        )}
      </Link>
    ),
  },
  {
    name: "full_name",
    headerName: "full_name",
    sort: true,
    getCell: ({ row }) => (
      <Link className="link-hover" to={dashboardRouts.author.view(row.id)}>
        {row.full_name}
      </Link>
    ),
  },
  {
    name: "email",
    headerName: "email",
    hidden: true,
  },
  {
    name: "bio",
    headerName: "bio",
    hidden: true,
  },
  {
    name: "slug",
    headerName: "slug",
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
      <div className="center gap-10">
        <Link to={dashboardRouts.author.update(row.id)}>
          <Button btnStyleType="transparent">
            <FontAwesomeIcon icon={icons.update} />
          </Button>
        </Link>
        <Link to={dashboardRouts.author.view(row.id)}>
          <Button btnStyleType="transparent" btnType="save">
            <FontAwesomeIcon icon={icons.view} />
          </Button>
        </Link>
      </div>
    ),
  },
];

const Authors = () => {
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilters] = useState({});
  const { page_size } = useDashboardContext();

  const { data, isLoading, error, refetch } = useFetchData({
    endPoints: endPoints.authors,
    page,
    page_size,
    ordering: sort,
    search,
    ...formatInputsData(filter),
  });

  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs />

      <div className="table-container">
        <TableToolBar title={t("pages.authors")}>
          <Search setSearch={setSearch} />
          <Delete
            data={data?.data}
            endPoint={`${endPoints.authors}bulk-deleted/`}
            selectedItems={selectedItems}
            setPage={setPage}
            setSelectedItems={setSelectedItems}
          />
          <Add path={dashboardRouts.author.add} />
          <AuthorFilter filters={filter} setFilters={setFilters} />
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
          addBtnProps={{ to: dashboardRouts.author.add }}
          sortBy={sort}
        />
      </div>
    </>
  );
};

export default Authors;
