import imgServerSrc from "./imgServerSrc";

export const postViewImg = (data) =>
  imgServerSrc(data?.featured_image || data?.original_post?.featured_image);
