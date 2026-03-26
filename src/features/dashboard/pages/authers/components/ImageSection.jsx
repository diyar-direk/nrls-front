import { Link } from "react-router";
import IconButton from "../../../../../components/buttons/IconButton";
import { icons } from "../../../../../constant/icons";
import AuthorProfile from "./AuthorProfile";
import ProfileMainInfo from "./ProfileMainInfo";
import { dashboardRouts } from "../../../../../constant/pageRoutes";
import "../style/style.css";

const ImageSection = ({ data, id, updateData }) => {
  return (
    <section className="image-section">
      <div className="img">
        <div className="icons">
          <Link to={dashboardRouts.author.update(id)}>
            <IconButton
              icon={icons.update}
              title="update"
              color="main"
              styleType="transparent"
            />
          </Link>
        </div>
        <AuthorProfile
          full_name={data?.full_name}
          profile_image={data?.profile_image}
          id={id}
          updateData={updateData}
        />
      </div>
      <ProfileMainInfo data={data} />
    </section>
  );
};

export default ImageSection;
