import { HugeiconsIcon } from '@hugeicons/react-native';
import type { HugeiconsProps } from '@hugeicons/react-native';
import Animated from 'react-native-reanimated';

import { cv, sv } from 'shared/lib/theme';

import type { IconSvgObject } from './types';

type Props = {
  size?: number;
  color?: string;
  icon: IconSvgObject;
} & HugeiconsProps;

export const ThemedIcon = ({ icon, size = sv('icon.m'), color = cv('gray.600'), ...rest }: Props) => {
  return <HugeiconsIcon icon={icon} size={size} color={color} {...rest} />;
};

export const AnimatedIcon = Animated.createAnimatedComponent(ThemedIcon);
