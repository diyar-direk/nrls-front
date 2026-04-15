import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../../components/buttons/IconButton";
import { languages } from "../../../constant/languages";
import { useCallback } from "react";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { isOpen, toggleOpen, ref, setIsOpen } = useClickOutside();

  const { i18n } = useTranslation();

  const selectLanguage = useCallback(
    (e) => {
      i18n.changeLanguage(e);
      localStorage.setItem("language", e);
      setIsOpen(false);
    },
    [i18n, setIsOpen],
  );

  return (
    <div className="language" ref={ref}>
      <IconButton color="secondry-color" title="language" onClick={toggleOpen}>
        <FontAwesomeIcon icon={faLanguage} />
      </IconButton>
      {isOpen && (
        <article>
          {languages.map((e) => (
            <p
              key={e.value}
              onClick={() => selectLanguage(e.value)}
              className={i18n.language === e.value ? "active" : ""}
            >
              {e.title}
            </p>
          ))}
        </article>
      )}
    </div>
  );
};

export default Language;
