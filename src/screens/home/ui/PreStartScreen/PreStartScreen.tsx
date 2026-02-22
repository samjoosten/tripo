import { StyleSheet } from 'react-native';

import { ProfileAvatar, useCurrentUserQuery } from 'entities/user';
import { isQuerySuccess, QueryGuard } from 'shared/lib/query-guard';
import Column from 'shared/ui/Column';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ThemedText } from 'shared/ui/ThemedText';
import { TripoHeader } from 'widgets/ScreenHeader';

import GroupMembers from './GroupMembers';

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
          <GroupMembers />
        </Column>
      </Column>
    </ScreenContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
