import { useEffect, type PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';

import { useAppStore } from 'shared/model';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const setTheme = useAppStore((state) => state.setTheme);
  const deviceColorScheme = useColorScheme();

  useEffect(() => {
    if (deviceColorScheme) {
      setTheme(deviceColorScheme);
    }
  }, [deviceColorScheme]);

  return children;
};

export default ThemeProvider;
