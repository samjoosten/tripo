import type { DateTime } from 'luxon';

import type { Database } from 'shared/api';
import type { KeysToCamelCase } from 'shared/lib/transform';

export type GroupRaw = Database['public']['Functions']['get_my_group']['Returns'][0];

export type Group = KeysToCamelCase<Omit<GroupRaw, 'challenge_rotation_datetime'>> & {
  challengeRotationDatetime: DateTime;
};
