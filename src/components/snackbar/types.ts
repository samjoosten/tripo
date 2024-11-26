export type SnackbarContextValues = {
  snackbar: Snackbar | null | undefined;
  showSnackbar: (params: Snackbar) => void;
  closeSnackbar: () => void;
}
export enum SnackbarType {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning'
}
export type Snackbar = {
  message: string;
  type: SnackbarType;
  duration?: number;
}