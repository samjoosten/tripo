import { useQuery } from '@tanstack/react-query';

import { supabase } from 'shared/api';
import { STALE_TIMES } from 'shared/config';

import { group } from '../queryFactory';

import { mapRawToGroupMember } from './mapRawToGroupMember';

export const useGroupMembersQuery = () => {
  const getGroupMembersQuery = async () => {
    const { data, error } = await supabase.rpc('get_my_group_members');
    if (error) {
      throw error;
    }

    if (!data) return [];

    return data.map(mapRawToGroupMember);
  };

  return useQuery({
    ...group.members,
    queryFn: getGroupMembersQuery,
    staleTime: STALE_TIMES.ONE_HOUR,
    retry: false,
  });
};
