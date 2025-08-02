import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { useEffect, useMemo } from 'react';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import type { ColorPaletteType, SizingType } from 'shared/lib/theme';
import { cv, sv } from 'shared/lib/theme';

type Props = {
  color?: ColorPaletteType;
  size?: SizingType;
};

export const LoadingSpinner = ({ color = 'white', size = 'spacing.m' }: Props) => {
  const sizeValue = sv(size);
  const STROKE_WIDTH = sizeValue / 10;
  const CIRCLE_RADIUS = (sizeValue - STROKE_WIDTH) / 2;

  const progress = useSharedValue(0);

  const circlePath = useMemo(() => {
    const path = Skia.Path.Make();
    path.addCircle(sizeValue / 2, sizeValue / 2, CIRCLE_RADIUS);
    return path;
  }, []);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const aStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 2 * Math.PI}rad` }],
    };
  });

  const aStart = useDerivedValue(() => {
    return interpolate(progress.value, [0, 0.5, 1], [0.3, 0.6, 0.3]);
  });

  return (
    <Animated.View style={aStyle}>
      <Canvas style={{ width: sizeValue, height: sizeValue }}>
        <Path
          path={circlePath}
          color={cv(color)}
          style={'stroke'}
          strokeWidth={STROKE_WIDTH}
          strokeCap={'round'}
          start={aStart}
          end={1}
        />
      </Canvas>
    </Animated.View>
  );
};
