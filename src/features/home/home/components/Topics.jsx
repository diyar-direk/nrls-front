import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Img from "../../../../assets/1.jpg";
import {
  faArrowRight,
  faClock,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import RepeatChildren from "../../../../components/RepeatChildren";

const Topics = () => {
  return (
    <main className="topics-container grid-2">
      <RepeatChildren count={4}>
        <Link className="topic">
          <div className="img">
            <img src={Img} alt="" />
          </div>
          <article>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure,
              facilis!
            </h3>
            <p className="two-line-ellipsis">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis voluptatum, facere quis, dolorem, ex suscipit error
              porro tempore unde adipisci modi? Harum commodi nam ipsa,
              asperiores quibusdam ducimus eligendi rem!
            </p>

            <div className="icons">
              <span className="icon">
                <FontAwesomeIcon icon={faClock} />
                2026-12-11 / 10:10 PM
              </span>
              <span className="icon">
                <FontAwesomeIcon icon={faEye} />
                400
              </span>
            </div>
            <span className="read-more">
              read more <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </article>
        </Link>
      </RepeatChildren>
    </main>
  );
};

export default Topics;
