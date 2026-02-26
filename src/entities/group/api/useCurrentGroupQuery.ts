import { useQuery } from '@tanstack/react-query';

import { supabase } from 'shared/api';
import { STALE_TIMES } from 'shared/config';

import { mapRawToGroup } from './mapRawToGroup';
import { group } from './queryFactory';

export const useCurrentGroupQuery = () => {
  const getCurrentGroup = async () => {
    const { data, error } = await supabase.rpc('get_my_group').single();
    if (error) {
      throw error;
    }

    return mapRawToGroup(data);
  };

  return useQuery({
    ...group.current,
    queryFn: getCurrentGroup,
    staleTime: STALE_TIMES.ONE_HOUR,
  });
};
