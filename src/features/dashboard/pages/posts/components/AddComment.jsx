import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../../components/buttons/Button";
import Input from "../../../../../components/inputs/Input";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { commentSchema } from "../../../../../schema/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import endPoints from "../../../../../constant/endPoints";

const AddComment = ({ id, api, handleShowAddForm }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
      is_approved: true,
      post: id,
    },
    validationSchema: commentSchema,
    onSubmit: (v) => handleSubmit.mutate(v),
  });

  const query = useQueryClient();

  const handleSubmit = useMutation({
    mutationFn: (d) => api.addData(d),
    onSuccess: () => {
      query.invalidateQueries(endPoints.comment);
      formik.resetForm();
      handleShowAddForm();
    },
  });

  return (
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
  );
};

export default AddComment;
