import MainTitle from "../../../../components/main_title/MainTitle";
import Skeleton from "../../../../components/skeleton/Skeleton";
import endPoints from "../../../../constant/endPoints";
import { useFetchData } from "../../../../hooks/useFetchData";
import SecondStyleMainNews from "./SecondStyleMainNews";
import SecondStyleSubNews from "./SecondStyleSubNews";

const MediaNews = ({ language, content_type }) => {
  const { data, isLoading } = useFetchData({
    endPoints: endPoints.posts,
    page_size: 7,
    ordering: { published_at: "-published_at" },
    language,
    is_published: true,
    content_type: content_type?.id,
  });

  if (isLoading)
    return (
      <section className="flex gap-20 container main-section">
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
      </section>
    );

  if (!data?.totalCount) return;

  return (
    <section className="container main-section">
      <MainTitle content_type={content_type} lang={language} />

      <main className="news-style-2">
        <SecondStyleSubNews
          language={language}
          data={data?.data?.slice(1, 4)}
        />
        <SecondStyleMainNews language={language} data={data?.data?.[0]} />
        <SecondStyleSubNews language={language} data={data?.data?.slice(4)} />
      </main>
    </section>
  );
};

export default MediaNews;
