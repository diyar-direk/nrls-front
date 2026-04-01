import { useMemo, useState } from "react";
import endPoints from "../../../../../constant/endPoints";
import { useInfiniteFetch } from "./../../../../../hooks/useInfiniteFetch";
import Input from "../../../../../components/inputs/Input";
import Button from "../../../../../components/buttons/Button";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faComment,
  faEllipsis,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { commentSchema } from "./../../../../../schema/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../../../../utils/ApiClient";
import ReadMoreText from "./../../../../../components/read_more/ReadMoreText";
import dateFormatter from "../../../../../utils/dateFormatter";
import { icons } from "../../../../../constant/icons";
import { colors } from "../../../../../constant/colors";

const api = new APIClient(endPoints.comment);

const PostComments = ({ id }) => {
  const { data, isLoading } = useInfiniteFetch({
    endPoint: `${endPoints.comment}by-post/${id}/`,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
      is_approved: false,
      post: id,
    },
    validationSchema: commentSchema,
    onSubmit: (v) => handleSubmit.mutate(v),
  });

  const results = useMemo(
    () => ({
      data: data?.pages?.flatMap((e) => e.data),
      count: data?.pages?.[0]?.totalCount,
    }),
    [data],
  );
  const query = useQueryClient();

  const handleSubmit = useMutation({
    mutationFn: (d) => api.addData(d),
    onSuccess: () => {
      query.invalidateQueries(endPoints.comment);
      formik.resetForm();
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="comments">
      <div className="title-container border-bottom">
        <h3>
          <FontAwesomeIcon icon={faComment} /> comments
        </h3>
        <p data-count={results?.count}> comment </p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex-container">
          <Input
            name="name"
            errorText={formik.errors.name}
            value={formik.values.name}
            placeholder="write your name"
            label="your name"
            onChange={formik.handleChange}
          />
          <Input
            name="email"
            errorText={formik.errors.email}
            value={formik.values.email}
            placeholder="write your email"
            label="your email"
            onChange={formik.handleChange}
          />
        </div>
        <Input
          name="comment"
          errorText={formik.errors.comment}
          value={formik.values.comment}
          placeholder="write your comment"
          label="your comment"
          onChange={formik.handleChange}
          elementType="textarea"
          rows={5}
        />
        <div className="btn-container">
          <Button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} /> submit comment
          </Button>
        </div>
      </form>

      <div className="comment-container">
        {results?.data?.map((e) => (
          <div key={e.id} className="comment">
            {isOpen && (
              <div className="actions">
                <FontAwesomeIcon icon={faEllipsis} className="menu" />
                <div>
                  <p>
                    <FontAwesomeIcon icon={icons.delete} />
                    delete
                  </p>
                  {e.is_approved ? (
                    <p>
                      <FontAwesomeIcon icon={faCircleXmark} />
                      reject
                    </p>
                  ) : (
                    <p className="accept">
                      <FontAwesomeIcon icon={faCircleCheck} />
                      accept
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="date-container">
              <h4> {e.name} </h4>
              {!e.is_approved && (
                <span
                  style={{
                    color: colors.red.color,
                    background: colors.red.bg,
                  }}
                >
                  not approved
                </span>
              )}
              <p>{dateFormatter(e.created_at, "fullDate")}</p>
            </div>
            <a href={`mailto:${e.email}`}>{e.email} </a>
            <ReadMoreText word={e.comment} letters={220} />
          </div>
        ))}
        {isLoading && (
          <div className="comment-loader">
            <span></span>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostComments;
