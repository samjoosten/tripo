import { useMutation } from '@tanstack/react-query';

import { supabase } from 'shared/api';

import type { RegistrationSchema } from '../model/useRegistrationSchema';

export const useRegisterMutation = () => {
  const register = async ({ name, email, password }: RegistrationSchema) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name,
        },
      },
    });

    return { session, error };
  };

  return useMutation({
    mutationFn: register,
  });
};
