import { type Meta, type StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { cv } from 'shared/lib/theme';

import ProfileAvatar from './ProfileAvatar';

const meta = {
  title: 'User/Profile Avatar',
  component: ProfileAvatar,
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
  argTypes: {
    name: { control: 'text' },
  },
} satisfies Meta<typeof ProfileAvatar>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export default meta;
