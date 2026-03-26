import { useCallback, useState } from "react";
import imgServerSrc from "../../../../utils/imgServerSrc";
import ImgViewPopup from "../../../../components/popup/ImgViewPopup";

const AuthorImgSection = ({ profile_image, full_name }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    if (!profile_image) return;
    setIsOpen(true);
  }, [profile_image]);

  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <div className="img">
        <div className="profile">
          <div className={`profile-photo flex`} onClick={handleOpen}>
            {profile_image ? (
              <img src={imgServerSrc(profile_image)} alt="profile" />
            ) : (
              <span> {full_name?.[0]} </span>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <ImgViewPopup src={imgServerSrc(profile_image)} onClose={handleClose} />
      )}
    </>
  );
};

export default AuthorImgSection;
