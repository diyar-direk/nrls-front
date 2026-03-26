import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import APIClient from "../../../../../utils/ApiClient";
import endPoints from "../../../../../constant/endPoints";
import HandleError from "./../../../../../components/error/HandleError";
import Skeleton from "./../../../../../components/skeleton/Skeleton";
import Breadcrumbs from "./../../../../../components/breadcrumbs/Breadcrumbs";
import ImageSection from "../components/ImageSection";
import ProfileInfoSection from "./../components/ProfileInfoSection";

const api = new APIClient(endPoints.authors);
const ViewAuthor = () => {
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [endPoints.authors, id],
    queryFn: () => api.getOne(id),
  });

  if (isLoading) return <Skeleton height="300px" />;
  if (error) return <HandleError error={error} refetch={refetch} />;

  return (
    <>
      <Breadcrumbs replace={[{ from: id, text: data?.full_name }]} />
      <main className="author-profile">
        <ImageSection data={data} id={id} updateData={api.updateData} />
        <ProfileInfoSection data={data} />
      </main>

      <div className="author-post-results-container">
        <h1 data-count={5} className="author-post-results">
          posts
        </h1>
      </div>
    </>
  );
};

export default ViewAuthor;
