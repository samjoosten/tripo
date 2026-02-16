import { DateTime } from 'luxon';

import type { User, UserRaw } from './user';

export const mapRawToUser = (userRaw: UserRaw): User => ({
  id: userRaw.id,
  authId: userRaw.auth_id,
  name: userRaw.name,
  email: userRaw.email,
  avatarUrl: userRaw.avatar_url,
  groupId: userRaw.group_id,
  createdAt: DateTime.fromISO(userRaw.created_at),
});
