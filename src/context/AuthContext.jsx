import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AuthHelper from "../utils/authHelper";
import Loading from "./../components/loading/Loading";
import { Outlet, useNavigate } from "react-router";
import axiosInstance from "../utils/axios";
import { extarctErrorMessage } from "../utils/extarctErrorMessage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import endPoints from "../constant/endPoints";

const AuthContext = createContext();
const authHelper = new AuthHelper();

export const AuthProvider = () => {
  const [loading, setLoading] = useState(false);
  const isAuthenticated = authHelper.isAuthenticated();
  const nav = useNavigate();

  const query = useQueryClient();

  const login = useCallback(
    (data) => {
      authHelper.setToken(data.access_token);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
      query.clear();
    },
    [query],
  );

  const logout = useCallback(async () => {
    await axiosInstance.post(endPoints.logout);
    nav("/");
    authHelper.clearToken();
    setTimeout(() => query.clear(), 500);
  }, [query, nav]);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (authHelper.isAuthenticated()) {
          config.headers.Authorization = `Bearer ${authHelper.getToken()}`;
        }

        if (config.method !== "get") {
          setLoading(true);
        }
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
      (error) => {
        setLoading(false);

        const { message: err } = error.response.data;

        if (typeof err === "string") {
          const message = extarctErrorMessage(error);
          enqueueSnackbar(message, { variant: "error" });
        } else if (typeof err === "object") {
          Object.values(err)?.map((e) => {
            if (typeof e === "string") enqueueSnackbar(e, { variant: "error" });
            else if (Array.isArray(e)) {
              e.map((m) => enqueueSnackbar(m, { variant: "error" }));
            }
          });
        }

        if (error.response?.status === 401) {
          logout();
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
    queryKey: ["me/"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("me/");
      return data || null;
    },
    enabled: isAuthenticated,
  });

  if (isLoading) return <Loading />;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Outlet />
      {loading && <Loading />}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
