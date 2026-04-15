import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../buttons/Button";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./../buttons/IconButton";

const CloumnsVisible = ({ columns, setColumns, defaultColumns, onRefetch }) => {
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  const updateRows = useCallback(
    (column) => {
      const updated = columns?.map((col) =>
        col.name === column.name ? { ...col, hidden: !col.hidden } : col,
      );
      setColumns(updated);
    },
    [columns, setColumns],
  );

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const bodyClick = () => setIsOpen(false);

    window.addEventListener("click", bodyClick);
    return () => window.removeEventListener("click", bodyClick);
  }, [isOpen]);

  const resetDefaultColumns = useCallback(() => {
    setIsOpen(false);
    setColumns(defaultColumns);
  }, [setColumns, defaultColumns]);
  const { t } = useTranslation();

  return (
    <div className="relative">
      <IconButton title="refetch" onClick={onRefetch}>
        <FontAwesomeIcon icon={faRotateRight} />
      </IconButton>

      <IconButton title="colomns" onClick={toggleOpen}>
        <FontAwesomeIcon icon={faEllipsis} />
      </IconButton>

      {isOpen && (
        <article
          onClick={(e) => e.stopPropagation()}
          className="columns-visible"
        >
          <input
            type="text"
            className="search"
            placeholder={t("table.filters.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          {columns?.map((column) => {
            const headerName = t(column.headerName);

            return (
              (!column.allowedTo || column.allowedTo?.includes(user?.role)) &&
              (!search ? (
                <label key={column.name} htmlFor={`column-${column.name}`}>
                  {headerName}
                  <input
                    type="checkbox"
                    id={`column-${column.name}`}
                    checked={!column.hidden}
                    onChange={() => updateRows(column)}
                  />
                </label>
              ) : (
                (column.name.includes(search) ||
                  headerName.includes(search)) && (
                  <label
                    key={column.name}
                    htmlFor={column.name}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {headerName}
                    <input
                      type="checkbox"
                      id={column.name}
                      checked={!column.hidden}
                      onChange={() => updateRows(column)}
                    />
                  </label>
                )
              ))
            );
          })}

          <Button btnStyleType="outlined" onClick={resetDefaultColumns}>
            <FontAwesomeIcon icon={faRotateRight} />
            {t("table.filters.reset")}
          </Button>
        </article>
      )}
    </div>
  );
};

export default CloumnsVisible;
