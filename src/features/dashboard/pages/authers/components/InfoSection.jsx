import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoSection = ({ icon, title, value }) => {
  return (
    <div>
      <FontAwesomeIcon icon={icon} />
      <article>
        <p>{title}</p>
        <span>{value}</span>
      </article>
    </div>
  );
};

export default InfoSection;
