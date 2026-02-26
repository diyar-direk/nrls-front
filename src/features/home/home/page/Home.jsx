import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Img from "../../../../assets/1.jpg";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import dateFormatter from "./../../../../utils/dateFormatter";
import "../style/home.css";

const Home = () => {
  return (
    <div className="last-news-container container main-section">
      <div className="breacking-news"></div>

      <div className="last-news">
        <div className="main-news">
          <img src={Img} alt="" />
          <article>
            <button> type </button>
            <h2 className="two-line-ellipsis">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum,
              sint! Fugit at quas saepe consequatur dignissimos quis ratione
              explicabo consequuntur reiciendis blanditiis odit nulla vero
              maiores, nemo dolor totam obcaecati? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequuntur facere tempora
              architecto natus nulla adipisci laudantium sunt excepturi, fuga
              sequi esse, nisi non impedit voluptas totam earum maiores omnis
              ab!
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda, hic amet earum ipsam iure tempore quia delectus
              consequuntur dolorum quibusdam molestias nostrum voluptate cum
              corporis ratione illum, voluptatum nulla odio.
            </p>
            <div className="icons">
              <span>
                <FontAwesomeIcon icon={faClock} />
                {dateFormatter(new Date(), "fullDate")}
              </span>
              <span>
                <FontAwesomeIcon icon={faClock} />
                {dateFormatter(new Date(), "fullDate")}
              </span>
              <span>
                <FontAwesomeIcon icon={faClock} />
                {dateFormatter(new Date(), "fullDate")}
              </span>
            </div>
          </article>
        </div>
        <div className="sub-news-container"></div>
      </div>
    </div>
  );
};

export default Home;
