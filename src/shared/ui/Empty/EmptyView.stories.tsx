import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { SadDizzyIcon } from '@hugeicons-pro/core-duotone-standard';

import { cv, sv } from 'shared/lib/theme';

import { EmptyView } from './EmptyView';

const meta = {
  title: 'Empty View',
  component: EmptyView,
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
} satisfies Meta<typeof EmptyView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: SadDizzyIcon,
    text: 'Er is hier nog niks te zien',
  },
  render: (args) => <EmptyView {...args} />,
};
