import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import APIClient from "../../../../../utils/ApiClient";
import endPoints from "../../../../../constant/endPoints";
import HandleError from "./../../../../../components/error/HandleError";
import Skeleton from "./../../../../../components/skeleton/Skeleton";
import Breadcrumbs from "./../../../../../components/breadcrumbs/Breadcrumbs";
import ImageSection from "../components/ImageSection";
import ProfileInfoSection from "./../components/ProfileInfoSection";
import AuthorPopsts from "../components/AuthorPopsts";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import { useTranslation } from "react-i18next";

const api = new APIClient(endPoints.authors);
const ViewAuthor = () => {
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [endPoints.authors, id],
    queryFn: () => api.getOne(id),
  });
const {t} = useTranslation()
  if (isLoading) return <Skeleton height="300px" />;
  if (error) return <HandleError error={error} refetch={refetch} />;

  return (
    <>
      <Breadcrumbs
        replace={[{ from: id, text: data?.full_name, fullTextReplace: true }]}
      />
      <main className="author-profile">
        <ImageSection data={data} id={id} updateData={api.updateData} t={t}/>
        <ProfileInfoSection data={data} t= {t} />
      </main>

      <AuthorPopsts postPage={(e) => dashboardRouts.post.view(e.id)} />
    </>
  );
};

export default ViewAuthor;
