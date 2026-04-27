import { useCallback, useEffect, useState } from "react";
import { useClickOutside } from "../../../../../hooks/useClickOutside";
import imgServerSrc from "../../../../../utils/imgServerSrc";
import NewImgActions from "./NewImgActions";
import ProfileActions from "./ProfileActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";

const AuthorProfile = ({ profile_image, full_name, id, updateData }) => {
  const { ref, toggleOpen, isOpen, setIsOpen } = useClickOutside();

  const [newImg, setNewImg] = useState(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback(() => setIsDragging(true), []);
  const handleDragLeave = useCallback(() => setIsDragging(false), []);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file) return;
      setNewImg({ file });
      setIsDragging(false);
    },
    [setNewImg],
  );

  const handleChange = useCallback((e) => {
    const file = e.target.files[0];
    setNewImg({ file, src: URL.createObjectURL(file) });
  }, []);

  useEffect(() => {
    return () => URL.revokeObjectURL(newImg?.src);
  }, [newImg?.src]);

  const query = useQueryClient();

  const handleSave = useMutation({
    mutationFn: (file) => {
      const data = new FormData();
      data.append("profile_image", file);
      updateData({ id, data });
    },
    onSuccess: () => {
      setNewImg(null);
      query.invalidateQueries(endPoints.authors);
      setIsOpen(false);
    },
  });

  return (
    <>
      <div className="profile" ref={ref}>
        <div
          className={`${isDragging ? "dragging" : ""} profile-photo flex`}
          onClick={toggleOpen}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {profile_image || newImg ? (
            <img
              src={newImg?.src || imgServerSrc(profile_image)}
              alt="profile"
            />
          ) : (
            <span> {full_name?.[0]} </span>
          )}
        </div>

        <ProfileActions
          profile_image={profile_image}
          newImg={newImg?.src}
          isOpen={isOpen}
          setNewImg={setNewImg}
          onDelete={() => handleSave.mutate("")}
        />
      </div>

      {newImg && (
        <NewImgActions
          setNewImg={setNewImg}
          handleSave={() => handleSave.mutate(newImg.file)}
        />
      )}

      <input
        type="file"
        id="profile_image"
        name="profile_image"
        hidden
        onChange={handleChange}
        accept="image/*"
      />
    </>
  );
};

export default AuthorProfile;
