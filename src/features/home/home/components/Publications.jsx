import MainTitle from "../../../../components/main_title/MainTitle";
import Skeleton from "../../../../components/skeleton/Skeleton";
import endPoints from "../../../../constant/endPoints";
import { useFetchData } from "../../../../hooks/useFetchData";
import SecondStyleMainNews from "./SecondStyleMainNews";
import SecondStyleSubNews from "./SecondStyleSubNews";

const Publications = ({ language }) => {
  const { data, isLoading } = useFetchData({
    endPoints: endPoints.posts,
    page_size: 5,
    ordering: { created_at: "-created_at" },
    language,
    content_type: "publication",
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
    <section className="container main-section body-color">
      <MainTitle state={{ content_type: "publication" }}>publication</MainTitle>
      <main className="news-style-2 publications">
        <SecondStyleMainNews data={data?.data?.[0]} />
        <SecondStyleSubNews data={data?.data?.slice(1)} />
      </main>
    </section>
  );
};

export default Publications;
