import { StyleSheet, View } from 'react-native';

import { ProfileAvatar } from 'entities/user';
import { useThemeColor } from 'shared/lib/theme';
import { LoadingSpinner } from 'shared/ui/LoadingSpinner';

import { EmptyJoinSlot } from './EmptyJoinSlot';

const SIZE = 55;

type LoadingProps = {
  isLoading: true;
  avatarUrl?: string | null;
  name?: string;
  isEmpty?: boolean;
};

type ResolvedProps = {
  isLoading?: false;
  avatarUrl: string | null;
  name: string;
  isEmpty?: boolean;
};

type EmptyProps = {
  isEmpty: true;
  avatarUrl?: string | null;
  name?: string;
  isLoading?: boolean;
};

type Props = LoadingProps | ResolvedProps | EmptyProps;

export const GroupMemberSlot = ({ avatarUrl, name, isLoading, isEmpty }: Props) => {
  const circleColor = useThemeColor({ light: 'powderBlue.50', dark: 'powderBlue.700' });

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: circleColor }]}>
        <LoadingSpinner />
      </View>
    );
  }

  if (isEmpty) {
    return <EmptyJoinSlot />;
  }

  return <ProfileAvatar avatarUrl={avatarUrl} name={name} size={SIZE} />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    width: SIZE,
    height: SIZE,
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
