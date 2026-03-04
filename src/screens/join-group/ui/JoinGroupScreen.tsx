import { XCircle } from '@hugeicons-pro/core-duotone-standard';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { QueryObserverSuccessResult } from '@tanstack/react-query';
import { View } from 'react-native';

import type { MembersByJoinId } from 'entities/group';
import { useGroupByJoinIdQuery } from 'entities/group';
import { useCurrentUserQuery } from 'entities/user';
import { isQuerySuccess, QueryGuard } from 'shared/lib/query-guard';
import { CONTAINER } from 'shared/lib/styles';
import type { RootStackParamList } from 'shared/routes';
import { AppNavigation } from 'shared/routes';
import Column from 'shared/ui/Column';
import { EmptyView } from 'shared/ui/Empty';
import { FilledButton } from 'shared/ui/FilledButton';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ThemedText } from 'shared/ui/ThemedText';
import { useAuth } from 'shared/auth';

import { getGroupWithMembers } from '../model/getGroupWithMembers';
import { useJoinGroupMutation } from '../api/useJoinGroupMutation';

import MembersPreview from './MembersPreview';

type JoinGroupProps = NativeStackScreenProps<RootStackParamList, AppNavigation.JOIN_GROUP>;

export const JoinGroupScreen = ({ route, navigation }: JoinGroupProps) => {
  const { groupId: joinId } = route.params;
  const groupByJoinIdQuery = useGroupByJoinIdQuery(joinId);
  const isAuthenticated = useAuth().claims !== null;
  const currentUserQuery = useCurrentUserQuery({ select: (user) => user.id });

  const { mutateAsync: joinGroup, isPending: joinGroupPending } = useJoinGroupMutation();

  if (!isQuerySuccess(groupByJoinIdQuery)) {
    return (
      <QueryGuard
        queries={[groupByJoinIdQuery]}
        errorTitle='Ongeldige link'
        errorSubtitle='De link die je hebt geopend is ongeldig of verlopen.'
      />
    );
  }

  const { members, ownerUser, groupId } = getGroupWithMembers(
    groupByJoinIdQuery as QueryObserverSuccessResult<Array<MembersByJoinId>>
  );
  const { data: currentUserId } = currentUserQuery;

  if (ownerUser.userId === currentUserId || members.some((member) => member.userId === currentUserId)) {
    return (
      <ScreenContent>
        <Column justify='center' align='center' style={CONTAINER.FLEX_1} spacing='spacing.lg'>
          <EmptyView text='Je bent al lid van deze groep' icon={XCircle} />
        </Column>
      </ScreenContent>
    );
  }

  const isGroupFull = members.length >= 5;

  if (isGroupFull) {
    return (
      <ScreenContent>
        <Column justify='center' align='center' style={CONTAINER.FLEX_1} spacing='spacing.lg'>
          <EmptyView text='Groep is vol' icon={XCircle} />
        </Column>
      </ScreenContent>
    );
  }

  const onJoinGroupPress = async () => {
    if (!isAuthenticated) {
      navigation.navigate(AppNavigation.LOGIN, { joinGroupId: groupId });
      return;
    }

    await joinGroup(groupId);
    navigation.popTo(AppNavigation.MAIN);
  };

  return (
    <ScreenContent>
      <Column justify='center' align='center' style={CONTAINER.FLEX_1} spacing='spacing.lg'>
        <MembersPreview members={members} owner={ownerUser} />
        <View style={{ alignItems: 'center', rowGap: 10 }}>
          <ThemedText type='header'>Deelnemen aan groep</ThemedText>
          <ThemedText type='body' style={{ textAlign: 'center' }}>
            Je staat op het punt om deel te nemen aan de groep van {ownerUser.userName}.
          </ThemedText>
        </View>
        <FilledButton text='Deelnemen aan groep' onPress={onJoinGroupPress} loading={joinGroupPending} />
      </Column>
    </ScreenContent>
  );
};
