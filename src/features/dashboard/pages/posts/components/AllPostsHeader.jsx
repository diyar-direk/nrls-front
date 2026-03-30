import {
  faArrowDownShortWide,
  faCheck,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../../../../components/buttons/IconButton";
import { useClickOutside } from "../../../../../hooks/useClickOutside";
import { useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../constant/icons";
import { Link } from "react-router";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
const postSortOptions = [
  {
    title: "latest",
    set: "-created_at",
    name: "created_at",
  },
  {
    title: "oldest",
    set: "created_at",
    name: "created_at",
  },
  {
    title: "most liked",
    set: "-view_count",
    name: "view_count",
  },
  {
    title: "least liked",
    set: "view_count",
    name: "view_count",
  },
];

const AllPostsHeader = ({ sort, setSort, toggleFilters }) => {
  const { isOpen, ref, toggleOpen } = useClickOutside();

  const handleSetSort = useCallback(
    (state) => {
      setSort(state);
      toggleOpen();
    },
    [toggleOpen, setSort],
  );

  const value = useMemo(() => Object.values(sort)?.[0], [sort]);

  return (
    <div className="icons" ref={ref}>
      <Link to={dashboardRouts.post.add}>
        <IconButton icon={icons.add} color="secondry-color" title="add" />
      </Link>

      <IconButton
        icon={faFilter}
        color="secondry-color"
        title="filters"
        onClick={toggleFilters}
      />
      <IconButton
        icon={faArrowDownShortWide}
        color="secondry-color"
        title="sort"
        onClick={toggleOpen}
      />

      {isOpen && (
        <div className="post-sort">
          {postSortOptions?.map((e) => (
            <h3
              key={e.set}
              className={`${value === e.set ? "active" : ""}`}
              onClick={() => handleSetSort({ [e.name]: e.set })}
            >
              {e.title}
              {value === e.set && <FontAwesomeIcon icon={faCheck} />}
            </h3>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPostsHeader;
