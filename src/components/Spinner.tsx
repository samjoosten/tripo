
import { ActivityIndicator, View } from 'react-native'
import { appTheme } from '../config/theme'
import { styled } from 'nativewind'

const StyledView = styled(View)

export default function Spinner() {
  return (
    <StyledView testID="spinner" className='flex-1'>
      <ActivityIndicator testID="activity-indicator" color={appTheme.highlight} size="large" />
    </StyledView>
  )
}