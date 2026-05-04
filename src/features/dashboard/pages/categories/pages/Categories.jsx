import { useMemo, useState } from "react";
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
import CategoriesFilter from "../components/CategoriesFilter";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../constant/icons";
import Button from "../../../../../components/buttons/Button";

const Categories = () => {
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilters] = useState({});
  const { page_size } = useDashboardContext();

  const { data, isLoading, error, refetch } = useFetchData({
    endPoints: endPoints.categories,
    page,
    page_size,
    ordering: sort,
    search,
    ...formatInputsData(filter),
  });
  const { t, i18n } = useTranslation();

  const column = useMemo(
    () => [
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
        name: "content_type",
        headerName: "common.content_type",
        getCell: ({ row }) => row.content_type?.[`name_${i18n.language}`],
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
    ],
    [i18n.language],
  );

  return (
    <>
      <Breadcrumbs />

      <div className="table-container">
        <TableToolBar title={t("pages.categories")}>
          <Search setSearch={setSearch} setPage={setPage} />
          <Delete
            data={data?.data}
            endPoint={`${endPoints.categories}bulk-hard-delete/`}
            selectedItems={selectedItems}
            setPage={setPage}
            setSelectedItems={setSelectedItems}
          />
          <Add path={dashboardRouts.category.add} />
          <CategoriesFilter
            filters={filter}
            setFilters={setFilters}
            t={t}
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
          addBtnProps={{ to: dashboardRouts.category.add }}
          sortBy={sort}
        />
      </div>
    </>
  );
};

export default Categories;
