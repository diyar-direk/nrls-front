import { useCallback, useMemo, useState } from "react";
import PopUp from "../../../../../components/popup/PopUp";
import Input from "../../../../../components/inputs/Input";
import Button from "../../../../../components/buttons/Button";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import SelectInputApi from "../../../../../components/inputs/SelectInputApi";
import endPoints from "../../../../../constant/endPoints";
import { useTranslation } from "react-i18next";
import { languages } from "../../../../../constant/languages";

const PostFilters = ({ onClose, filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters || {});
  const { t } = useTranslation();
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setLocalFilters((p) => ({ ...p, [name]: value }));
  }, []);

  const handleOptionInp = useCallback((name, value) => {
    setLocalFilters((p) => ({ ...p, [name]: value }));
  }, []);

  const { i18n } = useTranslation();

  const language = useMemo(() => i18n.language, [i18n]);

  const handleSave = useCallback(() => {
    setFilters(localFilters);
    onClose();
  }, [setFilters, localFilters, onClose]);

  return (
    <PopUp isOpen className="filters-popup" onClose={onClose}>
      <div className="filters-container">
        <SelectInputApi
          endPoint={endPoints.contentType}
          onChange={(e) => handleOptionInp("content_type", e)}
          placeholder={
            localFilters?.content_type?.[`name_${language}`] || t("common.all")
          }
          label={t("common.content_type")}
          optionLabel={(e) => `${e?.name_en} - ${e?.name_ar} - ${e?.name_ku}`}
          notRequired
          customOptions={[
            {
              title: t("common.all"),
              onChange: () => handleOptionInp("content_type", ""),
            },
          ]}
        />

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
        />
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
        <SelectOptionInput
          label={t("common.language")}
          onSelectOption={(e) => handleOptionInp("language", e.value)}
          options={languages.map((e) => ({ text: e.title, value: e.value }))}
          notRequired
          customOptions={[
            {
              title: t("common.all"),
              onChange: () => handleOptionInp("language", ""),
            },
          ]}
          placeholder={localFilters?.language || t("common.all")}
        />

        <SelectOptionInput
          label={t("common.is_published")}
          onSelectOption={(e) => handleOptionInp("is_published", e.value)}
          options={[
            {
              text: t("common.yes"),
              value: true,
            },
            {
              text: t("common.no"),
              value: false,
            },
          ]}
          notRequired
          customOptions={[
            {
              title: t("common.all"),
              onChange: () => handleOptionInp("is_published", ""),
            },
          ]}
          placeholder={
            localFilters?.is_published === true
              ? t("common.yes")
              : localFilters?.is_published === false
                ? t("common.no")
                : t("common.all")
          }
        />
        <Input
          name="created_at_gte"
          notRequired
          label={`${t("common.from")} ${t("common.created_at")}`}
          value={localFilters?.created_at_gte ?? ""}
          onChange={handleChange}
          type="date"
        />
        <Input
          name="created_at_lte"
          notRequired
          label={`${t("common.to")} ${t("common.created_at")}`}
          value={localFilters?.created_at_lte ?? ""}
          onChange={handleChange}
          type="date"
        />
        <Input
          name="published_at_gte"
          notRequired
          label={`${t("common.from")} ${t("common.published_at")}`}
          value={localFilters?.published_at_gte ?? ""}
          onChange={handleChange}
          type="date"
        />
        <Input
          name="published_at_lte"
          notRequired
          label={`${t("common.to")} ${t("common.published_at")}`}
          value={localFilters?.published_at_lte ?? ""}
          onChange={handleChange}
          type="date"
        />
      </div>
      <div className="btns">
        <Button onClick={handleSave}>{t("common.save")}</Button>
        <Button btnStyleType="transparent" btnType="cancel" onClick={onClose}>
          {t("common.cancel")}
        </Button>
      </div>
    </PopUp>
  );
};

export default PostFilters;
