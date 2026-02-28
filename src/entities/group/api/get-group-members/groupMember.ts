import type { Database } from 'shared/api';
import type { KeysToCamelCase } from 'shared/lib/transform';

export type GroupMemberRaw = Database['public']['Functions']['get_my_group_members']['Returns'][number];

export type GroupMember = KeysToCamelCase<GroupMemberRaw>;
