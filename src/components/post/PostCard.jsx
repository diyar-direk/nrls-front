import { useNavigate } from "react-router";
import "./style.css";
import imgServerSrc from "./../../utils/imgServerSrc";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo } from "react";
import PostActions from "./PostActions";

const PostCard = ({
  data,
  isDraft,
  authorPage,
  postPage,
  img,
  showStatus,
  showActions,
  setDeletedId,
  className,
}) => {
  const { i18n } = useTranslation();
  const language = useMemo(() => i18n.language, [i18n]);

  const nav = useNavigate();

  const handleCardClick = useCallback(() => {
    if (!isDraft) nav(postPage(data?.id));
  }, [isDraft, nav, postPage, data]);

  const memoClassName = useMemo(
    () => `post-view-card ${className || ""}`,
    [className],
  );

  return (
    <div className={memoClassName} onClick={handleCardClick}>
      <div className="img">
        <PostActions
          data={data}
          showStatus={showStatus}
          showActions={showActions}
          setDeletedId={setDeletedId}
        />
        <img
          src={
            img ||
            imgServerSrc(
              data?.featured_image || data?.original_post?.featured_image,
            )
          }
          alt=""
        />
      </div>

      <CardBody
        authorPage={authorPage}
        data={data}
        isDraft={isDraft}
        language={language}
      />

      <CardFooter data={data} isDraft={isDraft} />
    </div>
  );
};

export default PostCard;
