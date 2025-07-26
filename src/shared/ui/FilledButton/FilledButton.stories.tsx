import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { SearchIcon } from '@hugeicons-pro/core-stroke-rounded';

import { sv } from 'shared/lib/theme';

import { FilledButton } from './FilledButton';

const meta = {
  title: 'Filled',
  component: FilledButton,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: sv('spacing.m'),
          marginBottom: 100,
        }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onPress: { action: 'onPress' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    autowidth: { control: 'boolean' },
    text: { control: 'text' },
  },
} satisfies Meta<typeof FilledButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Press Me',
  },
};

export const LeadingIcon: Story = {
  args: {
    text: 'Press Me',

    leadingIcon: SearchIcon,
  },
};
