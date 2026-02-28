import { useCurrentGroupQuery } from 'entities/group';
import { ProfileAvatar, useCurrentUserQuery } from 'entities/user';
import { isQuerySuccess, QueryGuard } from 'shared/lib/query-guard';
import { CONTAINER } from 'shared/lib/styles';
import Column from 'shared/ui/Column';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ThemedText } from 'shared/ui/ThemedText';
import { TripoHeader } from 'widgets/ScreenHeader';

import GroupMembers from './GroupMembers';
import JoinLinkButton from './JoinLinkButton';

export const PreStartScreen = () => {
  const userQuery = useCurrentUserQuery();
  const currentGroupQuery = useCurrentGroupQuery();

  if (!isQuerySuccess(userQuery) || !isQuerySuccess(currentGroupQuery)) {
    return <QueryGuard queries={[userQuery, currentGroupQuery]} />;
  }

  const { data: user } = userQuery;
  const { data: currentGroup } = currentGroupQuery;

  if (currentGroup.ownerUserId !== user.id) {
    return (
      <ScreenContent>
        <TripoHeader />
        <Column justify='center' align='center' spacing='spacing.lg' style={CONTAINER.FLEX_1}>
          <ThemedText type='body'>Wachten op de groepsleider...</ThemedText>
        </Column>
      </ScreenContent>
    );
  }

  return (
    <ScreenContent>
      <TripoHeader />
      <Column justify='center' align='center' spacing='spacing.lg' style={CONTAINER.FLEX_1}>
        <ProfileAvatar name={user.name} avatarUrl={user.avatarUrl} />
        <ThemedText type='header'>Jouw groep</ThemedText>
        <Column spacing='spacing.m' align='center'>
          <JoinLinkButton joinId={currentGroup.joinId} />
          <GroupMembers />
        </Column>
      </Column>
    </ScreenContent>
  );
};
