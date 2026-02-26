import { Link02Icon } from '@hugeicons-pro/core-stroke-standard';
import { Linking } from 'react-native';

import { showErrorAlert } from 'shared/ui/Alert';
import { FilledButton } from 'shared/ui/FilledButton';

type Props = {
  joinId: string;
};

const JoinLinkButton = ({ joinId }: Props) => {
  const openWhatsappLink = async () => {
    const joinMessage = encodeURIComponent(
      `Hoi! Gebruik deze link om je bij mijn groep aan te sluiten: https://tripo-app.com/join/${joinId}`
    );
    if (await Linking.canOpenURL(`https://wa.me/?text=${joinMessage}`)) {
      await Linking.openURL(`https://wa.me/?text=${joinMessage}`);
      return;
    }

    showErrorAlert({ message: 'Kan WhatsApp niet openen. Zorg ervoor dat WhatsApp geïnstalleerd is op je apparaat.' });
  };

  return (
    <FilledButton
      text='Link delen'
      trailingIcon={Link02Icon}
      borderWidth={2}
      lightBorderColor='powderBlue.200'
      darkBorderColor='powderBlue.600'
      lightTextColor='powderBlue.500'
      darkTextColor='powderBlue.100'
      lightColor='white'
      darkColor='powderBlue.700'
      onPress={openWhatsappLink}
    />
  );
};

export default JoinLinkButton;
