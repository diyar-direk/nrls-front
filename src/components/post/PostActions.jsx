import { Link } from "react-router";
import { icons } from "../../constant/icons";
import IconButton from "../buttons/IconButton";
import { dashboardRouts } from "../../constant/pageRoutes";
import { useCallback } from "react";

const PostActions = ({ data, showStatus, showActions, setDeletedId }) => {
  const handleSelectId = useCallback(
    (e) => {
      e.stopPropagation();
      setDeletedId(data?.id);
    },
    [data?.id, setDeletedId],
  );

  return (
    <div className="post-actions">
      {showActions && (
        <div className="action-icons">
          <Link
            to={dashboardRouts.post.update(data?.id)}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              icon={icons.update}
              styleType="transparent"
              color="update"
              title="update"
            />
          </Link>
          <IconButton
            icon={icons.delete}
            styleType="transparent"
            color="delete"
            title="delete"
            onClick={handleSelectId}
          />
        </div>
      )}
      {showStatus && (
        <p
          className={`post-status ${data?.is_published ? "published" : "draft"}`}
        >
          {data?.is_published ? "Published" : "Draft"}
        </p>
      )}
    </div>
  );
};

export default PostActions;
