import { faClock, faEye } from "@fortawesome/free-solid-svg-icons";
import RepeatChildren from "../../../../components/RepeatChildren";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dateFormatter from "../../../../utils/dateFormatter";
import { Link } from "react-router";

const SecondStyleSubNews = () => {
  return (
    <div className="sub-news">
      <RepeatChildren count={3}>
        <Link>
          <article>
            <h3 className="two-line-ellipsis">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
              provident officiis magni cum eos debitis? Lorem ipsum, dolor sit
              amet consectetur adipisicing elit.
            </h3>
            <div className="icons">
              <span className="icon">
                <FontAwesomeIcon icon={faClock} />
                {dateFormatter(new Date(), "fullDate")}
              </span>
              <span className="icon">
                <FontAwesomeIcon icon={faEye} />
                1040
              </span>
            </div>
          </article>
        </Link>
      </RepeatChildren>
    </div>
  );
};

export default SecondStyleSubNews;
