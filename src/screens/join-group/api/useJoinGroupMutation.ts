import { useMutation, useQueryClient } from '@tanstack/react-query';

import { group } from 'entities/group';
import { users } from 'entities/user';
import { supabase } from 'shared/api';
import { useAuth } from 'shared/auth';

export const useJoinGroupMutation = () => {
  const authId = useAuth().claims?.sub;
  const queryClient = useQueryClient();

  const joinGroup = async (groupId: number) => {
    const { error } = await supabase.from('users').update({ group_id: groupId }).eq('auth_id', authId!);

    if (error) {
      console.error('Error joining group:', error);
      throw error;
    }

    await Promise.all([
      queryClient.invalidateQueries(users.current(authId!)),
      queryClient.invalidateQueries(group.current),
      queryClient.invalidateQueries(group.members),
    ]);
  };

  return useMutation({
    mutationFn: joinGroup,
  });
};
