import { KeyboardAvoidingView, Platform, type KeyboardAvoidingViewProps } from "react-native"

interface Props extends KeyboardAvoidingViewProps {}

export const KeyboardView = ({ children }: Props) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  )
}