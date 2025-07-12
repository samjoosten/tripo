import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { SearchIcon } from '@hugeicons/core-free-icons';

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    leadingIcon: SearchIcon,
  },
};
