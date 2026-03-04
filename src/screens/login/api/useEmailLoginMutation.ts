import { useMutation } from '@tanstack/react-query';

import { supabase } from 'shared/api';

export const useEmailLoginMutation = () => {
  const emailLogin = async (data: { email: string; password: string; joinGroupId?: number }) => {
    const { data: loginData, error } = await supabase.auth.signInWithPassword({
      email: data.email.trim(),
      password: data.password,
    });

    if (error) {
      console.error('Email login error:', error);
      throw error;
    }

    if (data.joinGroupId && loginData.user.id) {
      const { error: joinError } = await supabase
        .from('users')
        .update({ group_id: data.joinGroupId })
        .eq('auth_id', loginData.user.id);
      if (joinError) {
        console.error('Join group error:', joinError);
        throw joinError;
      }
    }
  };

  return useMutation({
    mutationFn: emailLogin,
  });
};
