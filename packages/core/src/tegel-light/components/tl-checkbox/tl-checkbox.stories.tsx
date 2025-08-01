import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Checkbox',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      name: 'Label text',
      description: 'Sets the label of the component.',
      control: { type: 'text' },
    },
    checked: {
      name: 'Checked',
      description: 'Checks the Checkbox.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
    indeterminate: {
      name: 'Indeterminate',
      description: 'Sets the checkbox in an indeterminate state.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the Checkbox.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
  },
  args: {
    label: 'Label',
    checked: false,
    disabled: false,
    indeterminate: false,
  },
};

const Template = ({ label, checked, disabled, indeterminate }) => {
  return formatHtmlPreview(`
		<!-- Required stylesheet 
    	"@scania/tegel-light/tl-checkbox.css";
		-->
    <div class="tl-checkbox">
      <input
        type="checkbox"
        class="tl-checkbox__input ${indeterminate ? 'tl-checkbox__input--indeterminate' : ''}"
        id="tl-checkbox"
        ${disabled ? 'disabled' : ''}
				${checked ? 'checked' : ''}
      />
      <label class="tl-checkbox__label ${
        disabled ? 'tl-checkbox__label--disabled' : ''
      }" for="tl-checkbox">${label}</>
    </>
  `);
};

export const Default = Template.bind({});
