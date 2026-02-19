import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Checkbox',
  parameters: {
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=30515-78521&m=dev',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=30515-78521&m=dev',
      },
    ],
  },
  argTypes: {
    label: {
      name: 'Label text',
      description: 'Sets the label of the component.',
      control: {
        type: 'text',
      },
    },
    checked: {
      name: 'Checked',
      description: 'Checks the Checkbox.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    indeterminate: {
      name: 'Indeterminate',
      description: 'Sets the checkbox in a intederminte state.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the Checkbox.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    tdsAriaLabel: {
      name: 'Aria Label',
      description: 'Value to be used for the aria-label attribute',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    label: 'Label',
    checked: false,
    disabled: false,
    indeterminate: false,
    tdsAriaLabel: 'A checkbox component',
  },
};

const Template = ({ label, checked, disabled, indeterminate, tdsAriaLabel }) =>
  formatHtmlPreview(`
    <tds-checkbox
      ${checked ? 'checked' : ''}
      ${disabled ? 'disabled' : ''}
      ${indeterminate ? 'indeterminate' : ''}
      value="checkbox-1"
      checkbox-id="first-checkbox"
      tds-aria-label="${tdsAriaLabel}"
    >
      <div slot="label">${label}</div>
    </tds-checkbox>
    
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

export const Default = Template.bind({});
