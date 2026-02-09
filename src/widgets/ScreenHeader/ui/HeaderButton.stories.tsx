import { ArrowLeft01Icon } from '@hugeicons-pro/core-stroke-rounded';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { cv, sv } from 'shared/lib/theme';

import { HeaderButton } from './HeaderButton';

const meta = {
  title: 'Header Button',
  component: HeaderButton,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: cv('scaffold'),
          paddingHorizontal: sv('spacing.m'),
          paddingBottom: 100,
        }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof HeaderButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: ArrowLeft01Icon,
  },
  render: (args) => <HeaderButton {...args} />,
};
