import type { DateTime } from 'luxon';

import type { KeysToCamelCase } from 'shared/lib/transform';

export type UserRaw = {
  id: number;
  auth_id: string;
  name: string;
  email: string;
  avatar_url?: string;
  group_id?: number;
  created_at: string;
};

export type User = KeysToCamelCase<Omit<UserRaw, 'created_at'>> & {
  createdAt: DateTime;
};
