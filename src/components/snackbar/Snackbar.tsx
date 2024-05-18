import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, SafeAreaView, View } from "react-native";
import { COLORS } from "src/config/colors";
import { LabelText } from "../Text";
import { useSnackbar } from "./snackbar.hooks";
import { SnackbarType } from "./snackbar.types";

const SNACKBAR_HEIGHT = 80;

const Snackbar = () => {
  const context = useSnackbar();
  const fillColor = context.snackbar?.type === SnackbarType.SUCCESS ? COLORS.green400 : COLORS.red400;

  const { height } = Dimensions.get('window');
  const y = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (!context.snackbar) {
      return;
    }

    let timeout: NodeJS.Timeout;
    Animated.timing(y, {
      toValue: height - SNACKBAR_HEIGHT,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      timeout = setTimeout(() => {
        Animated.timing(y, {
          toValue: height,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start(() => {
          context.closeSnackbar();
        });
      }, context.snackbar?.duration ?? 2000);
    });

    return () => {
      clearTimeout(timeout);
    }
  }, [context.snackbar, y]);

  if (!context.snackbar) {
    return null;
  }

  return (
    <Animated.View className="absolute z-10 flex-row" style={{ transform: [{ translateY: y }] }}>
      <View className="flex-1 mb-3 pb-3" style={{ backgroundColor: fillColor, height: SNACKBAR_HEIGHT }}>
        <SafeAreaView>
          <View className="justify-start px-8 py-4">
            <LabelText className="text-white">{context.snackbar?.message}</LabelText>
          </View>
        </SafeAreaView>
      </View>
    </Animated.View>
  )
};

export default Snackbar;