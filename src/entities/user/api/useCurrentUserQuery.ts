import { useQuery } from '@tanstack/react-query';

import { supabase } from 'shared/api';
import { useAuth } from 'shared/auth';
import { STALE_TIMES } from 'shared/config';

import type { UserRaw } from './user';
import { users } from './queryFactory';
import { mapRawToUser } from './mapRawToUser';

export const useCurrentUserQuery = () => {
  const { claims } = useAuth();

  const getCurrentUser = async () => {
    const { data, error } = await supabase.from('users').select('*').eq('auth_id', claims?.sub).single<UserRaw>();
    if (error) {
      throw error;
    }
    if (!data) {
      throw new Error('User not found');
    }
    return mapRawToUser(data);
  };

  return useQuery({
    ...users.current(claims?.sub || ''),
    queryFn: getCurrentUser,
    staleTime: STALE_TIMES.ONE_HOUR,
    enabled: !!claims?.sub,
  });
};
