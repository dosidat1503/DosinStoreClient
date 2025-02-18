import axios from "axios";
import Cookies from "js-cookie";
import { logout, setTokens } from "./token";

interface RefreshToken {
  access_token: string;
  expires_in: number;
}

const request = axios.create({
  baseURL: "https://dosinstoresever.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("auth_token");
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      request
        .post<unknown, RefreshToken>("/api/refreshAccessToken", {
          refreshToken: Cookies.get("refreshToken"),
          email: localStorage.getItem("email"),
        })
        .then((res) => {
          const { access_token } = res;

          setTokens([
            {
              token: access_token,
              type: "accessToken",
            },
          ]);
          request.defaults.headers.common["Authorization"] = `Bearer ${res.access_token}`;
        })
        .catch((error) => {
          throw error;
        });

      return request(originalRequest);
    } else if (originalRequest._retry) {
      logout();
    }
  },
);

request.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default request;
