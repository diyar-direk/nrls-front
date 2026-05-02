import { useCallback } from "react";
import { homeRoutes } from "../../constant/pageRoutes";
import { NavLink, useNavigate } from "react-router";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NestedMenu = ({ nestedClick, data, lang }) => {
  const nav = useNavigate();

  const handleNavigate = useCallback(() => {
    nav(homeRoutes.posts.page(data?.name_en), {
      state: { content_type: data },
    });
  }, [nav, data]);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      nestedClick();
    },
    [nestedClick],
  );

  return (
    <div className="link" onClick={handleNavigate}>
      <div>
        {data?.[`name_${lang}`]} <FontAwesomeIcon icon={faChevronDown} />
      </div>
      <article>
        {data?.categories_list?.map((t) => (
          <NavLink
            key={t.id}
            onClick={handleClick}
            to={t.name_en}
            state={{ category: t }}
          >
            {t?.[`name_${lang}`]}
          </NavLink>
        ))}
      </article>
    </div>
  );
};

export default NestedMenu;
