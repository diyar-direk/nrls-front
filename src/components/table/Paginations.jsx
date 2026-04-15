import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Button from "../buttons/Button";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getVisiblePages = (currentPage, totalPages, maxVisibleNeighbors = 2) => {
  const pages = [];
  if (currentPage > 3 + maxVisibleNeighbors) {
    pages.push(1, 2, "...");
  } else {
    for (let i = 1; i < Math.min(3, totalPages + 1); i++) {
      pages.push(i);
    }
  }

  for (
    let i = Math.max(1, currentPage - maxVisibleNeighbors);
    i <= Math.min(totalPages, currentPage + maxVisibleNeighbors);
    i++
  ) {
    if (!pages.includes(i)) pages.push(i);
  }

  if (currentPage < totalPages - 4) {
    pages.push("...", totalPages - 1, totalPages);
  } else {
    for (let i = Math.max(totalPages - 3, 1); i <= totalPages; i++) {
      if (!pages.includes(i) && i > currentPage) pages.push(i);
    }
  }

  return pages;
};

const Paginations = ({
  currentPage,
  dataLength = 0,
  setPage,
  setSelectedItems,
  limit,
}) => {
  const pages = useMemo(() => {
    const pagesCount = Math.ceil(dataLength / limit);
    return getVisiblePages(currentPage, pagesCount);
  }, [dataLength, currentPage, limit]);
  const onPageChange = useCallback(
    (page) => {
      setPage(page);
      setSelectedItems(new Set());
    },
    [setPage, setSelectedItems],
  );

  const getNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
    setSelectedItems(new Set());
  }, [setPage, setSelectedItems]);
  const getPrevPage = useCallback(() => {
    setPage((prev) => prev - 1);
    setSelectedItems(new Set());
  }, [setPage, setSelectedItems]);

  const { t } = useTranslation();

  if (!currentPage) return;

  return (
    <footer className="pagination">
      <div className="page-container">
        {dataLength > 0 && (
          <Button
            disabled={currentPage === 1}
            onClick={getPrevPage}
            btnType="cancel"
            btnStyleType="outlined"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        )}
        {pages?.map((page) =>
          typeof page === "number" ? (
            <button
              disabled={currentPage === page}
              onClick={() => onPageChange(page)}
              className={currentPage === page ? "active" : ""}
              key={page}
            >
              {page}
            </button>
          ) : (
            <span key={page}> {page} </span>
          ),
        )}
        {dataLength > 0 && (
          <Button
            disabled={pages[pages?.length - 1] === currentPage}
            onClick={getNextPage}
            btnType="cancel"
            btnStyleType="outlined"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        )}
      </div>

      <p className="pages-visibile font-color">
        {`${(currentPage - 1) * limit + 1} - ${Math.min(
          currentPage * limit,
          dataLength,
        )}`}
      </p>

      {dataLength > 0 && (
        <h2 className="data-count">
          {t("table.data_count")} <span>{dataLength}</span>
        </h2>
      )}
    </footer>
  );
};

export default memo(Paginations);
