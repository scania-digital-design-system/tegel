import readme from './readme.md';
import readmeOption from './dropdown-option/readme.md';
import readmeFilter from './dropdown-filter/readme.md';
import { formatHtmlPreview } from '../../utils/utils';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: ComponentsFolder,
  parameters: {
    layout: 'centered',
    notes: { 'Dropdown': readme, 'Dropdown option': readmeOption, 'Dropdown filter': readmeFilter },
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9754%3A22916&t=M7Ova7xZaoeMwb5e-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9754%3A22916&t=M7Ova7xZaoeMwb5e-1',
      },
    ],
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      description:
        'Mode variant adjusts component colors to have better visibility depending on global mode and background.',
      control: {
        type: 'radio',
      },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      table: {
        defaultValue: { summary: 'Inherit from parent' },
      },
    },
    dropdownType: {
      name: 'Dropdown Type',
      description: 'Sets the type of the dropdown.',
      control: {
        type: 'radio',
      },
      options: ['Default', 'Filter', 'Multiselect'],
      table: {
        defaultValue: { summary: 'Default' },
      },
    },
    state: {
      name: 'Error state',
      description: 'Puts the component in error state.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    size: {
      name: 'Size',
      description: 'Sets the size of the dropdown.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Medium', 'Small'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    openDirection: {
      name: 'Open direction',
      description: 'Sets which direction the Dropdown will open in.',
      control: {
        type: 'radio',
      },
      options: ['Up', 'Down', 'Auto'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    labelPosition: {
      name: 'Label position',
      description: 'Sets the label text position.',
      control: {
        type: 'radio',
      },
      options: ['No label', 'Inside', 'Outside'],
      table: {
        defaultValue: { summary: 'no-label' },
      },
    },
    labelText: {
      name: 'Label text',
      description: 'Sets a label text to help describe what the Dropdown contains.',
      control: {
        type: 'text',
      },
      if: { arg: 'labelPosition', neq: 'No label' },
    },
    placeholder: {
      name: 'Placeholder',
      description: 'Sets the placeholder text when no option is selected.',
      control: {
        type: 'text',
      },
    },
    helper: {
      name: 'Helper text',
      description:
        'Sets a helper text to assist the user with additional information about the dropdown.',
      control: {
        type: 'text',
      },
    },
    defaultOption: {
      if: { arg: 'dropdownType', neq: 'Multiselect' },
      name: 'Default option',
      description: 'Sets a pre-selected option and replaces the placeholder.',
      control: {
        type: 'radio',
      },
      options: ['No default', 'Option 1', 'Option 2', 'Option 3'],
    },
    multiDefaultOption: {
      name: 'Default options',
      description: 'Sets a pre-selected option and replaces the placeholder.',
      if: { arg: 'dropdownType', eq: 'Multiselect' },
      control: {
        type: 'check',
      },
      options: ['Option 1', 'Option 2', 'Option 3'],
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the dropdown.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    dropdownType: 'Default',
    state: false,
    size: 'Large',
    openDirection: 'Auto',
    labelPosition: 'No label',
    labelText: 'Label text',
    placeholder: 'Placeholder',
    helper: '',
    defaultOption: 'Option 1',
    multiDefaultOption: ['Option 1', 'Option 2'],
    disabled: false,
  },
};

const Template = ({
  modeVariant,
  dropdownType,
  state = false,
  size,
  openDirection,
  labelText,
  labelPosition,
  placeholder,
  helper,
  defaultOption,
  multiDefaultOption,
  disabled = false,
}) => {
  const sizeLookup = { Large: 'lg', Medium: 'md', Small: 'sm' };
  const labelPosLookup = { 'No label': 'no-label', 'Inside': 'inside', 'Outside': 'outside' };
  const defaultOptionLookup = {
    'No default': 'no-default',
    'Option 1': 'option-1',
    'Option 2': 'option-2',
    'Option 3': 'option-3',
  };

  const multiDefaultOptionValue =
    dropdownType === 'Multiselect' &&
    multiDefaultOption.map((value) => value.toLowerCase().replace(' ', '-'));

  return formatHtmlPreview(`
  <style>
  /* demo-wrapper is for demonstration purposes only*/
  .demo-wrapper {
    width: 300px;
    height:200px;
  }
  </style>

    <div class="demo-wrapper">
    ${
      dropdownType !== 'Filter'
        ? `
        <sdds-dropdown
          ${
            modeVariant !== 'Inherit from parent'
              ? `mode-variant="${modeVariant.toLowerCase()}".sdds-option-label {
            `
              : ''
          }
          id="sdds-dropdown-reg"
          size="${sizeLookup[size]}"
          placeholder="${placeholder}"
          disabled="${disabled}"
          open-direction="${openDirection.toLowerCase()}"
          label-position="${labelPosLookup[labelPosition]}"
          ${labelPosLookup[labelPosition] !== 'no-label' ? `label="${labelText}"` : ''}
          ${helper !== '' ? `helper="${helper}"` : ''}
          state="${state}"
          type="${dropdownType.toLowerCase()}"
          default-option="${
            dropdownType === 'Default'
              ? defaultOptionLookup[defaultOption]
              : multiDefaultOptionValue
          }"
        >
          <sdds-dropdown-option value="option-1" tabindex="0" disabled>Option 1</sdds-dropdown-option>
          <sdds-dropdown-option value="option-2" tabindex="0">Option 2</sdds-dropdown-option>
          <sdds-dropdown-option value="option-3" tabindex="0">Option 3</sdds-dropdown-option>
        </sdds-dropdown>
    `
        : `
        <sdds-dropdown-filter
          ${
            modeVariant !== 'Inherit from parent'
              ? `mode-variant="${modeVariant.toLowerCase()}".sdds-option-label {          `
              : ''
          }
          id="sdds-dropdown-filter"
          size="${sizeLookup[size]}"
          placeholder="${placeholder}"
          disabled="${disabled}"
          open-direction="${openDirection.toLowerCase()}"
          label-position="${labelPosLookup[labelPosition]}"
          ${labelPosLookup[labelPosition] !== 'no-label' ? `label="${labelText}"` : ''}
          ${helper !== '' ? `helper="${helper}"` : ''}
          state="${state}"
          data='[
            {
              "value": "option-1",
              "label":"Jakarta"
            },
            {
              "value":"option-2"
              ,"label":"Stockholm"
            },
            {
              "value":"option-3",
              "label":"Barcelona"
            }
          ]'
          default-option="${defaultOptionLookup[defaultOption]}">

        </sdds-dropdown-filter>`
    }

      </div>
  `);
};

export const Dropdown = Template.bind({});
