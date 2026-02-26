import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AuthHelper from "../utils/authHelper";
import toast from "react-hot-toast";
import Loading from "./../components/loading/Loading";
import { Outlet } from "react-router";
import axiosInstance from "../utils/axios";
import { extarctErrorMessage } from "../utils/extarctErrorMessage";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();
const authHelper = new AuthHelper();

export const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const isAuthenticated = authHelper.isAuthenticated();

  const query = useQueryClient();

  const login = useCallback(
    (data) => {
      setUser(data.data);
      authHelper.setToken(data.token);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      query.clear();
    },
    [setUser, query],
  );

  const logout = useCallback(() => {
    setUser(null);
    authHelper.clearToken();
    setTimeout(() => query.clear(), 500);
  }, [query]);

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

          toast.success(message);
        }
        return response;
      },
      (error) => {
        setLoading(false);

        const message = extarctErrorMessage(error);

        toast.error(message);
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

  const getUserDetails = useCallback(async () => {
    if (isAuthenticated && !user) {
      setUserLoading(true);
      const { data } = await axiosInstance.get("test");
      setUser(data.data);
    }
    setUserLoading(false);
  }, [isAuthenticated, user]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  if (userLoading) return <Loading />;

  return (
    <AuthContext.Provider value={{ user, login, logout, userLoading, setUser }}>
      <Outlet />
      {loading && <Loading />}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
