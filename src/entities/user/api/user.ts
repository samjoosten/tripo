import type { DateTime } from 'luxon';

import type { Database } from 'shared/api';
import type { KeysToCamelCase } from 'shared/lib/transform';

export type UserRaw = Database['public']['Tables']['users']['Row'];

export type User = KeysToCamelCase<Omit<UserRaw, 'created_at'>> & {
  createdAt: DateTime;
};
