import { type Meta, type StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { cv } from 'shared/lib/theme';

import { EmptyJoinSlot } from './EmptyJoinSlot';

const meta = {
  title: 'Group/Empty Join Slot',
  component: EmptyJoinSlot,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: cv('scaffold'),
        }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof EmptyJoinSlot>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
