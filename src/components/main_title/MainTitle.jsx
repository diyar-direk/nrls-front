import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { homeRoutes } from "../../constant/pageRoutes";

const MainTitle = ({ lang, content_type, ...props }) => {
  return (
    <Link
      className="main-title"
      to={homeRoutes.posts.page(content_type?.name_en)}
      state={{ content_type }}
      {...props}
    >
      {content_type?.[`name_${lang}`]} <FontAwesomeIcon icon={faChevronRight} />
    </Link>
  );
};

export default MainTitle;
