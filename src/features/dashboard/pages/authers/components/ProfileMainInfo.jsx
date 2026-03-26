import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReadMoreText from "../../../../../components/read_more/ReadMoreText";
import { authorIcons } from "../../../../../constant/authorIcons";

const ProfileMainInfo = ({ data }) => {
  return (
    <div className="body">
      <h2>{data?.full_name}</h2>
      <p className="colon-after">email</p>
      <a href={`mailto:${data?.email}`}>
        <FontAwesomeIcon icon={authorIcons.email} />
        {data?.email}
      </a>

      {data?.bio && (
        <>
          <p className="colon-after">bio</p>
          <ReadMoreText word={data?.bio} letters={150} />
        </>
      )}
    </div>
  );
};

export default ProfileMainInfo;
