import type { NativeStackHeaderItemProps } from '@react-navigation/native-stack';

import { ThemedText } from 'shared/ui/ThemedText';

type Props = {
  text: string;
} & NativeStackHeaderItemProps;

export const HeaderAction = (props: Props) => {
  return (
    <ThemedText type='button' lightColor='azure.500' darkColor='azure.300'>
      {props.text}
    </ThemedText>
  );
};
