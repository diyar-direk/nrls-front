import { useCallback } from "react";
import Button from "../../../../../components/buttons/Button";

const NewImgActions = ({ setNewImg, handleSave }) => {
  const handleCancel = useCallback(() => {
    setNewImg(null);
  }, [setNewImg]);

  return (
    <div className="flex gap-10 wrap">
      <Button btnStyleType="transparent" onClick={handleSave}>
        save
      </Button>
      <Button
        btnStyleType="transparent"
        btnType="cancel"
        onClick={handleCancel}
      >
        cancel
      </Button>
    </div>
  );
};

export default NewImgActions;
