import { Canvas, Circle, DashPathEffect, Path, Skia } from '@shopify/react-native-skia';
import { useMemo } from 'react';

import { useThemeColor } from 'shared/lib/theme';

const SIZE = 55;
const BORDER_WIDTH = 2;

type Props = {
  size?: number;
};

export const EmptyJoinSlot = ({ size = SIZE }: Props) => {
  const borderColor = useThemeColor({ light: 'powderBlue.200', dark: 'powderBlue.600' });
  const circleColor = useThemeColor({ light: 'powderBlue.50', dark: 'powderBlue.700' });

  const path = useMemo(() => {
    const skPath = Skia.Path.Make();
    skPath.addCircle(size / 2 + BORDER_WIDTH, size / 2 + BORDER_WIDTH, size / 2);
    return skPath;
  }, [size]);

  return (
    <Canvas style={{ width: size + BORDER_WIDTH * 2, height: size + BORDER_WIDTH * 2 }}>
      <Circle cx={size / 2 + BORDER_WIDTH} cy={size / 2 + BORDER_WIDTH} r={size / 2} color={circleColor} />
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
  );
};
