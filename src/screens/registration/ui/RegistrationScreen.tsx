import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import type { AppNavigation, RootStackParamList } from 'shared/routes';
import { ScreenContent } from 'shared/ui/ScreenContent';

type RegistrationProps = NativeStackScreenProps<RootStackParamList, AppNavigation.REGISTER>;

export const RegistrationScreen = ({ navigation, route }: RegistrationProps) => {
  return (
    <ScreenContent
      navigation={navigation}
      route={route}
      headerAction='Opslaan'
      onHeaderActionPress={() => console.log('header action boy')}>
      <Text>RegistrationScreen</Text>
    </ScreenContent>
  );
};
