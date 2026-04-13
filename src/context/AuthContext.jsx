import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import Loading from "./../components/loading/Loading";
import { Outlet, useNavigate } from "react-router";
import axiosInstance from "../utils/axios";
import { extarctErrorMessage } from "../utils/extarctErrorMessage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import endPoints from "../constant/endPoints";

const AuthContext = createContext();

export const AuthProvider = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const query = useQueryClient();

  const logout = useCallback(async () => {
    await axiosInstance.post(endPoints.logout);
    query.removeQueries();
    nav("/");
  }, [query, nav]);

  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
      if (error) reject(error);
      else resolve(token);
    });
    failedQueue = [];
  };

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (config.method !== "get") setLoading(true);
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      },
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        setLoading(false);
        if (response.config.method !== "get") {
          const message =
            response?.data?.message || "Operation done successfully";
          enqueueSnackbar(message, { variant: "success" });
        }
        return response;
      },
      async (error) => {
        setLoading(false);

        const originalRequest = error.config;
        const { url } = originalRequest;
        const status = error.response?.status;

        if (
          status === 401 &&
          url !== endPoints.logout &&
          !originalRequest._retry
        ) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                return axiosInstance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const { data } = await axiosInstance.post(endPoints.refresh);
            const newToken = data.accessToken;

            axiosInstance.defaults.headers.common["Authorization"] =
              `Bearer ${newToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            processQueue(null, newToken);
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            logout();
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        const { message: err } = error.response?.data || {};

        if (typeof err === "string") {
          enqueueSnackbar(extarctErrorMessage(error), { variant: "error" });
        } else if (typeof err === "object") {
          Object.values(err)?.forEach((e) => {
            if (typeof e === "string") enqueueSnackbar(e, { variant: "error" });
            else if (Array.isArray(e))
              e.forEach((m) => enqueueSnackbar(m, { variant: "error" }));
          });
        }

        if (status === 401 && url !== endPoints.logout) logout();

        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  const { data: user, isLoading } = useQuery({
    queryKey: [endPoints.me],
    queryFn: async () => {
      const { data } = await axiosInstance.get(endPoints.me);
      return data || null;
    },
    retry: false,
  });

  if (isLoading) return <Loading />;

  return (
    <AuthContext.Provider value={{ user, logout }}>
      <Outlet />
      {loading && <Loading />}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
