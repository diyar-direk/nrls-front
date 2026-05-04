import { useQuery } from "@tanstack/react-query";
import endPoints from "./../../../../../constant/endPoints";
import axiosInstance from "../../../../../utils/axios";
import Skeleton from "./../../../../../components/skeleton/Skeleton";
import Breadcrumbs from "./../../../../../components/breadcrumbs/Breadcrumbs";
import "../style/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeanpub } from "@fortawesome/free-brands-svg-icons";
import { icons } from "./../../../../../constant/icons";
import { faEye, faLanguage, faPause } from "@fortawesome/free-solid-svg-icons";
import { getPercent } from "./../../../../../utils/getPercent";
import { languages } from "../../../../../constant/languages";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import Input from "../../../../../components/inputs/Input";

const Statistics = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState({});

  const { data, isLoading } = useQuery({
    queryKey: [endPoints.statistics, filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get(endPoints.statistics, {
        params: filters,
      });
      return data?.data || null;
    },
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
  }, []);

  if (isLoading) return <Skeleton height="300px" />;

  return (
    <>
      <Breadcrumbs />

      <section className="statistic-filters">
        <Input
          notRequired
          label={t("common.from")}
          name="created_at_gte"
          value={filters.created_at_gte ?? ""}
          type="date"
          onChange={handleChange}
        />
        <Input
          notRequired
          label={t("common.to")}
          name="created_at_lte"
          value={filters.created_at_lte ?? ""}
          type="date"
          onChange={handleChange}
        />
      </section>

      <section className="statistic-counts">
        <div className="count-container">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={icons.posts} />
          </div>
          <div className="count-info">
            <p>{t("statistics.total_posts")}</p>
            <h3>{data?.total_posts || 0}</h3>
          </div>
        </div>

        <div className="count-container">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faLeanpub} />
          </div>
          <div className="count-info">
            <p>{t("statistics.published_posts")}</p>
            <h3>{data?.published_posts || 0}</h3>
          </div>
        </div>

        <div className="count-container">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faPause} />
          </div>
          <div className="count-info">
            <p>{t("statistics.draft_posts")}</p>
            <h3>{data?.draft_posts || 0}</h3>
          </div>
        </div>

        <div className="count-container">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faEye} />
          </div>
          <div className="count-info">
            <p>{t("statistics.total_views")}</p>
            <h3>{data?.total_views || 0}</h3>
          </div>
        </div>
      </section>

      <section className="statistic-details">
        <div className="statistic-container by-language">
          <h2>
            <FontAwesomeIcon icon={faLanguage} />
            {t("statistics.posts_by_language")}
          </h2>

          {Object.entries(data?.by_language)?.map(([key, value]) => {
            const percent =
              value > 0 ? getPercent(value, data?.total_posts).toFixed(1) : 0;
            const search = key.toLowerCase();
            const lang = languages.find(
              (lang) => lang.value.toLowerCase() === search,
            );

            return (
              <div className="percent" key={key}>
                <p>{lang?.title}</p>
                <div data-percent={`${percent}%`}>
                  <span style={{ width: `${percent}%` }}></span>
                </div>
                <h3>{value}</h3>
              </div>
            );
          })}
        </div>

        <div className="statistic-container">
          <h2>
            <FontAwesomeIcon icon={icons.category} />
            {t("statistics.posts_by_type")}
          </h2>

          {Object.entries(data?.by_content_type)?.map(([key, value]) => {
            const percent =
              value > 0 ? getPercent(value, data?.total_posts).toFixed(1) : 0;

            return (
              <div className="percent" key={key}>
                <p>{key}</p>
                <div data-percent={`${percent}%`}>
                  <span style={{ width: `${percent}%` }}></span>
                </div>
                <h3>{value}</h3>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Statistics;
