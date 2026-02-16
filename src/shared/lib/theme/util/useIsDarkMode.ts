import { useAppStore } from 'shared/model';

export const useIsDarkMode = () => {
  const theme = useAppStore((state) => state.theme);
  return theme === 'dark';
};
