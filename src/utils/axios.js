import axios from "axios";

export const baseURL = `http://192.168.2.108:8000/api/`;

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
