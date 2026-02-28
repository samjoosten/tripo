import { StyleSheet, View } from 'react-native';

import { GroupMemberSlot } from 'entities/group';
import { ProfileAvatar } from 'entities/user';

const MAX_MEMBERS_TO_PREVIEW = 8;
const AVATAR_SIZE = 100;

type Props = {
  members: Array<{
    userName: string;
    avatarUrl: string | null;
  }>;
  owner: {
    userName: string;
    avatarUrl: string | null;
  };
};

const MembersPreview = ({ members, owner }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.memberContainer}>
        {Array.from({ length: MAX_MEMBERS_TO_PREVIEW / 2 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <View key={index} style={{ left: index === 0 || index === MAX_MEMBERS_TO_PREVIEW / 2 - 1 ? 30 : -15 }}>
            <GroupMemberSlot
              name={members[index]?.userName}
              avatarUrl={members[index]?.avatarUrl}
              isEmpty={!members[index]}
              size={40}
            />
          </View>
        ))}
      </View>
      <ProfileAvatar name={owner.userName} avatarUrl={owner.avatarUrl} size={AVATAR_SIZE} />
      <View style={styles.memberContainer}>
        {Array.from({ length: MAX_MEMBERS_TO_PREVIEW / 2 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <View key={index} style={{ right: index === 0 || index === MAX_MEMBERS_TO_PREVIEW / 2 - 1 ? 30 : -15 }}>
            <GroupMemberSlot
              name={members[index + MAX_MEMBERS_TO_PREVIEW / 2]?.userName}
              avatarUrl={members[index + MAX_MEMBERS_TO_PREVIEW / 2]?.avatarUrl}
              isEmpty={!members[index + MAX_MEMBERS_TO_PREVIEW / 2]}
              size={40}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberContainer: {
    rowGap: 10,
  },
});
export default MembersPreview;
