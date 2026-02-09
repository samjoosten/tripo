import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

export const useRegistrationSchema = () => {
  const { t } = useTranslation();

  const registrationSchema = useMemo(() => {
    return z
      .object({
        name: z.string(t('form.validation.required', { field: t('register.labels.name') })),
        email: z.email(t('form.validation.email', { field: t('register.labels.email') })),
        password: z
          .string(t('form.validation.required', { field: t('register.labels.password') }))
          .min(6, t('form.validation.minLength', { field: t('register.labels.password'), min: 6 }))
          .max(100, t('form.validation.maxLength', { field: t('register.labels.password'), max: 100 })),
      })
      .required();
  }, [t]);

  return registrationSchema;
};

export type RegistrationSchema = z.infer<ReturnType<typeof useRegistrationSchema>>;
