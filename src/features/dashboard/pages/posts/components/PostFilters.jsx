import { useCallback, useMemo, useState } from "react";
import PopUp from "../../../../../components/popup/PopUp";
import Input from "../../../../../components/inputs/Input";
import Button from "../../../../../components/buttons/Button";
import SelectOptionInput from "../../../../../components/inputs/SelectOptionInput";
import { allTyps } from "../../../../../constant/enums";
import SelectInputApi from "../../../../../components/inputs/SelectInputApi";
import endPoints from "../../../../../constant/endPoints";
import { useTranslation } from "react-i18next";
import { languages } from "../../../../../constant/languages";

const PostFilters = ({ onClose, filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters || {});

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
        <SelectOptionInput
          label="content_type"
          onSelectOption={(e) => handleOptionInp("content_type", e.value)}
          options={allTyps.map((e) => ({ text: e, value: e }))}
          notRequired
          customOptions={[
            {
              title: "all",
              onChange: () => handleOptionInp("content_type", ""),
            },
          ]}
          placeholder={localFilters?.content_type || "all"}
        />
        <SelectInputApi
          endPoint={endPoints.categories}
          onChange={(e) => handleOptionInp("category", e)}
          placeholder={localFilters?.category?.[`name_${language}`] || "all"}
          label="category"
          optionLabel={(e) => e?.[`name_${language}`]}
          customOptions={[
            {
              title: "all",
              onChange: () => handleOptionInp("category", ""),
            },
          ]}
        />
        <SelectInputApi
          endPoint={endPoints.tags}
          onChange={(e) => handleOptionInp("tags", e)}
          placeholder={localFilters?.tags?.[`name_${language}`] || "all"}
          label="tags"
          optionLabel={(e) => e?.[`name_${language}`]}
          customOptions={[
            {
              title: "all",
              onChange: () => handleOptionInp("tags", ""),
            },
          ]}
        />
        <SelectInputApi
          endPoint={endPoints.authors}
          onChange={(e) => handleOptionInp("author", e)}
          placeholder={localFilters?.author?.full_name || "all"}
          label="author"
          optionLabel={(e) => e?.full_name}
          customOptions={[
            {
              title: "all",
              onChange: () => handleOptionInp("author", ""),
            },
          ]}
        />
        <SelectOptionInput
          label="language"
          onSelectOption={(e) => handleOptionInp("language", e.value)}
          options={languages.map((e) => ({ text: e.title, value: e.value }))}
          notRequired
          customOptions={[
            {
              title: "all",
              onChange: () => handleOptionInp("language", ""),
            },
          ]}
          placeholder={localFilters?.language || "all"}
        />

        <SelectOptionInput
          label="is_published"
          onSelectOption={(e) => handleOptionInp("is_published", e.value)}
          options={[
            {
              text: "yes",
              value: true,
            },
            {
              text: "no",
              value: false,
            },
          ]}
          notRequired
          customOptions={[
            {
              title: "all",
              onChange: () => handleOptionInp("is_published", ""),
            },
          ]}
          placeholder={
            localFilters?.is_published === true
              ? "yes"
              : localFilters?.is_published === false
                ? "no"
                : "all"
          }
        />
        <Input
          name="created_at_gte"
          notRequired
          label="created_at from"
          value={localFilters?.created_at_gte ?? ""}
          onChange={handleChange}
          type="date"
        />
        <Input
          name="created_at_lte"
          notRequired
          label="created_at to"
          value={localFilters?.created_at_lte ?? ""}
          onChange={handleChange}
          type="date"
        />
        <Input
          name="published_at_gte"
          notRequired
          label="published_at from"
          value={localFilters?.published_at_gte ?? ""}
          onChange={handleChange}
          type="date"
        />
        <Input
          name="published_at_lte"
          notRequired
          label="published_at to"
          value={localFilters?.published_at_lte ?? ""}
          onChange={handleChange}
          type="date"
        />
      </div>
      <div className="btns">
        <Button onClick={handleSave}>save</Button>
        <Button btnStyleType="transparent" btnType="cancel" onClick={onClose}>
          cancel
        </Button>
      </div>
    </PopUp>
  );
};

export default PostFilters;
