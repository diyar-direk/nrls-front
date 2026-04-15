import axios from "axios";

export const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
<<<<<<< HEAD
  withCredentials: true,
=======
  withCredentials: true,  
  headers: {
    'Content-Type': 'application/json',
  },
>>>>>>> e37cc5a (tran.. v1)
});


export default axiosInstance;