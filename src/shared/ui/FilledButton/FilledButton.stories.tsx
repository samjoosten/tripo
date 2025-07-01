import type { Meta, StoryObj } from '@storybook/react-native';
import { FilledButton } from './FilledButton';

const meta = {
  title: 'Filled Button',
  component: FilledButton,
} satisfies Meta<typeof FilledButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: 'Click Me',
    onPress: () => console.log('Button Pressed'),
  },
};
