import { useState } from "react";
import PostViewMainInfo from "./PostViewMainInfo";
import ImgViewPopup from "../../../../../components/popup/ImgViewPopup";
import PostComments from "./PostComments";
import "../style/style.css";
import ViewFiles from "./ViewFiles";
import ViewSurvey from "./ViewSurvey";
import { Link } from "react-router";
import { postViewImg } from "../../../../../utils/postViewImg";
import { useTranslation } from "react-i18next";

const PostViewMainSections = ({
  data,
  authorView,
  language,
  allPostsView,
  actions,
  viewSurvey,
}) => {
  const [showImg, setShowImg] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <main className="post-main-info">
        <h1 className="post-title border-bottom">{data?.title}</h1>

        {data?.excerpt && (
          <div className="border-bottom">
            <p className="excerpt"> {data?.excerpt} </p>
          </div>
        )}

        <PostViewMainInfo
          authorView={authorView}
          data={data}
          language={language}
        />

        <div
          className="cover-image"
          onClick={() => setShowImg(postViewImg(data))}
        >
          <img src={postViewImg(data)} alt="" />
        </div>

        <div
          className="ql-editor border-bottom"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        ></div>

        {data?.tags?.length > 0 && (
          <div className="tags border-bottom">
            <p>{t("pages.tags")}</p>
            {data?.tags?.map((e) => (
              <Link
                key={e.id}
                to={
                  typeof allPostsView === "function"
                    ? allPostsView(e)
                    : allPostsView
                }
                state={{ tags: e }}
              >
                {e[`name_${language}`]}
              </Link>
            ))}
          </div>
        )}

        <ViewFiles id={data?.id} t={t} />
        <ViewSurvey
          id={data?.id}
          actions={actions}
          viewSurvey={viewSurvey}
          t={t}
          content_type={data?.content_type}
        />

        <PostComments id={data?.id} actions={actions} />
      </main>

      <ImgViewPopup src={showImg} onClose={() => setShowImg(false)} />
    </>
  );
};

export default PostViewMainSections;
