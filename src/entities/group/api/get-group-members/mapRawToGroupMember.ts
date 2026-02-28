import type { GroupMember, GroupMemberRaw } from './groupMember';

export const mapRawToGroupMember = (raw: GroupMemberRaw): GroupMember => ({
  avatarUrl: raw.avatar_url,
  email: raw.email,
  name: raw.name,
});
