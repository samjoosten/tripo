import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import { useThemeColor, useThemeConfigColor } from 'shared/lib/theme';
import { RoundedView } from 'shared/ui/RoundedView';

import { TabIcon } from './TabIcon';

export const ThemedTabNavigation = (props: BottomTabBarProps & { containerHeight: number }) => {
  const { state, descriptors, navigation, containerHeight } = props;
  const backgroundColor = useThemeConfigColor('tabNavBackground');
  const shadowColor = useThemeColor({ light: 'powderBlue.100', dark: 'gray.900' });
  return (
    <RoundedView
      withShadow
      shadowColor={shadowColor}
      style={[styles.tabContainer, { height: containerHeight, backgroundColor }]}>
      {state.routes.map((route, index) => (
        <TabIcon
          key={route.key}
          route={route}
          index={index}
          state={state}
          options={descriptors[route.key].options}
          navigation={navigation}
        />
      ))}
    </RoundedView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '100%',
    pointerEvents: 'auto',
  },
});
