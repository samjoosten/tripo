import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { cv } from 'shared/lib/theme';

import { ShadowView } from './ShadowView';

const meta = {
  title: 'Shadow View',
  component: ShadowView,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 16,
          backgroundColor: cv('scaffold'),
          paddingBottom: 100,
        }}>
        <Story />
        <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
      </View>
    ),
  ],
} satisfies Meta<typeof ShadowView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    borderRadius: 12,
    style: { padding: 16, backgroundColor: 'white' },
  },
  render: (args) => (
    <ShadowView {...args}>
      <View>
        <Text>Content inside ShadowView</Text>
      </View>
    </ShadowView>
  ),
};
