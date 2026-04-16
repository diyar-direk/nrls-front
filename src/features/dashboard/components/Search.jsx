import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useMemo, useState } from "react";
import { searchPages } from "../../../constant/pageRoutes";
import { icons } from "../../../constant/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const Search = () => {
  const [search, setSearch] = useState("");

  const { t } = useTranslation();

  const resluts = useMemo(() => {
    if (!search) return;

    return searchPages.filter(
      (e) =>
        t(e.title).includes(search) ||
        e.to.includes(search.replace(/\s+/, "_")),
    );
  }, [search, t]);

  const onNavigate = useCallback(() => setSearch(""), []);

  return (
    <div className="flex-1 search relative">
      <label>
        <input
          type="text"
          placeholder="search..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <FontAwesomeIcon icon={icons.search} />

        {search && (
          <div className="results">
            {resluts?.length === 0 ? (
              <h5> {t("no_matching")} </h5>
            ) : (
              resluts?.map((e) => (
                <Link to={e.to} key={e.to} onClick={onNavigate}>
                  {t(e.title)}
                </Link>
              ))
            )}
          </div>
        )}
      </label>
    </div>
  );
};
export default Search;
