import type { Database } from 'shared/api';
import type { KeysToCamelCase } from 'shared/lib/transform';

export type RawMembersByJoinId = Database['public']['Functions']['get_group_members_by_join_id']['Returns'][0];

export type MembersByJoinId = KeysToCamelCase<RawMembersByJoinId>;
