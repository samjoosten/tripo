import type { PropsWithChildren } from 'react';

import { useCacheAssets } from './useCacheAssets';

export const InitProvider = ({ children }: PropsWithChildren) => {
  const fontsLoaded = useCacheAssets();

  if (!fontsLoaded) return null;

  return children;
};
