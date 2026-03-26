import { useParams } from "react-router";
import endPoints from "../../../../constant/endPoints";
import APIClient from "../../../../utils/ApiClient";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../../../../components/skeleton/Skeleton";
import HandleError from "../../../../components/error/HandleError";
import ProfileInfoSection from "../../../dashboard/pages/authers/components/ProfileInfoSection";
import ProfileMainInfo from "../../../dashboard/pages/authers/components/ProfileMainInfo";
import AuthorImgSection from "../components/AuthorImgSection";
const api = new APIClient(endPoints.authors);

const AuthorPage = () => {
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [endPoints.authors, id],
    queryFn: () => api.getOne(id),
  });

  if (isLoading) return <Skeleton height="300px" />;
  if (error) return <HandleError error={error} refetch={refetch} />;

  return (
    <div className="main-section container">
      <main className="author-profile">
        <section className="image-section">
          <AuthorImgSection
            full_name={data?.full_name}
            profile_image={data?.profile_image}
          />
          <ProfileMainInfo data={data} />
        </section>

        <ProfileInfoSection data={data} />
      </main>

      <div className="author-post-results-container">
        <h1 data-count={5} className="author-post-results">
          posts
        </h1>
      </div>
    </div>
  );
};

export default AuthorPage;
