import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";
import APIClient from "../../../../../utils/ApiClient";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../../../components/breadcrumbs/Breadcrumbs";
import Button from "../../../../../components/buttons/Button";
import { postSchema } from "./../../../../../schema/post";
import EditorSection from "./../components/EditorSection";
import { useEffect, useMemo, useState } from "react";
import InfoInputsSection from "./../components/InfoInputsSection";
import MoreInfoInputs from "./../components/MoreInfoInputs";
import "../style/style.css";
import PostTabs from "./../components/PostTabs";
import UploadPhoto from "../../../../../components/inputs/UploadPhoto";
import { formatInputsData } from "./../../../../../utils/formatInputsData";
import PostCard from "../../../../../components/post/PostCard";
import Skeleton from "../../../../../components/skeleton/Skeleton";
import HandleError from "./../../../../../components/error/HandleError";
import imgServerSrc from "../../../../../utils/imgServerSrc";
import dateFormatter from "../../../../../utils/dateFormatter";
import { mediaFileType } from "../../../../../constant/enums";
import { icons } from "../../../../../constant/icons";
import { mediaSchemaUpdate } from "../../../../../schema/mediaFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../../../../../utils/axios";
import UpdateFilesForm from "./../components/UpdateFilesForm";

const api = new APIClient(endPoints.posts);

const UpdatePost = () => {
  const { id } = useParams();

  const [tab, setTab] = useState("format");
  const { t, i18n } = useTranslation();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [endPoints.posts, id],
    queryFn: () => api.getOne(id),
  });

  const { data: media } = useQuery({
    queryKey: [endPoints.postFiles, id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`${endPoints.postFiles}${id}`);
      return data.data?.map((e) => ({
        ...e,
        external_url: e.file_type === "video" ? e.src_url : "",
      }));
    },
    enabled: tab === "files",
  });

  const language = useMemo(() => i18n.language, [i18n]);

  const formik = useFormik({
    initialValues: {
      featured_image: "",
      title: data?.title || "",
      excerpt: data?.excerpt || "",
      content: data?.content || "",
      original_post: data?.original_post || "",
      content_type: data?.content_type || "",
      category: data?.category || "",
      author: data?.author || "",
      language: data?.language || language,
      published_at: data?.published_at ? dateFormatter(data.published_at) : "",
      is_published: data?.is_published || true,
      tags: data?.tags || [],
    },
    validationSchema: postSchema,
    onSubmit: (d) => {
      if (Object.keys(mediaFormik.errors).length) return;
      const data = formatInputsData(d);
      const form = new FormData();

      Object.entries(data).map(([key, value]) => {
        if (key !== "featured_image") {
          form.append(key, value);
        }
      });

      if (d.featured_image?.file) {
        form.append("featured_image", d.featured_image.file);
      }

      handleConfirm.mutate(form);
    },
    enableReinitialize: true,
  });
  const query = useQueryClient();
  const nav = useNavigate();

  const handleConfirm = useMutation({
    mutationFn: (data) => api.updateData({ data, id }),
    onSuccess: () => {
      query.invalidateQueries([endPoints.posts]);
      handleAddFiles.mutate();
    },
  });

  useEffect(() => {
    if (!formik.values.original_post) return;

    const original = formik.values.original_post;

    formik.setValues((prev) => {
      const updated = { ...prev };

      updated.category = prev.category || original.category;
      updated.content_type = prev.content_type || original.content_type;
      updated.author = prev.author || original.author;
      updated.language = prev.language || original.language;
      updated.published_at = prev.published_at || original.published_at;
      updated.tags = prev.tags?.length > 0 ? prev.tags : original.tags;

      return updated;
    });
  }, [formik.values.original_post]);

  const defaultImg = useMemo(() => {
    const dataImg = data?.featured_image || data?.original_post?.featured_image;
    const { featured_image } = formik.values;
    return featured_image || dataImg;
  }, [data, formik.values]);

  const mediaFormik = useFormik({
    initialValues: {
      files: media || [],
    },
    validationSchema: mediaSchemaUpdate,
    enableReinitialize: true,
  });

  const addMediaFn = (file_type) => {
    const prev = mediaFormik.values.files || [];
    const newData = {
      file_type,
      external_url: "",
      alt_text: "",
      caption: "",
      src: "",
      post: id,
    };
    mediaFormik.setFieldValue("files", [...prev, newData]);
  };

  const handleAddFiles = useMutation({
    mutationFn: () => {
      const { files } = mediaFormik.values;

      if (files.length === 0) return true;

      files.map(async (e) => {
        const formData = new FormData();

        Object.entries(e).map(([key, value]) => {
          if (key !== "src") formData.append(key, value);
        });

        if (e.src?.file) formData.append("src", e.src?.file);

        if (e.id)
          await axiosInstance.patch(
            `${endPoints.mediaFiles}${e.id}/`,
            formData,
          );
        else await axiosInstance.post(endPoints.mediaFiles, formData);
      });
    },
    onSuccess: () => nav(-1),
  });

  if (isLoading) return <Skeleton height="300px" />;

  if (error) return <HandleError error={error} refetch={refetch} />;

  return (
    <>
      <Breadcrumbs replace={[{ from: id, text: data?.title }]} />

      <PostTabs errors={formik.errors} setTab={setTab} tab={tab}>
        <p
          className={`${tab === "files" ? "active" : ""} ${Object.keys(mediaFormik.errors)?.length ? "error" : ""}`}
          onClick={() => setTab("files")}
        >
          الملفات
        </p>
      </PostTabs>

      <form className="dashboard-form" onSubmit={formik.handleSubmit}>
        {tab === "format" && <EditorSection formik={formik} t={t} />}

        {tab === "info" && (
          <InfoInputsSection formik={formik} language={language} t={t} />
        )}

        {tab === "moreInfo" && <MoreInfoInputs formik={formik} t={t} />}
        {tab === "image" && (
          <UploadPhoto
            name="featured_image"
            title="featured_image"
            errorText={t(formik.errors?.featured_image)}
            notRequired
            value={formik.values.featured_image}
            onChange={(e) => formik.setFieldValue("featured_image", e)}
            className="post-cover-img"
            revoke={false}
            defaultImage={imgServerSrc(defaultImg)}
          />
        )}

        {tab === "view" && (
          <div className="posts-container">
            <PostCard
              data={formik.values}
              isDraft
              img={
                formik.values?.featured_image?.url || imgServerSrc(defaultImg)
              }
              showStatus={true}
            />
          </div>
        )}

        {tab === "files" && (
          <>
            <div className="add-file-container">
              {mediaFileType?.map((e) => (
                <p className="add-btn" key={e} onClick={() => addMediaFn(e)}>
                  <FontAwesomeIcon icon={icons[e]} /> add {e}
                </p>
              ))}
            </div>

            <UpdateFilesForm formik={mediaFormik} t={t} />
          </>
        )}

        <Button type="submit"> save </Button>
      </form>
    </>
  );
};

export default UpdatePost;
