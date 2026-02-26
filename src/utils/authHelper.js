import Cookies from "js-cookie";
class AuthHelper {
  isAuthenticated = () => Boolean(Cookies.get("access_token"));
  getToken = () => Cookies.get("access_token");
  setToken = (token) => Cookies.set("access_token", token);
  clearToken = () => Cookies.remove("access_token");
}

export default AuthHelper;
