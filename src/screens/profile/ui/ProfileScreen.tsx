import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { SignOutButton } from 'features/sign-out/ui/SignOutButton';
import { sv } from 'shared/lib/theme';
import type { AppTabNavigation, NavigationTabLists, RootStackParamList } from 'shared/routes';
import { ScreenContent } from 'shared/ui/ScreenContent';

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<NavigationTabLists, AppTabNavigation.PROFILE>,
  NativeStackScreenProps<RootStackParamList>
>;

export const ProfileScreen = (_: ProfileScreenProps) => {
  const { t } = useTranslation();

  return (
    <ScreenContent withTopSafeArea style={styles.container}>
      <SignOutButton t={t} />
    </ScreenContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: sv('spacing.lg'),
  },
});
