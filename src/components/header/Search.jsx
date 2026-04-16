import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../constant/icons";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { useInfiniteFetch } from "./../../hooks/useInfiniteFetch";
import endPoints from "./../../constant/endPoints";
import { Link, useNavigate } from "react-router";
import { homeRoutes } from "../../constant/pageRoutes";
import { postViewImg } from "./../../utils/postViewImg";
import { useTranslation } from "react-i18next";
const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [search] = useDebounce(inputValue, 500);

  const { data, isFetching, loadMoreRef } = useInfiniteFetch({
    endPoint: endPoints.posts,
    enabled: Boolean(search && inputValue),
    search,
    page_size: 3,
  });

  const results = useMemo(() => data?.pages?.flatMap((e) => e.data), [data]);
  const nav = useNavigate();

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      nav(`${homeRoutes.posts.page(inputValue)}?search=${inputValue}`);
      setInputValue("");
    },
    [nav, inputValue],
  );

  const { t } = useTranslation();
  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <label htmlFor="home-search">
          <input
            type="text"
            placeholder={t("header.search")}
            id="home-search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <button>
            <FontAwesomeIcon icon={icons.search} />
          </button>
        </label>
      </form>
      <section className="results">
        {inputValue &&
          results?.map((e) => (
            <Link
              to={homeRoutes.posts.view(e.content_type, e.id)}
              key={e.id}
              onClick={() => setInputValue("")}>
              <img src={postViewImg(e)} alt="" />
              <h5 className="one-line-ellipsis"> {e.title} </h5>
            </Link>
          ))}
        {inputValue && isFetching && (
          <div className="search-loading">
            <span></span>
          </div>
        )}
        <div ref={loadMoreRef} />
      </section>
    </div>
  );
};

export default Search;
