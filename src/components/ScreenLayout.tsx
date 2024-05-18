import { styled } from 'nativewind';
import { View, type ViewProps } from 'react-native';
import useCacheAssets from '../hooks/useCacheAssets';
import Spinner from './Spinner';

const Wrapper = styled(View)

interface Props extends ViewProps {
  children: React.ReactNode
  testID?: string
}

export default function ScreenLayout(props: Props) {
  const areAssetsCached = useCacheAssets()

  return (
    <View className='bg-[#F8FBFE]'>
      <Wrapper testID={props.testID} className={`h-full mx-5 ${props.className}`}>{areAssetsCached ? props.children : <Spinner />}</Wrapper>
    </View>
  )
}