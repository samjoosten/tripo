import { MMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

export const storage = new MMKV();

export const zustandStorage: StateStorage = {
  getItem: (name) => {
    const value = storage.getString(name);
    return Promise.resolve(value ?? null);
  },
  setItem: (name, value) => {
    storage.set(name, JSON.stringify(value));
    return Promise.resolve();
  },
  removeItem: (name) => {
    storage.delete(name);
    return Promise.resolve();
  },
};
