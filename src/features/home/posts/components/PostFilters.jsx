import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import PopUp from "../../../../components/popup/PopUp";
import endPoints from "../../../../constant/endPoints";
import Input from "../../../../components/inputs/Input";
import SelectInputApi from "../../../../components/inputs/SelectInputApi";
import Button from "../../../../components/buttons/Button";

const PostFilters = ({
  onClose,
  filters,
  setFilters,
  category,
  content_type,
}) => {
  const [localFilters, setLocalFilters] = useState(filters || {});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setLocalFilters((p) => ({ ...p, [name]: value }));
  }, []);

  const handleOptionInp = useCallback((name, value) => {
    setLocalFilters((p) => ({ ...p, [name]: value }));
  }, []);

  const { i18n, t } = useTranslation();

  const language = useMemo(() => i18n.language, [i18n]);

  const handleSave = useCallback(() => {
    setFilters(localFilters);
    onClose();
  }, [setFilters, localFilters, onClose]);

  return (
    <PopUp isOpen className="filters-popup" onClose={onClose}>
      <div className="filters-container">
        {!category && content_type?.categories_count > 0 && (
          <SelectInputApi
            endPoint={endPoints.categories}
            onChange={(e) => handleOptionInp("category", e)}
            placeholder={
              localFilters?.category?.[`name_${language}`] || t("common.all")
            }
            label={t("pages.categories")}
            optionLabel={(e) => e?.[`name_${language}`]}
            customOptions={[
              {
                title: t("common.all"),
                onChange: () => handleOptionInp("category", ""),
              },
            ]}
            notRequired
            params={{ content_type: content_type?.id }}
          />
        )}

        <SelectInputApi
          endPoint={endPoints.tags}
          onChange={(e) => handleOptionInp("tags", e)}
          placeholder={
            localFilters?.tags?.[`name_${language}`] || t("common.all")
          }
          label={t("pages.tags")}
          optionLabel={(e) => e?.[`name_${language}`]}
          customOptions={[
            {
              title: t("common.all"),
              onChange: () => handleOptionInp("tags", ""),
            },
          ]}
          notRequired
        />
        <SelectInputApi
          endPoint={endPoints.authors}
          onChange={(e) => handleOptionInp("author", e)}
          placeholder={localFilters?.author?.full_name || t("common.all")}
          label={t("pages.authors")}
          optionLabel={(e) => e?.full_name}
          customOptions={[
            {
              title: t("common.all"),
              onChange: () => handleOptionInp("author", ""),
            },
          ]}
          notRequired
        />

        <Input
          name="published_at_gte"
          notRequired
          label={`${t("common.published_at")} ${t("common.from")}`}
          value={localFilters?.published_at_gte ?? ""}
          onChange={handleChange}
          type="date"
        />
        <Input
          name="published_at_lte"
          notRequired
          label={`${t("common.published_at")} ${t("common.to")}`}
          value={localFilters?.published_at_lte ?? ""}
          onChange={handleChange}
          type="date"
        />
      </div>
      <div className="btns">
        <Button onClick={handleSave} btnType="update">
          {t("common.save")}
        </Button>
        <Button btnStyleType="transparent" btnType="cancel" onClick={onClose}>
          {t("common.cancel")}
        </Button>
      </div>
    </PopUp>
  );
};

export default PostFilters;
