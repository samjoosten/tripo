import { useQuery } from '@tanstack/react-query';

import { supabase } from 'shared/api';
import { STALE_TIMES } from 'shared/config';

import { group } from '../queryFactory';

import { mapRawToMembersByJoinId } from './mapRawToMembersByJoinId';

export const useGroupByJoinIdQuery = (joinId: string) => {
  const getGroupByJoinId = async () => {
    const { data, error } = await supabase.rpc('get_group_members_by_join_id', { p_join_id: joinId });
    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      throw new Error('No group found with the provided join ID');
    }

    return data.map(mapRawToMembersByJoinId);
  };

  return useQuery({
    ...group.byJoinId(joinId),
    queryFn: getGroupByJoinId,
    staleTime: STALE_TIMES.ONE_HOUR,
  });
};
