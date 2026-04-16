import { useParams } from "react-router";
import endPoints from "../../../../constant/endPoints";
import APIClient from "../../../../utils/ApiClient";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../../../../components/skeleton/Skeleton";
import HandleError from "../../../../components/error/HandleError";
import ProfileMainInfo from "../../../dashboard/pages/authers/components/ProfileMainInfo";
import AuthorImgSection from "../components/AuthorImgSection";
import AuthorPopsts from "./../../../dashboard/pages/authers/components/AuthorPopsts";
import { homeRoutes } from "../../../../constant/pageRoutes";
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
      </main>

      <AuthorPopsts
        postPage={(e) => homeRoutes.posts.view(e.content_type, e.id)}
        actions={false}
      />
    </div>
  );
};

export default AuthorPage;
