import { useState } from 'react';
import type { LayoutChangeEvent, ViewProps } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';

type Props = {
  shadowColor?: string;
  shadowBlur?: number;
  borderRadius?: number;
} & ViewProps;

export const ShadowView = ({ children, shadowBlur = 14, shadowColor = '#E5EEEE', borderRadius = 12, style }: Props) => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };
  
  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      <Canvas style={[StyleSheet.absoluteFill]}>
        <Shadow
          dx={0}
          dy={2}
          blur={shadowBlur}
          color={shadowColor}
          inner={false}
        >
          <RoundedRect
            x={0}
            y={0}
            width={layout.width}
            height={layout.height}
            r={borderRadius}
            color="white"
          />
        </Shadow>
      </Canvas>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});

export default ShadowView;