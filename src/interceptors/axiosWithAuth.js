import axios from "axios";
import { API_URL } from "../config";

const axiosWithAuth = axios.create({
  baseURL: API_URL,
});

axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosWithAuth;
