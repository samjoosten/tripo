import { DateTime } from 'luxon';

import type { Group, GroupRaw } from './group';

export const mapRawToGroup = (raw: GroupRaw): Group => ({
  id: raw.id,
  name: raw.name,
  challengeRotationDatetime: DateTime.fromISO(raw.challenge_rotation_datetime),
  joinId: raw.join_id,
});
