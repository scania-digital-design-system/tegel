import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

import { TdsButton } from './button';

const meta = {
  title: 'Button',
  component: TdsButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      name: 'Variant',
      description:
        'Four different Button variants to help the user to distinguish the level of importance of the task they represent.',
      control: {
        type: 'radio',
      },
      options: ['primary', 'secondary', 'ghost', 'danger', 'experimental'],
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      name: 'Size',
      description: 'Sets the size of the Button.',
      control: {
        type: 'radio',
      },
      options: ['lg', 'md', 'sm', 'xs'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    text: {
      name: 'Text',
      description: 'Sets the text to be displayed on the Button.',
      control: {
        type: 'text',
      },
    },
    fullbleed: {
      name: 'Fullbleed',
      description: 'Sets a fluid width on the Button.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the Button.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    animation: {
      name: 'Animation',
      description: 'Sets the animation for the Button.',
      control: {
        type: 'radio',
      },
      options: ['none', 'fade'],
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    tdsAriaLabel: {
      name: 'Aria Label',
      description: 'Value to be used for the aria-label attribute',
      control: {
        type: 'text',
      },
      if: { arg: 'onlyIcon', truthy: true },
    },
  },
  args: {
    text: 'Default Button Text',
    size: 'lg',
    variant: 'primary',
    fullbleed: false,
    disabled: false,
    animation: 'none',
  },
} satisfies Meta<TdsButton>;

export default meta;
type Story = StoryObj<TdsButton>;

export const Primary: Story = {
  args: {
    text: 'Primary Button',
    variant: 'primary',
  },
  render: (props) => <tds-button {...props} />,
};

export const Secondary: Story = {
  args: {
    text: 'Old Secondary Button',
    variant: 'secondary',
  },
  render: (props) => <tds-button {...props} />,
};

export const Ghost: Story = {
  args: {
    text: 'Ghost Button',
    variant: 'ghost',
  },
  render: (props) => <tds-button {...props} />,
};

export const Danger: Story = {
  args: {
    text: 'Danger Button',
    variant: 'danger',
  },
  render: (props) => <tds-button {...props} />,
};

export const Experimental: Story = {
  args: {
    text: 'New Secondary Button',
    variant: 'experimental',
  },
  render: (props) => <tds-button {...props} />,
};
