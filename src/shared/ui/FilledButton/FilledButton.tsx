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
  const buttonWidth = useSharedValue(0);
  const buttonHeight = useSharedValue(0);
  const end = useDerivedValue(() => ({
    x: buttonWidth.value,
    y: buttonHeight.value,
  }));

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    buttonWidth.value = width;
    buttonHeight.value = height;
  };

  return (
    <View style={[styles.container, !autowidth ? { width: '100%' } : {}]} onLayout={onLayout}>
      <Canvas style={styles.canvas}>
        <Rect x={0} y={0} width={buttonWidth} height={buttonHeight}>
          <LinearGradient colors={colors} start={vec(0, 0)} end={end} />
        </Rect>
      </Canvas>
      <Pressable>
        <ThemedText type='button'>{text}</ThemedText>
      </Pressable>
    </View>
  );
};
