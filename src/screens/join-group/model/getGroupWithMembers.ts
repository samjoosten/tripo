import type { QueryObserverSuccessResult } from '@tanstack/react-query';

import type { MembersByJoinId } from 'entities/group';

export const getGroupWithMembers = (query: QueryObserverSuccessResult<Array<MembersByJoinId>>) => {
  const { data: groupMembers } = query;

  const owner = groupMembers.find((member) => member.isGroupOwner);

  return {
    groupId: groupMembers[0].groupId,
    groupName: groupMembers[0].groupName,
    ownerUser: {
      userId: owner!.userId,
      userName: owner!.userName,
      avatarUrl: owner!.avatarUrl,
    },
    members: groupMembers
      .filter((member) => !member.isGroupOwner)
      .map((member) => ({
        userId: member.userId,
        userName: member.userName,
        avatarUrl: member.avatarUrl,
      })),
  };
};
