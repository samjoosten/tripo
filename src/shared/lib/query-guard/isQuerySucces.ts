import type { UseQueryResult } from '@tanstack/react-query';

type SuccessQueryResult<T> = UseQueryResult<T> & {
  status: 'success';
  data: T;
};

export const isQuerySuccess = <T>(query: UseQueryResult<T>): query is SuccessQueryResult<T> => {
  return query.status === 'success';
};
