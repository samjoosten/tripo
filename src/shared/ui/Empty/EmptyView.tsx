import Column from '../Column';
import { ThemedIcon, type IconSvgObject } from '../ThemedIcon';
import { ThemedText } from '../ThemedText';

type Props = {
  icon: IconSvgObject;
  text: string;
  subtext?: string;
};

export const EmptyView = ({ icon, text, subtext }: Props) => {
  return (
    <Column justify='center' align='center'>
      <ThemedIcon icon={icon} lightColor='azure.500' darkColor='azure.300' size='icon.xl' />
      <ThemedText type='sectionHeader' lightColor='powderBlue.300'>
        {text}
      </ThemedText>
      {!!subtext && (
        <ThemedText type='body' lightColor='powderBlue.300'>
          {subtext}
        </ThemedText>
      )}
    </Column>
  );
};
