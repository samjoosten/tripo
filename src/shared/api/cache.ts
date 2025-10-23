import type { MMKV } from 'react-native-mmkv';

export class Cache {
  private storage: MMKV;

  constructor(storage: MMKV) {
    this.storage = storage;
  }

  getItem(key: string) {
    return this.storage.getString(key) ?? null;
  }

  setItem(key: string, value: string) {
    return this.storage.set(key, value);
  }

  removeItem(key: string) {
    if (this.storage.contains(key)) {
      this.storage.delete(key);
    }
  }
}
