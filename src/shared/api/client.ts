import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { API_URL } from 'shared/config';
import { ACCESS_TOKEN_STORAGE_KEY, storage, useAppStore } from 'shared/model';

import { refreshAccessToken } from './endpoints/refreshAccessToken';

const INSTANCE_TIMEOUT = 3000;
const INSTANCE_HEADER = {
  'Content-Type': 'application/json',
};

export const client = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: INSTANCE_TIMEOUT,
  headers: INSTANCE_HEADER,
});

client.interceptors.request.use((config) => {
  const accessToken = storage.getString(ACCESS_TOKEN_STORAGE_KEY);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig<unknown> & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        return client.request(originalRequest);
      } catch {
        useAppStore.getState().removeTokens();
        throw new Error('Session expired');
      }
    }
  }
);
