import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { cv } from 'shared/lib/theme';
import { LoadingSpinner } from 'shared/ui/LoadingSpinner';
import { ThemedIcon, type IconSvgObject } from 'shared/ui/ThemedIcon';
import { ThemedText } from 'shared/ui/ThemedText';

import { RoundedView } from '../RoundedView/RoundedView';

import { styles } from './FilledButtonStyle';

const ACTIVE_COLORS = [cv('azure.400'), cv('azure.600')];
const DISABLED_COLOR = cv('gray.300');

type Props = {
  text: string;
  disabled?: boolean;
  loading?: boolean;
  autowidth?: boolean;
  leadingIcon?: IconSvgObject;
  trailingIcon?: IconSvgObject;
  onPress?: () => void;
};

export const FilledButton = ({ text, disabled, loading, autowidth, leadingIcon, trailingIcon, onPress }: Props) => {
  const isDisabled = disabled || loading;
  const firstColor = useSharedValue(ACTIVE_COLORS[0]);
  const secondColor = useSharedValue(ACTIVE_COLORS[1]);
  const colors = useDerivedValue(() => [firstColor.value, secondColor.value]);
  const buttonScale = useSharedValue(1);

  const loaderOpacity = useSharedValue(0);

  useEffect(() => {
    if (loading) {
      loaderOpacity.value = withTiming(1, { duration: 300 });
    } else {
      loaderOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [loading]);

  useEffect(() => {
    if (isDisabled) {
      firstColor.value = withTiming(DISABLED_COLOR, { duration: 300 });
      secondColor.value = withTiming(DISABLED_COLOR, { duration: 300 });
    } else {
      firstColor.value = withTiming(ACTIVE_COLORS[0], { duration: 300 });
      secondColor.value = withTiming(ACTIVE_COLORS[1], { duration: 300 });
    }
  }, [isDisabled]);

  const aLoaderStyle = useAnimatedStyle(() => {
    return {
      opacity: loaderOpacity.value,
    };
  });

  const aContentStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(loaderOpacity.value, [0, 1], [1, 0]),
    };
  });

  const aButtonContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const onPressIn = () => {
    if (isDisabled) return;
    buttonScale.value = withTiming(0.97, { duration: 200, easing: Easing.inOut(Easing.ease) });
  };

  const onPressOut = () => {
    if (isDisabled) return;
    buttonScale.value = withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={isDisabled}
      style={!autowidth ? { width: '100%' } : {}}>
      <Animated.View style={[aButtonContainerStyle, !autowidth ? { width: '100%' } : {}]}>
        <RoundedView style={styles.container} gradientColors={colors}>
          {!!loading && (
            <Animated.View style={[aLoaderStyle, { position: 'absolute' }]}>
              <LoadingSpinner />
            </Animated.View>
          )}
          <Animated.View style={[aContentStyle, styles.content]}>
            {!!leadingIcon && <ThemedIcon icon={leadingIcon} color={cv('white')} />}
            <ThemedText type='button'>{text}</ThemedText>
            {!!trailingIcon && <ThemedIcon icon={trailingIcon} color={cv('white')} />}
          </Animated.View>
        </RoundedView>
      </Animated.View>
    </Pressable>
  );
};
