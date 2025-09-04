import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Toggle',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Sets the size of the Toggle.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Small'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    headline: {
      name: 'Headline',
      description: 'Sets the headline, displayed above the Toggle.',
      control: {
        type: 'text',
      },
    },
    label: {
      name: 'Label text',
      description: "Sets the label for the toggle's input element.",
      control: {
        type: 'text',
      },
    },
    checked: {
      name: 'Checked',
      description: 'Sets the Toggle as checked.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the Toggle.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    size: 'Large',
    headline: 'Headline',
    label: 'Label',
    checked: false,
    disabled: false,
  },
};

const Template = ({ size, headline, label, checked, disabled }) =>
  formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-light/tl-toggle.css";
    -->

      <div class="tl-toggle">
        <div class="tl-toggle__headline ${
            disabled ? 'tl-toggle__headline--disabled' : ''}">
             ${headline}
          </div>
        <input
          type="checkbox"
          class="${size === 'Large' ? 'tl-toggle--lg' : 'tl-toggle--sm'}"
          ${checked ? 'checked' : ''}
          ${disabled ? 'disabled' : ''}
        />
        <label class="tl-toggle__label ${
            disabled ? 'tl-toggle__label--disabled' : ''}">${label}</label>
    </div>
  `);
export const Default = Template.bind({});