import { useQuery } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import axiosInstance from "../../../../../utils/axios";
import "../style/files.css";
import dateFormatter from "../../../../../utils/dateFormatter";
import imgServerSrc from "../../../../../utils/imgServerSrc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ImgViewPopup from "../../../../../components/popup/ImgViewPopup";

const ViewFiles = ({ id, t }) => {
  const { data } = useQuery({
    queryKey: [endPoints.postFiles, id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`${endPoints.postFiles}${id}/`);
      return data.data;
    },
  });

  const [opendImg, setOpendImg] = useState(null);
  if (data?.length === 0) return;

  return (
    <>
      <div className="view-files-container border-bottom">
        <h2>{t("pages.files")}</h2>
        {data?.map((e) => {
          const { id, alt_text, caption, created_at, file_type, src_url } = e;
          const isImg = file_type === "image";

          return (
            <div key={id} className="file">
              <div className="img">
                {isImg ? (
                  <img
                    src={imgServerSrc(src_url)}
                    alt={alt_text}
                    onClick={() => setOpendImg(imgServerSrc(src_url))}
                  />
                ) : (
                  <iframe src={imgServerSrc(src_url)}>{alt_text}</iframe>
                )}
              </div>
              <div className="body">
                {caption && <span>{caption}</span>}

                <div>
                  <article>
                    <h4 className="colon-after"> {t("common.created_at")} </h4>
                    <p> {dateFormatter(created_at)} </p>
                  </article>

                  {!isImg && (
                    <a href={src_url} target="_blank">
                      <FontAwesomeIcon icon={faLink} /> {t("common.show")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ImgViewPopup src={opendImg} onClose={() => setOpendImg(null)} />
    </>
  );
};

export default ViewFiles;
