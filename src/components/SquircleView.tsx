import * as React from 'react'
import { type ViewProps, View, StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { getSvgPath } from 'figma-squircle'
import { type ColorValue } from 'react-native'
import type { PropsWithChildren } from 'react'

interface SquircleParams {
  cornerRadius?: number
  topLeftCornerRadius?: number
  topRightCornerRadius?: number
  bottomRightCornerRadius?: number
  bottomLeftCornerRadius?: number
  cornerSmoothing: number
  fillColor?: ColorValue
  strokeColor?: ColorValue
  strokeWidth?: number
}

interface SquircleViewProps extends ViewProps {
  squircleParams: SquircleParams
}

function SquircleView({ squircleParams, children, ...props }: PropsWithChildren<SquircleViewProps>) {
  return (
    <View {...props}>
      <SquircleBackground squircleParams={squircleParams} />
      {children}
    </View>
  )
}

function SquircleBackground({ squircleParams }: SquircleViewProps) {
  return (
    <Rect style={StyleSheet.absoluteFill}>
      {({ width, height }) => {
        const hasStroke = squircleParams.strokeWidth && squircleParams.strokeWidth > 0;

        if (!hasStroke) {
          const path = getSvgPath({ ...squircleParams, width, height });

          return (
            <Svg width={width} height={height}>
              <Path d={path} fill={squircleParams.fillColor} />
            </Svg>
          )
        }

        const cornerRadii = [
          squircleParams.cornerRadius,
          squircleParams.topLeftCornerRadius,
          squircleParams.topRightCornerRadius,
          squircleParams.bottomLeftCornerRadius,
          squircleParams.bottomRightCornerRadius,
        ].filter(
          (cornerRadius) => typeof cornerRadius === 'number'
        ) as number[]

        const maxStrokeWidth = Math.min(...cornerRadii)
        squircleParams.strokeWidth = Math.min(squircleParams.strokeWidth ?? 0, maxStrokeWidth)
        const insetAmount = squircleParams.strokeWidth / 2

        const insetSquirclePath = getSvgPath({
          width: width - squircleParams.strokeWidth,
          height: height - squircleParams.strokeWidth,
          cornerSmoothing: squircleParams.cornerSmoothing,
          cornerRadius: getInnerRadius(squircleParams.cornerRadius, insetAmount),
          topLeftCornerRadius: getInnerRadius(
            squircleParams.topLeftCornerRadius,
            insetAmount
          ),
          topRightCornerRadius: getInnerRadius(
            squircleParams.topRightCornerRadius,
            insetAmount
          ),
          bottomRightCornerRadius: getInnerRadius(
            squircleParams.bottomRightCornerRadius,
            insetAmount
          ),
          bottomLeftCornerRadius: getInnerRadius(
            squircleParams.bottomLeftCornerRadius,
            insetAmount
          ),
        })

        return (
          <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
            <Path
              d={insetSquirclePath}
              fill={squircleParams.fillColor}
              stroke={squircleParams.strokeColor}
              strokeWidth={squircleParams.strokeWidth}
              translate={insetAmount}
            />
          </Svg>
        )
      }}
    </Rect>
  )
}

function getInnerRadius(radius: number | undefined, insetAmount: number) {
  if (radius) {
    return Math.max(0, radius - insetAmount)
  }

  return radius
}

interface RectProps extends Omit<ViewProps, 'children'> {
  children: (rect: { width: number; height: number }) => React.ReactNode
}

function Rect({ children, ...rest }: RectProps) {
  const [rect, setRect] =
    React.useState<{ width: number; height: number } | null>(null)

  return (
    <View
      {...rest}
      onLayout={(e) => {
        setRect({
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height,
        })
      }}
    >
      {rect ? children(rect) : null}
    </View>
  )
}

export default SquircleView
