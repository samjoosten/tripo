import { useMutation } from '@tanstack/react-query';

import { supabase } from 'shared/api';

import type { RegistrationSchema } from '../model/useRegistrationSchema';

export const useRegisterMutation = () => {
  const register = async ({ name, email, password, joinGroupId }: RegistrationSchema & { joinGroupId?: number }) => {
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

    if (joinGroupId && session?.user?.id) {
      const { error: joinError } = await supabase
        .from('users')
        .update({ group_id: joinGroupId })
        .eq('auth_id', session?.user?.id);
      if (joinError) {
        console.error('Join group error:', joinError);
        throw joinError;
      }
    }

    return { session, error };
  };

  return useMutation({
    mutationFn: register,
  });
};
