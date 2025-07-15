import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { EyeIcon } from '@hugeicons/core-free-icons';

import { cv, sv } from 'shared/lib/theme';

import { FormInput } from './FormInput';

const meta = {
  title: 'Form Input',
  component: FormInput,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: sv('spacing.lg'),
          backgroundColor: cv('scaffold'),
          paddingBottom: 100,
        }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    showFocus: { control: 'boolean', defaultValue: false },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof FormInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showFocus: false,
    label: 'Label',
    error: '',
  },
};

export const TrailingIcon: Story = {
  args: {
    showFocus: false,
    label: 'Label',
    error: '',
    placeholder: '',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    trailingIcon: EyeIcon,
  },
};
