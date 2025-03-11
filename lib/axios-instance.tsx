import useAuthStore from "@/stores/auth-store";
import axios from "axios";

const APIS_BASE_URL = "https://test-app-eu4v.onrender.com/api/";
// const APIS_BASE_URL = "http://192.168.89.216:5000/api/";
export const axiosInstanceInsecure = axios.create({
  baseURL: APIS_BASE_URL,
});
// Axios instance with interceptors
export const axiosInstance = axios.create({
  baseURL: APIS_BASE_URL,
});

// Request interceptor to attach Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken, userData } = useAuthStore.getState(); // Access Zustand state directly

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional) for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear user and redirect
      useAuthStore.getState().logOut();
      // Note: Can't use router here directly, handle in component
    }
    return Promise.reject(error);
  }
);
