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
  // Compose BEM modifier classes for input
  const inputMods = [
    checked ? 'tl-checkbox__input--checked' : '',
    disabled ? 'tl-checkbox__input--disabled' : '',
    indeterminate ? 'tl-checkbox__input--indeterminate' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return formatHtmlPreview(`
    <div class="tl-checkbox">
      <input
        type="checkbox"
        class="tl-checkbox__input ${inputMods}"
        id="checkbox-1"
      />
      <label class="tl-checkbox__label" for="checkbox-1">${label}</label>
    </div>
    
    <!-- Script tag with event listener for demo purposes. -->
			<script>
				checkboxElement = document.querySelector("tds-checkbox");
				checkboxElement.addEventListener("tdsChange", (event) => {
						console.log("Checkbox with id: ", event.detail.checkboxId, " is ", event.detail.checked);
				});
				checkboxElement.addEventListener("tdsFocus", (event) => {
						console.log(event);
				});
				checkboxElement.addEventListener("tdsBlur", (event) => {
						console.log(event);
				});
			</script>
  `);
};

export const Default = Template.bind({});
