import { Link } from "react-router";

const BreakingNews = () => {
  return (
    <div className="breacking-news">
      <h3>breaking news</h3>
      <div className="ticker">
        <article className="ticker-content">
          <Link>Lorem ipsum dolor sit amet.</Link>
          <Link>Lorem ipsum dolor sit amet.</Link>
          <Link>Lorem ipsum dolor sit amet.</Link>
          <Link>Lorem ipsum dolor sit amet.</Link>
        </article>
      </div>
    </div>
  );
};

export default BreakingNews;
