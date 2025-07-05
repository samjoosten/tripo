import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { FilledButton } from './FilledButton';

const meta = {
  title: 'Filled',
  component: FilledButton,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onPress: { action: 'onPress' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof FilledButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Press Me',
    onPress: () => console.log('Button Pressed'),
  },
};
