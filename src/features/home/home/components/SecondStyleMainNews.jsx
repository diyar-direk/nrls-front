import {
  faArrowRight,
  faClock,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dateFormatter from "../../../../utils/dateFormatter";
import Img from "../../../../assets/1.jpg";
import { Link } from "react-router";

const SecondStyleMainNews = () => {
  return (
    <Link className="main-news">
      <div className="img">
        <img src={Img} alt="" />
      </div>
      <div className="icons">
        <span className="icon">
          <FontAwesomeIcon icon={faClock} />
          {dateFormatter(new Date(), "fullDate")}
        </span>
        <span className="icon">
          <FontAwesomeIcon icon={faEye} />
          1040
        </span>
        <span className="icon">
          <FontAwesomeIcon icon={faEye} />
          1040
        </span>
      </div>
      <h3 className="two-line-ellipsis">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate saepe
        consectetur sapiente eum et nam. Impedit, porro harum quidem tenetur a
        ad facere, accusantium iure hic error delectus, explicabo nulla?
      </h3>
      <p className="one-line-ellipsis">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non molestias
        reiciendis commodi enim vel quod, itaque quasi minus, voluptates facilis
        ducimus alias nisi et. Laudantium nisi aliquid est expedita illum.
      </p>
      <div className="button">
        <button className="read-more">
          read more <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </Link>
  );
};

export default SecondStyleMainNews;
