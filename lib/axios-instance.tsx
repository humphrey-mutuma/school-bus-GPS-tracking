import useAuthStore from "@/stores/auth-store";
import axios from "axios";

const APIS_BASE_URL = process.env.NEXT_PUBLIC_APIS_BASE_URL;

export const axiosInstanceInsecure = axios.create({
  baseURL: APIS_BASE_URL,
});
// Axios instance with interceptors
export const axiosInstance = axios.create({
  baseURL: APIS_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log("accessToken dd");
    const { setAccessToken, setRefToken, accessToken, refToken, logOut } =
      useAuthStore.getState();

    if (!accessToken || !refToken) {
      logOut();
      window.location.href = "/auth";
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
