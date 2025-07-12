import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { sv } from 'shared/lib/theme';

import { LoadingSpinner } from './LoadingSpinner';

const meta = {
  title: 'Loading Spinner',
  component: LoadingSpinner,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    color: { control: 'color' },
    size: { control: 'number', defaultValue: sv('spacing.m') },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
