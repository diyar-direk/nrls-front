import axiosInstance from "./axios";

class APIClient {
  constructor(endPoint) {
    this.endPoint = endPoint;
  }
  getAll = async ({ page = 1, sort = {}, limit = 10, ...params }) => {
    const sortStatus = sort
      ? Object.values(sort)
          .filter((v) => v && v.trim() !== "")
          .join(",")
      : "";

    const allParams = {
      ...params,
      page,
      limit,
    };

    if (sortStatus) allParams.sort = sortStatus;

    const paramFilters = new URLSearchParams();

    Object.entries(allParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;

      if (Array.isArray(value)) {
        const cleanedArray = value
          .map((v) => v?._id ?? v?.value ?? v)
          .filter((v) => v !== null && v !== undefined && v !== "");

        if (cleanedArray.length > 0) {
          paramFilters.append(key, cleanedArray.join(","));
        }
      } else {
        paramFilters.append(key, value._id || value);
      }
    });

    const { data } = await axiosInstance.get(this.endPoint, {
      params: paramFilters,
    });

    const { totalCount, totalPages, data: d } = data;

    return {
      data: d || data,
      totalCount: totalCount || 0,
      limit,
      totalPages: totalPages || Math.floor(totalCount / limit),
    };
  };

  getOne = async (id) => {
    const { data } = await axiosInstance.get(`${this.endPoint}/${id}`);
    return data?.data || data;
  };
  deleteAll = async ({ ids }) => {
    await axiosInstance.delete(this.endPoint, { data: { ids } });
  };
  deleteOne = async (id) => {
    await axiosInstance.delete(`${this.endPoint}/${id}`);
  };
  addData = async (data) => {
    const res = await axiosInstance.post(this.endPoint, data);
    return res.data;
  };
  updateData = async ({ data, id }) => {
    const { data: res } = await axiosInstance.patch(
      `${this.endPoint}/${id}`,
      data,
    );

    return res.data;
  };
}
export default APIClient;
