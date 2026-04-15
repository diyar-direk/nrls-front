import { useCallback, useMemo, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";
import { useInfiniteFetch } from "../../../../hooks/useInfiniteFetch";
import endPoints from "../../../../constant/endPoints";
import { formatInputsData } from "../../../../utils/formatInputsData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../constant/icons";
import { homeRoutes } from "../../../../constant/pageRoutes";
import PostCard from "../../../../components/post/PostCard";
import RepeatChildren from "../../../../components/RepeatChildren";
import Skeleton from "../../../../components/skeleton/Skeleton";
import AllPostsHeader from "./../components/AllPostsHeader";
import PostFilters from "../components/PostFilters";
import { useTranslation } from "react-i18next";
import "../style/style.css";
import Breadcrumbs from "./../../../../components/breadcrumbs/Breadcrumbs";
import { allTyps } from "../../../../constant/enums";

const AllPosts = () => {
  const { i18n } = useTranslation();

  const { name } = useParams();

  const language = useMemo(() => i18n.language, [i18n.language]);

  const { state } = useLocation();
  const {
    tags,
    content_type: type,
    category,
    content_type_multi,
  } = state || {};

  const content_type = useMemo(() => {
    if (type) return type;
    else if (!category && !tags && allTyps.includes(name)) return name;
  }, [type, category, tags, name]);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") ?? "";

  const [debouncedValue] = useDebounce(searchParam, 500);

  const [filters, setFilters] = useState({});

  const finalFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedValue,
      tags,
      content_type: content_type,
      category,
      content_type_multi,
    }),
    [filters, debouncedValue, tags, content_type, category, content_type_multi],
  );

  const [sort, setSort] = useState({ created_at: "-created_at" });

  const { data, isFetching, loadMoreRef } = useInfiniteFetch({
    endPoint: endPoints.posts,
    page_size: 5,
    ordering: sort,
    language,
    is_published: true,
    ...formatInputsData(finalFilters),
  });

  const results = useMemo(
    () => ({
      count: data?.pages?.[0]?.totalCount,
      posts: data?.pages?.flatMap((page) => page.data) || [],
    }),
    [data],
  );

  const [openFilters, setOpenFilters] = useState(false);

  const toggleFilters = useCallback(() => setOpenFilters((p) => !p), []);

  const handleSearch = useCallback(
    (e) => {
      const { value } = e.target;
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        value ? params.set("search", value) : params.delete("search");
        return params;
      });
    },
    [setSearchParams],
  );

  const { t } = useTranslation();

  return (
    <div
      style={
        filters?.content_type && {
          "--main-color": `var(--color-${filters?.content_type})`,
        }
      }
    >
      <Breadcrumbs replace={[{ from: name, text: t(name) }]} />
      <section className="main-section container">
        <h1 className="post-section-name">{t(name)}</h1>

        <div className="post-filters">
          <div className="post-search">
            <label htmlFor="search-inp" className="search-inp">
              <input
                type="text"
                id="search-inp"
                placeholder="search...."
                value={searchParam}
                onChange={handleSearch}
              />
              <FontAwesomeIcon icon={icons.search} />
            </label>
            <AllPostsHeader
              sort={sort}
              setSort={setSort}
              toggleFilters={toggleFilters}
            />
          </div>
          <h1 data-count={results?.count || 0}>results</h1>
        </div>

        <div className="posts-container">
          {results?.posts?.map((e) => (
            <PostCard
              key={e.id}
              data={e}
              authorPage={homeRoutes.author.view}
              postPage={(e) => homeRoutes.posts.view(e?.content_type, e.id)}
            />
          ))}
          {isFetching && (
            <RepeatChildren count={4}>
              <Skeleton height="100%" style={{ minHeight: "100px" }} />
            </RepeatChildren>
          )}
        </div>
        <div ref={loadMoreRef} />

        {openFilters && (
          <PostFilters
            onClose={toggleFilters}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </section>
    </div>
  );
};

export default AllPosts;
