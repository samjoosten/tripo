import { EmptyJoinSlot } from 'entities/group';
import { ProfileAvatar } from 'entities/user';
import Column from 'shared/ui/Column';
import Row from 'shared/ui/Row';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ThemedText } from 'shared/ui/ThemedText';
import { TripoHeader } from 'widgets/ScreenHeader';

export const PreStartScreen = () => {
  return (
    <ScreenContent>
      <TripoHeader />
      <Column justify='center' align='center' spacing='spacing.lg' style={{ flex: 1 }}>
        <ProfileAvatar name='sam' />
        <ThemedText type='header'>Jouw groep</ThemedText>
        <Column spacing='spacing.m' align='center'>
          <Row spacing='spacing.m' justify='center'>
            <EmptyJoinSlot />
            <EmptyJoinSlot />
            <EmptyJoinSlot />
            <EmptyJoinSlot />
          </Row>
          <Row spacing='spacing.m' justify='center'>
            <EmptyJoinSlot />
            <EmptyJoinSlot />
            <EmptyJoinSlot />
            <EmptyJoinSlot />
          </Row>
        </Column>
      </Column>
    </ScreenContent>
  );
};
