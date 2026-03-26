import { authorIcons } from "../../../../../constant/authorIcons";
import dateFormatter from "../../../../../utils/dateFormatter";
import InfoSection from "./InfoSection";
import "../style/style.css";

const ProfileInfoSection = ({ data }) => {
  return (
    <section className="info-section">
      <h2>info</h2>

      <InfoSection icon={authorIcons.id} title={"id"} value={data?.id} />

      <InfoSection
        icon={authorIcons.created_at}
        title={"created_at"}
        value={dateFormatter(data?.created_at, "fullDate")}
      />

      <InfoSection
        icon={authorIcons.updated_at}
        title={"updated_at"}
        value={dateFormatter(data?.updated_at, "fullDate")}
      />

      <InfoSection icon={authorIcons.slug} title={"slug"} value={data?.slug} />
    </section>
  );
};

export default ProfileInfoSection;
