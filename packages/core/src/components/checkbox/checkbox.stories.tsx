import formatHtmlPreview from '../../stories/formatHtmlPreview';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Checkbox`,
  parameters: {
    notes: readme,
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9266%3A17409&t=rVXuTOgTmXPauyHd-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9266%3A17409&t=rVXuTOgTmXPauyHd-1',
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
  },
  args: {
    label: 'Label',
    checked: false,
    disabled: false,
    indeterminate: false,
  },
};

const Template = ({ label, checked, disabled, indeterminate }) =>
  formatHtmlPreview(`
    <tds-checkbox
        ${checked ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
        ${indeterminate ? 'indeterminate' : ''}
        value="allSelected"
        checkbox-id="all-selected-checkbox"
        >
        <div slot="label">Select all</div>
    </tds-checkbox>
    <tds-checkbox
        ${checked ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
        ${indeterminate ? 'indeterminate' : ''}
        value="checkbox-1"
        checkbox-id="first-checkbox"
        >
        <div slot="label">${label}</div>
    </tds-checkbox>
    <tds-checkbox
        ${checked ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
        ${indeterminate ? 'indeterminate' : ''}
        value="checkbox-2"
        checkbox-id="second-checkbox"
        >
        <div slot="label">${label}</div>
    </tds-checkbox>
    
    <!-- Script tag with event listener for demo purposes. -->
    <script>
      allSelectedCheckbox = document.querySelector('[checkbox-id="all-selected-checkbox"]');
      firstCheckbox = document.querySelector('[checkbox-id="first-checkbox"]');
      secondCheckbox = document.querySelector('[checkbox-id="second-checkbox"]');
      
      allSelectedCheckbox.addEventListener('tdsChange', (event) => {
          firstCheckbox.checked = event.detail.checked;
          secondCheckbox.checked = event.detail.checked;
          handleCheckboxChange(secondCheckbox, firstCheckbox);

      });
      
      function handleCheckboxChange(checkbox, otherCheckbox) {
          if (checkbox.checked !== otherCheckbox.checked) {
              allSelectedCheckbox.checked = false;
              allSelectedCheckbox.indeterminate = true;
          } else if (checkbox.checked && otherCheckbox.checked) {
              allSelectedCheckbox.checked = true;
              allSelectedCheckbox.indeterminate = false;
          } else {
              allSelectedCheckbox.checked = false;
              allSelectedCheckbox.indeterminate = false;
          }
      }
      
      firstCheckbox.addEventListener('tdsChange', (event) => {
          handleCheckboxChange(firstCheckbox, secondCheckbox);
      });
      
      secondCheckbox.addEventListener('tdsChange', (event) => {
          handleCheckboxChange(secondCheckbox, firstCheckbox);
      });

    </script>
  `);

export const Default = Template.bind({});
