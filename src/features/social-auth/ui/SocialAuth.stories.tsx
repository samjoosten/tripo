import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { cv, sv } from 'shared/lib/theme';

import SocialAuth from './SocialAuth';

const meta = {
  title: 'Social auth',
  component: SocialAuth,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: sv('spacing.m'),
          marginBottom: 100,
          backgroundColor: cv('scaffold'),
        }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SocialAuth>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
