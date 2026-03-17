import { memo, useCallback, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const TableHeader = ({
  selectable,
  setSelectedItems,
  selectedItems,
  column,
  setSort,
  data,
  notSelectIf,
}) => {
  const updateSortStatus = useCallback(
    (column, e) => {
      setSort((prev) => {
        const prevStatus = prev[column.name]?.startsWith("-");
        e.target.parentElement.className = prevStatus ? "a-z" : "z-a";
        return {
          [column.name]: `${prevStatus ? "" : "-"}${column.name}`,
        };
      });
    },
    [setSort],
  );

  const isAllSelected = useMemo(
    () => selectedItems?.size === data?.length && data?.length !== 0,
    [selectedItems, data],
  );

  const { user } = useAuth();
  const role = user?.role;
  const { t } = useTranslation();

  const selectAll = useCallback(() => {
    if (!data) return;

    setSelectedItems((prev) => {
      let allIds = [];

      if (notSelectIf)
        allIds = data
          .filter((item) => !notSelectIf(item))
          .map((item) => item?.id);
      else allIds = data.map((item) => item?.id);

      if (prev.size === allIds.length) {
        return new Set();
      }

      return new Set(allIds);
    });
  }, [data, setSelectedItems, notSelectIf]);

  return (
    <thead>
      <tr>
        {selectable && (
          <th>
            <div
              className={`${isAllSelected ? "active" : ""} checkbox select-all`}
              onClick={selectAll}
            />
          </th>
        )}

        {column?.map((th) => {
          if (th.hidden) return;

          const { allowedTo, headerName, sort } = th;

          if (!allowedTo || allowedTo?.includes(role))
            return (
              <th key={headerName}>
                {t(headerName)}
                {sort && (
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="sort"
                    onClick={(e) => updateSortStatus(th, e)}
                  />
                )}
              </th>
            );
        })}
      </tr>
    </thead>
  );
};

export default memo(TableHeader);
