import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { Link } from "react-router";

const CardBody = ({ isDraft, data, authorPage, language, t }) => {
  const background = useMemo(() => {
    const type = data?.content_type?.toLowerCase();
    return `color-mix(in oklab,var(--color-${type}) 90%,transparent)`;
  }, [data?.content_type]);

  return (
    <div className="card-body">
      <div className="category">
        <button
          style={{
            background,
            color: `white`,
          }}>
          {t(`content_types.${data?.content_type}`)}
        </button>
        <button>
          {data?.category?.[`name_${language}`] || data?.category_name}
        </button>
      </div>

      <h3>{data?.title}</h3>

      {data?.excerpt && <p className="two-line-ellipsis">{data?.excerpt}</p>}

      <div className="icons">
        <span className="icon">
          <FontAwesomeIcon icon={faEye} />
          {data?.view_count || 0}
        </span>

        {data?.author && (
          <Link
            className="icon link-hover"
            to={!isDraft && authorPage(data?.author?.id)}
            onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon icon={faUser} />
            {data?.author?.full_name}
          </Link>
        )}
      </div>
    </div>
  );
};

export default CardBody;
