import axios from 'axios';

import { API_URL } from 'shared/config/environment';
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY, storage, useAppStore } from 'shared/model';

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export const refreshAccessToken = async () => {
  const accessToken = storage.getString(ACCESS_TOKEN_STORAGE_KEY);
  const refreshToken = storage.getString(REFRESH_TOKEN_STORAGE_KEY);

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const response = await axios.post<RefreshTokenResponse>(`${API_URL}/token/refresh`, {
    accessToken,
    refreshToken,
  });

  if (response.data.accessToken) {
    useAppStore.getState().addTokens(response.data.accessToken, response.data.refreshToken);
  }

  return response;
};
