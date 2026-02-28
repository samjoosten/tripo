import type { RawMembersByJoinId, MembersByJoinId } from './membersByJoinId';

export const mapRawToMembersByJoinId = (raw: RawMembersByJoinId): MembersByJoinId => ({
  groupId: raw.group_id,
  groupName: raw.group_name,
  avatarUrl: raw.avatar_url,
  userId: raw.user_id,
  userName: raw.user_name,
  isGroupOwner: raw.is_group_owner,
});
