import { useState } from "react";
import dateFormatter from "./../../../../../utils/dateFormatter";
import { useDashboardContext } from "../../../../../context/DashboardContext";
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
import TagsFilter from "../components/TagsFilter";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../constant/icons";
import Button from "../../../../../components/buttons/Button";

const column = [
  {
    name: "name_ar",
    headerName: "tags.name_ar",
    sort: true,
  },
  {
    name: "name_en",
    headerName: "tags.name_en",
    sort: true,
  },
  {
    name: "name_ku",
    headerName: "tags.name_ku",
    sort: true,
  },
  {
    name: "created_at",
    headerName: "common.created_at",
    sort: true,
    getCell: ({ row }) => dateFormatter(row.created_at, "fullDate"),
  },
  {
    name: "actions",
    headerName: "common.actions",
    getCell: ({ row }) => (
      <div className="center">
        <Link to={dashboardRouts.tag.update(row.id)}>
          <Button btnStyleType="transparent">
            <FontAwesomeIcon icon={icons.update} />
          </Button>
        </Link>
      </div>
    ),
  },
];

const AllTags = () => {
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilters] = useState({});
  const { page_size } = useDashboardContext();
  const { t } = useTranslation();

  const { data, isLoading, error, refetch } = useFetchData({
    endPoints: endPoints.tags,
    page,
    page_size,
    ordering: sort,
    search,
    ...formatInputsData(filter),
  });

  return (
    <>
      <Breadcrumbs />

      <div className="table-container">
        <TableToolBar title={t("pages.tags")}>
          <Search setSearch={setSearch} setPage={setPage} />
          <Delete
            data={data?.data}
            endPoint={`${endPoints.tags}bulk-hard-delete/`}
            selectedItems={selectedItems}
            setPage={setPage}
            setSelectedItems={setSelectedItems}
          />
          <Add path={dashboardRouts.tag.add} />
          <TagsFilter
            filters={filter}
            setFilters={setFilters}
            setPage={setPage}
          />
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
          addBtnProps={{ to: dashboardRouts.tag.add }}
          sortBy={sort}
        />
      </div>
    </>
  );
};

export default AllTags;
