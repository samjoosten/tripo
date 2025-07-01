import type { LayoutChangeEvent } from 'react-native';
import { Pressable, View } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { useState } from 'react';

import { cv } from 'shared/lib/theme';

import { ThemedText } from '../ThemedText';

import { styles } from './FilledButtonStyle';

type Props = {
  text: string;
  disabled?: boolean;
  loading?: boolean;
  autowidth?: boolean;
  onPress?: () => void;
};

export const FilledButton = ({ text, disabled, loading, autowidth, onPress }: Props) => {
  const colors = [cv('azure.400'), cv('azure.600')];
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  return (
    <View style={[styles.container, !autowidth ? { width: '100%' } : {}]} onLayout={onLayout}>
      <Canvas style={styles.canvas}>
        <Rect x={0} y={0} width={layout.width} height={layout.height}>
          <LinearGradient colors={colors} start={vec(0, 0)} end={vec(layout.width, layout.height)} />
        </Rect>
      </Canvas>
      <Pressable>
        <ThemedText type='button'>{text}</ThemedText>
      </Pressable>
    </View>
  );
};
