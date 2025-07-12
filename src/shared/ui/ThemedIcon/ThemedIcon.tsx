import { HugeiconsIcon } from '@hugeicons/react-native';
import type { HugeiconsProps } from '@hugeicons/react-native';

import { cv, sv } from 'shared/lib/theme';

import type { IconSvgObject } from './types';

type Props = {
  size?: number;
  color?: string;
  icon: IconSvgObject;
} & HugeiconsProps;

export const ThemedIcon = ({ icon, size = sv('spacing.m'), color = cv('gray.600'), ...rest }: Props) => {
  return <HugeiconsIcon icon={icon} size={size} color={color} {...rest} />;
};
