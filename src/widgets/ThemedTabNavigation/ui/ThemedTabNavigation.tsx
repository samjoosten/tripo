import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cv, sv } from 'shared/lib/theme';
import { RoundedView } from 'shared/ui/RoundedView/RoundedView';

import { TabIcon } from './TabIcon';

export const ThemedTabNavigation = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;
  const { bottom } = useSafeAreaInsets();
  return (
    <RoundedView withShadow style={[styles.tabContainer, { paddingBottom: bottom - sv('spacing.xs') }]}>
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
    backgroundColor: cv('white'),
  },
});
