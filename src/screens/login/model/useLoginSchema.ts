import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

export const useLoginSchema = () => {
  const { t } = useTranslation();

  const loginSchema = useMemo(() => {
    return z
      .object({
        email: z.email(t('form.validation.email', { field: t('login.labels.email') })),
        password: z.string(t('form.validation.required', { field: t('login.labels.password') })),
      })
      .required();
  }, [t]);

  return loginSchema;
};
export type LoginSchema = z.infer<ReturnType<typeof useLoginSchema>>;
