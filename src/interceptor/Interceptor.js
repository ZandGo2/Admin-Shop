import axios from "axios";
import { notify } from "../utils/notify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.status == 401) {
      const messageError = error.response.data.message;
      notify("error", messageError);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    if (error.response && error.status == 400) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
