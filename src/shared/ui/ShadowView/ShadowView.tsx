import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';
import { useState } from 'react';
import type { LayoutChangeEvent, ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { cv } from 'shared/lib/theme';

type Props = {
  shadowColor?: string;
  shadowBlur?: number;
  borderRadius?: number;
} & ViewProps;

export const ShadowView = ({ children, shadowBlur = 14, shadowColor = '#E5EEEE', borderRadius = 12, style }: Props) => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const flattenedStyle = StyleSheet.flatten(style) || {};
  const { backgroundColor = cv('white') } = flattenedStyle;

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    setLayout({ width, height });
    setPosition({ x, y });
  };

  return (
    <>
      <Canvas style={[StyleSheet.absoluteFill]}>
        <RoundedRect
          x={position.x}
          y={position.y}
          width={layout.width}
          height={layout.height}
          r={borderRadius * 2}
          color={backgroundColor.toString()}>
          <Shadow dx={0} dy={5} blur={shadowBlur} color={shadowColor} inner={false} />
        </RoundedRect>
      </Canvas>
      <View style={[styles.content, style]} onLayout={onLayout}>
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    zIndex: 1,
  },
});

export default ShadowView;
