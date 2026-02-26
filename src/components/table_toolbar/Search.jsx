import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../constants/icons";
import { useTranslation } from "react-i18next";

const Search = ({ delay = 500, setSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const [debouncedValue] = useDebounce(inputValue, delay);

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  const { t } = useTranslation();

  return (
    <label className="table-toolbar-search">
      <input
        type="text"
        placeholder={t("search")}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <FontAwesomeIcon icon={icons.search} />
    </label>
  );
};

export default Search;
