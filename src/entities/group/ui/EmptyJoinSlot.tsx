import { Canvas, Circle, DashPathEffect, Path, Skia } from '@shopify/react-native-skia';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useThemeColor } from 'shared/lib/theme';

const SIZE = 48;
const BORDER_WIDTH = 2;
const RADIUS = SIZE / 2;

export const EmptyJoinSlot = () => {
  const borderColor = useThemeColor({ light: 'powderBlue.200', dark: 'powderBlue.600' });
  const circleColor = useThemeColor({ light: 'powderBlue.50', dark: 'powderBlue.700' });

  const path = useMemo(() => {
    const skPath = Skia.Path.Make();
    skPath.addCircle(SIZE / 2 + BORDER_WIDTH, SIZE / 2 + BORDER_WIDTH, RADIUS);
    return skPath;
  }, []);

  return (
    // <View>
    <Canvas style={styles.container}>
      <Circle cx={SIZE / 2 + BORDER_WIDTH} cy={SIZE / 2 + BORDER_WIDTH} r={SIZE / 2} color={circleColor} />
      <Path
        end={1}
        start={0}
        path={path}
        style={'stroke'}
        strokeCap={'round'}
        color={borderColor}
        strokeWidth={BORDER_WIDTH}>
        <DashPathEffect intervals={[5, 7.5]} />
      </Path>
    </Canvas>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE + BORDER_WIDTH * 2,
    height: SIZE + BORDER_WIDTH * 2,
  },
});
