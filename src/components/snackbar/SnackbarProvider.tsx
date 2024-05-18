import { createContext, useState } from 'react';
import type { Snackbar, SnackbarContextValues } from './snackbar.types';

export const SnackbarContext = createContext<SnackbarContextValues>({} as SnackbarContextValues);

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [snackbar, setSnackbar] = useState<Snackbar | null>();

  const showSnackbar = ({message, type, duration }: Snackbar) => {
    setSnackbar({ message, type, duration });
  };

  const closeSnackbar = () => {
    setSnackbar(null);
  };

  return (
    <SnackbarContext.Provider value={{ snackbar, showSnackbar, closeSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
}

export default SnackbarProvider;