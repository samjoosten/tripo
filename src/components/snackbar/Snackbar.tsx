import { useEffect, useRef } from "react";
import { Dimensions, Easing, SafeAreaView, View } from "react-native";
import { COLORS } from "src/config/colors";
import { LabelText } from "../Text";
import { useSnackbar } from "./hooks";
import { SnackbarType } from "./types";
import Animated, { useSharedValue, } from "react-native-reanimated";

const SNACKBAR_HEIGHT = 80;

const SnackbarRoot = () => {
  const context = useSnackbar();
  const fillColor = context.snackbar?.type === SnackbarType.SUCCESS ? COLORS.green400 : COLORS.red400;

  const { height } = Dimensions.get('window');
  const y = useSharedValue(-SNACKBAR_HEIGHT);

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

export default SnackbarRoot;