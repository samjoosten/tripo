import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { AppNavigation, RootStackParamList } from 'shared/routes';
import Column from 'shared/ui/Column';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ThemedText } from 'shared/ui/ThemedText';

type JoinGroupProps = NativeStackScreenProps<RootStackParamList, AppNavigation.JOIN_GROUP>;

export const JoinGroupScreen = ({ route }: JoinGroupProps) => {
  const { groupId } = route.params;

  return (
    <ScreenContent>
      <Column justify='center' align='center' style={{ flex: 1 }}>
        <ThemedText type='body'>Join group: {groupId}</ThemedText>
      </Column>
    </ScreenContent>
  );
};
