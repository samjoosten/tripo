import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { Spacer } from './Spacer';

const meta = {
  title: 'Spacer',
  component: Spacer,
  argTypes: {
    size: { control: 'text' },
    fill: { control: 'boolean', defaultValue: false },
    direction: { control: 'select', options: ['horizontal', 'vertical'], defaultValue: 'vertical' },
  },
  decorators: [
    (Story, params) => (
      <View
        style={{
          flex: 1,
          flexDirection: params.args.direction === 'horizontal' ? 'row' : 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
        <Story />
        <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
      </View>
    ),
  ],
} satisfies Meta<typeof Spacer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: 'horizontal',
  },
};
