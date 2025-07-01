import type { PropsWithChildren } from 'react';

import { useCacheAssets } from './use-cache-assets';

export const InitProvider = ({ children }: PropsWithChildren) => {
  const fontsLoaded = useCacheAssets();

  if (!fontsLoaded) return null;

  return children;
};