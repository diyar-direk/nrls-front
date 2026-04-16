import BreakingNews from "./BreakingNews";
import MainNews from "./MainNews";
import SubNews from "./SubNews";
import { useFetchData } from "./../../../../hooks/useFetchData";
import endPoints from "../../../../constant/endPoints";
import Skeleton from "../../../../components/skeleton/Skeleton";
import { useTranslation } from "react-i18next";

const LastNews = ({ language }) => {
  const { data, isLoading } = useFetchData({
    endPoints: endPoints.posts,
    page_size: 6,
    ordering: { created_at: "-created_at" },
    language,
    is_published: true,
  });

  const { t } = useTranslation();

  if (isLoading)
    return (
      <section className="container main-section">
        <Skeleton />
        <div className="flex gap-20" style={{ marginTop: "20px" }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </section>
    );

  if (!data?.totalCount) return;

  return (
    <section className="last-news-container container main-section">
      <BreakingNews data={data?.data?.slice(0, 3)} />
      <div className="last-news">
        <MainNews data={data?.data?.[3]} language={language} t={t} />
        <SubNews data={data?.data?.slice(4)} language={language} t={t} />
      </div>
    </section>
  );
};

export default LastNews;
