import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
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

  const isRefreshing = useRef(false);
  const failedQueue = useRef([]);

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post(endPoints.logout);
    } catch {
    } finally {
      query.clear();
      nav("/");
    }
  }, [query, nav]);

  const processQueue = (error, token = null) => {
    failedQueue.current.forEach(({ resolve, reject }) => {
      if (error) reject(error);
      else resolve(token);
    });
    failedQueue.current = [];
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
        const status = error.response?.status;
        const { url } = originalRequest || {};

        if (
          url === endPoints.me ||
          url === endPoints.refresh ||
          url === endPoints.logout
        ) {
          return Promise.reject(error);
        }

        if (status === 401 && !originalRequest._retry) {
          if (isRefreshing.current) {
            return new Promise((resolve, reject) => {
              failedQueue.current.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                return axiosInstance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshing.current = true;

          try {
            const { data } = await axiosInstance.post(endPoints.refresh);
            const newToken = data.access_token;

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
            isRefreshing.current = false;
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
    refetchOnWindowFocus: false,
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
