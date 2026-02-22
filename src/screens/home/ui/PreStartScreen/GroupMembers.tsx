import { StyleSheet, View } from 'react-native';

import { GroupMemberSlot, useGroupMembersQuery } from 'entities/group';
import { isQuerySuccess } from 'shared/lib/query-guard';
import { sv } from 'shared/lib/theme';
import Row from 'shared/ui/Row';

const JOIN_SLOTS = 8;

const GroupMembersSkeleton = () => {
  return (
    <Row spacing='spacing.zero' justify='center' style={styles.container}>
      {Array.from({ length: JOIN_SLOTS }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={index} style={styles.joinSlotContainer}>
          <GroupMemberSlot isLoading />
        </View>
      ))}
    </Row>
  );
};

const GroupMembers = () => {
  const groupMembersQuery = useGroupMembersQuery();

  if (!isQuerySuccess(groupMembersQuery)) {
    return <GroupMembersSkeleton />;
  }

  const { data: groupMembers } = groupMembersQuery;

  return (
    <Row spacing='spacing.zero' justify='center' style={styles.container}>
      {groupMembers.map((member) => (
        <View key={member.email} style={styles.joinSlotContainer}>
          <GroupMemberSlot name={member.name} avatarUrl={member.avatarUrl} />
        </View>
      ))}
      {Array.from({ length: Math.max(0, JOIN_SLOTS - groupMembers.length) }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={index} style={styles.joinSlotContainer}>
          <GroupMemberSlot isEmpty />
        </View>
      ))}
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
  },
  joinSlotContainer: {
    margin: sv('spacing.xs'),
  },
});

export default GroupMembers;
