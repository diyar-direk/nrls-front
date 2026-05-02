import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useFetchData } from "../../../../hooks/useFetchData";
import endPoints from "../../../../constant/endPoints";
import Skeleton from "../../../../components/skeleton/Skeleton";
import PostCard from "../../../../components/post/PostCard";
import { homeRoutes } from "../../../../constant/pageRoutes";
import MainTitle from "../../../../components/main_title/MainTitle";

const TopicsNews = ({ language, content_type }) => {
  const { data, isLoading } = useFetchData({
    endPoints: endPoints.posts,
    page_size: 5,
    ordering: { published_at: "-published_at" },
    language,
    is_published: true,
    content_type: content_type?.id,
  });

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 20,
    },

    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 1.5,
          spacing: 10,
        },
      },
      "(max-width: 480px)": {
        slides: {
          perView: 1.2,
          spacing: 8,
        },
      },
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
      <MainTitle content_type={content_type} lang={language} />

      <main className="reports-container keen-slider" ref={sliderRef}>
        {data?.data?.map((e) => (
          <PostCard
            authorPage={homeRoutes.author.view}
            data={e}
            key={e.id}
            postPage={(e) => homeRoutes.posts.view(content_type?.name_en, e.id)}
            className={"card-style-1 keen-slider__slide"}
          />
        ))}
      </main>
    </section>
  );
};

export default TopicsNews;
