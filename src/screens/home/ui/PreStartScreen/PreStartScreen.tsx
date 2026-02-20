import { StyleSheet, View } from 'react-native';

import { EmptyJoinSlot } from 'entities/group';
import { ProfileAvatar, useCurrentUserQuery } from 'entities/user';
import { sv } from 'shared/lib/theme';
import Column from 'shared/ui/Column';
import Row from 'shared/ui/Row';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ThemedText } from 'shared/ui/ThemedText';
import { TripoHeader } from 'widgets/ScreenHeader';
import { isQuerySuccess, QueryGuard } from 'shared/lib/query-guard';

export const PreStartScreen = () => {
  const userQuery = useCurrentUserQuery();

  if (!isQuerySuccess(userQuery)) {
    return <QueryGuard queries={[userQuery]} />;
  }

  const { data: user } = userQuery;

  return (
    <ScreenContent>
      <TripoHeader />
      <Column justify='center' align='center' spacing='spacing.lg' style={styles.container}>
        <ProfileAvatar name={user.name} avatarUrl={user.avatarUrl} />
        <ThemedText type='header'>Jouw groep</ThemedText>
        <Column spacing='spacing.m' align='center'>
          <Row spacing='spacing.zero' justify='center' style={{ flexWrap: 'wrap' }}>
            <View style={styles.joinSlotContainer}>
              <EmptyJoinSlot />
            </View>
            <View style={styles.joinSlotContainer}>
              <EmptyJoinSlot />
            </View>
            <View style={styles.joinSlotContainer}>
              <EmptyJoinSlot />
            </View>
            <View style={styles.joinSlotContainer}>
              <EmptyJoinSlot />
            </View>
            <View style={styles.joinSlotContainer}>
              <EmptyJoinSlot />
            </View>
            <View style={styles.joinSlotContainer}>
              <EmptyJoinSlot />
            </View>
            <View style={styles.joinSlotContainer}>
              <EmptyJoinSlot />
            </View>
            <View style={styles.joinSlotContainer}>
              <EmptyJoinSlot />
            </View>
          </Row>
        </Column>
      </Column>
    </ScreenContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  joinSlotContainer: {
    margin: sv('spacing.xs'),
  },
});
