/* eslint-disable complexity */
import type { SkPath } from '@shopify/react-native-skia';
import { Canvas, Group, LinearGradient, Paint, Path, Shadow, Skia, vec } from '@shopify/react-native-skia';
import { useMemo, useState } from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { getPathParamsForCorner } from './getPathParamsForCorner';
import type { SquircleProps } from './types';

export const RoundedView = ({
  smoothing = 1,
  style,
  children,
  color,
  gradientColors,
  borderWidth,
  borderColor,
  withShadow = false,
  shadowBlur = 14,
  shadowColor = '#E5EEEE',
  shadowOffset = { x: 0, y: 5 },
}: SquircleProps) => {
  const flattenStyle = useMemo(() => StyleSheet.flatten(style), [style]);
  const {
    borderRadius,
    borderTopLeftRadius = borderRadius,
    borderTopRightRadius = borderRadius,
    borderBottomLeftRadius = borderRadius,
    borderBottomRightRadius = borderRadius,
    borderStyle,
    backgroundColor,
  } = flattenStyle;

  if (
    borderRadius === undefined &&
    borderTopLeftRadius === undefined &&
    borderTopRightRadius === undefined &&
    borderBottomLeftRadius === undefined &&
    borderBottomRightRadius === undefined
  ) {
    throw new Error('react-native-squircle-skia: No borderRadius provided in Squircle style');
  }

  if (borderStyle !== undefined) {
    throw new Error('react-native-squircle-skia: Setting borderStyle is not supported.');
  }
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  const pathColor = useMemo(() => {
    return color || backgroundColor || 'transparent';
  }, [backgroundColor, color]);

  const drawTopRightCornerPath = (path: SkPath) => {
    if (borderTopRightRadius) {
      const { a, b, c, d, p, circularSectionLength } = getPathParamsForCorner({
        width,
        height,
        cornerRadius: borderTopRightRadius as number,
        cornerSmoothing: smoothing,
      });
      path.moveTo(Math.max(width / 2, width - p), 0);
      path.cubicTo(width - (p - a), 0, width - (p - a - b), 0, width - (p - a - b - c), d);
      path.rArcTo(
        borderTopRightRadius as number,
        borderTopRightRadius as number,
        0,
        true,
        false,
        circularSectionLength,
        circularSectionLength
      );
      path.cubicTo(width, p - a - b, width, p - a, width, Math.min(height / 2, p));
    } else {
      path.moveTo(width / 2, 0);
      path.lineTo(width, 0);
      path.lineTo(width, height / 2);
    }
  };

  const drawBottomRightCornerPath = (path: SkPath) => {
    if (borderBottomRightRadius) {
      const { a, b, c, d, p, circularSectionLength } = getPathParamsForCorner({
        width,
        height,
        cornerRadius: borderBottomRightRadius as number,
        cornerSmoothing: smoothing,
      });
      path.lineTo(width, Math.max(height / 2, height - p));
      path.cubicTo(width, height - (p - a), width, height - (p - a - b), width - d, height - (p - a - b - c));
      path.rArcTo(
        borderBottomRightRadius as number,
        borderBottomRightRadius as number,
        0,
        true,
        false,
        -circularSectionLength,
        circularSectionLength
      );
      path.cubicTo(width - (p - a - b), height, width - (p - a), height, Math.max(width / 2, width - p), height);
    } else {
      path.lineTo(width, height);
      path.lineTo(width / 2, height);
    }
  };

  const drawBottomLeftCornerPath = (path: SkPath) => {
    if (borderBottomLeftRadius) {
      const { a, b, c, d, p, circularSectionLength } = getPathParamsForCorner({
        width,
        height,
        cornerRadius: borderBottomLeftRadius as number,
        cornerSmoothing: smoothing,
      });
      path.lineTo(Math.min(width / 2, p), height);
      path.cubicTo(p - a, height, p - a - b, height, p - a - b - c, height - d);
      path.rArcTo(
        borderBottomLeftRadius as number,
        borderBottomLeftRadius as number,
        0,
        true,
        false,
        -circularSectionLength,
        -circularSectionLength
      );
      path.cubicTo(0, height - (p - a - b), 0, height - (p - a), 0, Math.max(height / 2, height - p));
    } else {
      path.lineTo(0, height);
      path.lineTo(0, height / 2);
    }
  };

  const drawTopLeftCornerPath = (path: SkPath) => {
    if (borderTopLeftRadius) {
      const { a, b, c, d, p, circularSectionLength } = getPathParamsForCorner({
        width,
        height,
        cornerRadius: borderTopLeftRadius as number,
        cornerSmoothing: smoothing,
      });
      path.lineTo(0, Math.min(height / 2, p));
      path.cubicTo(0, p - a, 0, p - a - b, d, p - a - b - c);
      path.rArcTo(
        borderTopLeftRadius as number,
        borderTopLeftRadius as number,
        0,
        true,
        false,
        circularSectionLength,
        -circularSectionLength
      );
      path.cubicTo(p - a - b, 0, p - a, 0, Math.min(width / 2, p), 0);
    } else {
      path.lineTo(0, 0);
    }
    path.close();
  };

  const path = useMemo(() => {
    const skPath = Skia.Path.Make();
    if (width > 0 && height > 0) {
      drawTopRightCornerPath(skPath);
      drawBottomRightCornerPath(skPath);
      drawBottomLeftCornerPath(skPath);
      drawTopLeftCornerPath(skPath);
    }
    return skPath;
  }, [width, height]);

  const handleLayout: ViewProps['onLayout'] = (event) => {
    setWidth(event.nativeEvent.layout.width);
    setHeight(event.nativeEvent.layout.height);
    setX(event.nativeEvent.layout.x);
    setY(event.nativeEvent.layout.y);
  };

  return (
    <>
      {!!(width > 0 && height > 0 && path) && (
        <Canvas style={StyleSheet.absoluteFill}>
          <Group>
            <Path
              path={path}
              color={pathColor.toString()}
              strokeWidth={borderWidth}
              transform={[{ translateX: x }, { translateY: y }]}>
              {!!gradientColors && (
                <LinearGradient colors={gradientColors} start={vec(0, 0)} end={{ x: width, y: height }} />
              )}
              {!!borderWidth && <Paint color={borderColor} stroke-width={borderWidth} style='stroke' />}
            </Path>
            {!!withShadow && (
              <Shadow dx={shadowOffset.x} dy={shadowOffset.y} blur={shadowBlur} color={shadowColor} inner={false} />
            )}
          </Group>
        </Canvas>
      )}
      <View style={[styles.content, style, { backgroundColor: 'transparent' }]} onLayout={handleLayout}>
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
