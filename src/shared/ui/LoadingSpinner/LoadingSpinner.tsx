import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { useEffect, useMemo } from 'react';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { cv } from 'shared/lib/theme';

const CANVAS_SIZE = 32;
const STROKE_WIDTH = 5;
const CIRCLE_RADIUS = (CANVAS_SIZE - STROKE_WIDTH) / 2;

type Props = {
  color?: string;
};

export const LoadingSpinner = ({ color }: Props) => {
  const progress = useSharedValue(0);

  const circlePath = useMemo(() => {
    const path = Skia.Path.Make();
    path.addCircle(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CIRCLE_RADIUS);
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
    <Animated.View style={aStyle} entering={FadeIn.duration(1000)} exiting={FadeOut.duration(1000)}>
      <Canvas style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}>
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
