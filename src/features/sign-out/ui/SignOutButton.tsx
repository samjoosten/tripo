import { Logout05Icon } from '@hugeicons-pro/core-stroke-standard';
import type { TFunction } from 'i18next';
import { Alert } from 'react-native';

import { supabase } from 'shared/api';
import { showErrorAlert } from 'shared/ui/Alert';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import Row from 'shared/ui/Row';
import { ThemedIcon } from 'shared/ui/ThemedIcon';
import { ThemedText } from 'shared/ui/ThemedText';

type Props = {
  t: TFunction;
};

export const SignOutButton = ({ t }: Props) => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showErrorAlert({ message: t('shared.tryAgainLater'), data: error });
    }
  };

  const onSignOutPress = () => {
    Alert.alert(t('signout.confirmation'), undefined, [
      { text: t('signout.buttons.cancel'), style: 'cancel' },
      { text: t('signout.buttons.confirm'), onPress: handleSignOut },
    ]);
  };

  return (
    <PressableOpacity onPress={onSignOutPress}>
      <Row align='center' spacing='spacing.xs'>
        <ThemedIcon
          icon={Logout05Icon}
          lightColor='powderBlue.500'
          darkColor='powderBlue.200'
          size='icon.sm'
          strokeWidth={2}
        />
        <ThemedText type='button' lightColor='powderBlue.500' darkColor='powderBlue.200'>
          {t('shared.signOut')}
        </ThemedText>
      </Row>
    </PressableOpacity>
  );
};
