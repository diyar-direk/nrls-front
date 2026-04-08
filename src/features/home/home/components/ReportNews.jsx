import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useFetchData } from "../../../../hooks/useFetchData";
import endPoints from "../../../../constant/endPoints";
import Skeleton from "../../../../components/skeleton/Skeleton";
import PostCard from "./../../../../components/post/PostCard";
import { homeRoutes } from "../../../../constant/pageRoutes";
import MainTitle from "../../../../components/main_title/MainTitle";

const ReportNews = ({ language }) => {
  const { data, isLoading } = useFetchData({
    endPoints: endPoints.posts,
    page_size: 5,
    ordering: { created_at: "-created_at" },
    language,
    content_type: "report",
    is_published: true,
  });

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 20,
    },
  });

  if (isLoading)
    return (
      <section className="flex gap-10 container main-section">
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
      </section>
    );

  if (!data?.totalCount) return;

  return (
    <section className="container main-section body-color">
      <MainTitle state={{ content_type: "report" }}>تقارير</MainTitle>

      <main className="reports-container keen-slider" ref={sliderRef}>
        {data?.data?.map((e) => (
          <PostCard
            authorPage={homeRoutes.author.view}
            data={e}
            key={e.id}
            postPage={homeRoutes.posts.view}
            className={"card-style-1 keen-slider__slide"}
          />
        ))}
      </main>
    </section>
  );
};

export default ReportNews;
