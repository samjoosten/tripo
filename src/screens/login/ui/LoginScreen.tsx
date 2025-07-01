import { View } from 'react-native';

import { FilledButton } from 'shared/ui/FilledButton';
import { ShadowView } from 'shared/ui/ShadowView';
import { ThemedText } from 'shared/ui/ThemedText';

const LoginScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FilledButton text='Test' />
      <ShadowView
        style={{
          borderRadius: 20,
          borderCurve: 'continuous',
          padding: 24,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ThemedText type='body'>Hallo continuous</ThemedText>
      </ShadowView>
    </View>
  );
};

export default LoginScreen;
