import axios, { AxiosError, type AxiosResponse } from "axios";
import { BASE_URL } from "./config/config";
import { useAppStore } from "./store/store";
import type { Token } from "./types/token";
import { router } from "expo-router";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = useAppStore.getState().token.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && originalRequest?.url === `${BASE_URL}/token/refresh`) {
      router.replace('/(public)/login');
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && originalRequest && !originalRequest?._retry) {
      originalRequest._retry = true;
      const refreshToken = useAppStore.getState().token.refreshToken;
      const accessToken = useAppStore.getState().token.accessToken;
      const res: AxiosResponse<Token> = await axiosInstance.post(`${BASE_URL}/token/refresh`, { accessToken, refreshToken });
      if (res.status === 200) {
        useAppStore.getState().setToken(res.data);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;