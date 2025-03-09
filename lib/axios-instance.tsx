import useAuthStore from "@/stores/auth-store";
import axios from "axios";

const APIS_BASE_URL = `http://192.168.45.216:5000`;

export const axiosInstanceInsecure = axios.create({
  baseURL: APIS_BASE_URL,
});
// Axios instance with interceptors
export const axiosInstance = axios.create({
  baseURL: APIS_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { setAccessToken, setRefToken, accessToken, refToken, logOut } =
      useAuthStore.getState();

    if (!accessToken || !refToken) {
      logOut();
      window.location.href = "/verify-password";
      return Promise.reject(new Error("Refresh token expired"));
    }

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);
