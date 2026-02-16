import { createQueryKeys } from '@lukemorales/query-key-factory';

export const users = createQueryKeys('users', {
  current: (authId: string) => [authId],
});
