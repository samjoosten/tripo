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

import { cv, sv } from 'shared/lib/theme';

type Props = {
  color?: string;
  size?: number;
};

export const LoadingSpinner = ({ color, size = sv('spacing.m') }: Props) => {
  const STROKE_WIDTH = size / 10;
  const CIRCLE_RADIUS = (size - STROKE_WIDTH) / 2;

  const progress = useSharedValue(0);

  const circlePath = useMemo(() => {
    const path = Skia.Path.Make();
    path.addCircle(size / 2, size / 2, CIRCLE_RADIUS);
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
      <Canvas style={{ width: size, height: size }}>
        <Path
          path={circlePath}
          color={color || cv('white')}
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
