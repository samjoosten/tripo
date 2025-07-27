import type { AnimatedProp, Color } from '@shopify/react-native-skia';
import type { ViewProps } from 'react-native';

export declare type SquircleProps = ViewProps & {
  smoothing?: number;
  color?: Color;
  gradientColors?: AnimatedProp<Array<Color>>;
  borderWidth?: number;
  borderColor?: AnimatedProp<Color | undefined>;
  withShadow?: boolean;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffset?: { x: number; y: number };
};

export declare type CornerParams = {
  cornerRadius: number;
  cornerSmoothing: number;
  width: number;
  height: number;
};

export declare type CornerPathParams = {
  a: number;
  b: number;
  c: number;
  d: number;
  p: number;
  circularSectionLength: number;
};

export {};
