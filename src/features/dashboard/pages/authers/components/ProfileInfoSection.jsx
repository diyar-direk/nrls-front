import { authorIcons } from "../../../../../constant/authorIcons";
import dateFormatter from "../../../../../utils/dateFormatter";
import InfoSection from "./InfoSection";
import "../style/style.css";

const ProfileInfoSection = ({ data, t }) => {
  return (
    <section className="info-section">
      <h2>{t("common.info")}</h2>

      <InfoSection icon={authorIcons.id} title={"id"} value={data?.id} />

      <InfoSection
        icon={authorIcons.created_at}
        title={t("common.created_at")}
        value={dateFormatter(data?.created_at, "fullDate")}
      />

      <InfoSection
        icon={authorIcons.updated_at}
        title={t("common.updated_at")}
        value={dateFormatter(data?.updated_at, "fullDate")}
      />
    </section>
  );
};

export default ProfileInfoSection;
