import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Appearance } from 'react-native';

import { storage, zustandStorage } from './storage';

export const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
export const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';

type AppState = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (token: string | null) => void;
  addTokens: (accessToken: string, refreshToken: string) => void;
  removeTokens: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      refreshToken: null,
      setRefreshToken: (token) => set({ refreshToken: token }),
      addTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
        storage.set(ACCESS_TOKEN_STORAGE_KEY, accessToken);
        storage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
      },
      removeTokens: () => {
        set({ accessToken: null, refreshToken: null });
        storage.delete(ACCESS_TOKEN_STORAGE_KEY);
        storage.delete(REFRESH_TOKEN_STORAGE_KEY);
      },
      theme: Appearance.getColorScheme() ?? 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
