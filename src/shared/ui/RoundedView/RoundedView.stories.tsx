import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { cv } from 'shared/lib/theme';

import { RoundedView } from './RoundedView';

const meta = {
  title: 'Rounded View',
  component: RoundedView,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 20,
          backgroundColor: cv('scaffold'),
          paddingBottom: 100,
        }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof RoundedView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: {
      borderRadius: 12,
      backgroundColor: 'white',
      padding: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  render: (args) => (
    <RoundedView {...args}>
      <Text>Content inside RoundedView</Text>
    </RoundedView>
  ),
};

export const WithShadow: Story = {
  args: {
    withShadow: true,
    style: {
      borderRadius: 12,
      backgroundColor: 'white',
      padding: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  render: (args) => (
    <RoundedView {...args}>
      <Text>Content inside RoundedView with shadow</Text>
      <View style={{ height: 100 }} />
    </RoundedView>
  ),
};

export const WithGradient: Story = {
  args: {
    gradientColors: [cv('azure.400'), cv('azure.600')],
    style: {
      borderRadius: 12,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: 'white',
      alignItems: 'center',
    },
  },
  render: (args) => (
    <RoundedView {...args}>
      <Text>Content inside RoundedView with gradient</Text>
      <View style={{ height: 100 }} />
    </RoundedView>
  ),
};

export const WithBorder: Story = {
  args: {
    borderWidth: 5,
    borderColor: cv('azure.600'),
    style: {
      borderRadius: 12,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: 'white',
      alignItems: 'center',
    },
  },
  render: (args) => (
    <RoundedView {...args}>
      <Text>Content inside RoundedView with border</Text>
      <View style={{ height: 100 }} />
    </RoundedView>
  ),
};
