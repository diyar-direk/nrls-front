import { useState } from "react";
import "./style.css";
import { useTranslation } from "react-i18next";

const ReadMoreText = ({ letters = 80, word }) => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();
  if (!word) return;

  const text = showAll ? word : word.slice(0, letters);

  return (
    <div className="read-more-container">
      <p> {text} </p>

      {word.length > letters && (
        <>
          {!showAll && <span> ... </span>}
          <p
            onClick={() => setShowAll((prev) => !prev)}
            style={{
              color: "#0d6efd",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {t(showAll ? "show_less" : "show_more")}
          </p>
        </>
      )}
    </div>
  );
};

export default ReadMoreText;
