import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { supabase } from 'shared/api';
import { useAuth } from 'shared/auth';
import { STALE_TIMES } from 'shared/config';

import { mapRawToUser } from './mapRawToUser';
import { users } from './queryFactory';
import type { User } from './user';

export const useCurrentUserQuery = <T = User>(opts?: Omit<UseQueryOptions<User, Error, T>, 'queryKey' | 'queryFn'>) => {
  const { claims } = useAuth();

  const getCurrentUser = async () => {
    const { data, error } = await supabase.from('users').select('*').eq('auth_id', claims!.sub).single();
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
    ...opts,
  });
};
