import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import { MMKV } from 'react-native-mmkv';
import { TokenInstance, type Token } from 'src/types/token';

const storage = new MMKV();
const stateStorage: StateStorage = {
  setItem: (key, value) => {
    storage.set(key, value)
    return Promise.resolve()
  },
  getItem: (key) => {
    const value = storage.getString(key)
    return Promise.resolve(value ?? null)
  },
  removeItem: (key) => {
    storage.delete(key)
    return Promise.resolve()
  },
}


type AppState = {
  clearTokens: () => void;
  token: TokenInstance;
  setToken: (token: Token) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      clearTokens: () => set({ token: new TokenInstance() }),
      token: new TokenInstance(),
      setToken: (token: Token) => set({ token: new TokenInstance(token) })
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => stateStorage, {
        reviver: (key, value: any) => {
          if (value && value?.type === 'TokenInstance') {
            return new TokenInstance({
              accessToken: value.accessToken,
              refreshToken: value.refreshToken,
            });
          }
          return value;
        },
        replacer: (key, value: any) => {
          if (value instanceof TokenInstance) {
            return {
              type: 'TokenInstance',
              accessToken: value.accessToken,
              refreshToken: value.refreshToken,
            }
          }
          return value;
        }
      }),
    }
  )
);