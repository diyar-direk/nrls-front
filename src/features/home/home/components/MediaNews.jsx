import MainTitle from "../../../../components/main_title/MainTitle";
import Skeleton from "../../../../components/skeleton/Skeleton";
import endPoints from "../../../../constant/endPoints";
import { mediaTyps } from "../../../../constant/enums";
import { useTranslation } from "react-i18next";
import { useFetchData } from "../../../../hooks/useFetchData";
import SecondStyleMainNews from "./SecondStyleMainNews";
import SecondStyleSubNews from "./SecondStyleSubNews";

const MediaNews = ({ language }) => {
  const { data, isLoading } = useFetchData({
    endPoints: endPoints.posts,
    page_size: 7,
    ordering: { created_at: "-created_at" },
    language,
    content_type_multi: mediaTyps,
    is_published: true,
  });

  const { t } = useTranslation();

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
      <MainTitle state={{ content_type_multi: mediaTyps }} name="media">
        {t("pages.media")}
      </MainTitle>

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
