import { StyleSheet, View } from 'react-native';

import { useColor } from 'shared/lib/theme';

const Divider = () => {
  const color = useColor('powderBlue.50', 'powderBlue.800');

  return <View style={[styles.container, { backgroundColor: color }]} />;
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: '100%',
  },
});

export default Divider;
