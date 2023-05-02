import readme from './readme.md';
import { formatHtmlPreview } from '../../utils/utils';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: ComponentsFolder,
  parameters: {
    notes: readme,
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=1675%3A76544&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=1675%3A76544&t=Ne6myqwca5m00de7-1',
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
    state: {
      name: 'State',
      description: 'Switches between success and error state.',
      control: {
        type: 'radio',
      },
      options: ['Default', 'Success', 'Error'],
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    type: {
      name: 'Type',
      description: 'Which type of textfield',
      control: {
        type: 'radio',
      },
      options: ['Text', 'Password'],
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    size: {
      name: 'Size',
      description: 'Switches between different sizes.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Medium', 'Small'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    label: {
      name: 'Label text',
      description: 'Sets the label text.',
      control: {
        type: 'text',
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
    placeholderText: {
      name: 'Placeholder',
      description: 'Sets the placeholder text.',
      control: {
        type: 'text',
      },
    },
    helper: {
      name: 'Helper text',
      description: 'Sets the helper text.',
      control: {
        type: 'text',
      },
    },
    prefix: {
      name: 'Prefix',
      description: 'Adds a prefix symbol or text before the textfield.',
      control: {
        type: 'boolean',
      },
    },
    prefixType: {
      name: 'Prefix type',
      description: 'Switches between icon and text for the prefix.',
      control: {
        type: 'radio',
      },
      options: ['Icon', 'Text'],
      if: { arg: 'prefix', eq: true },
    },
    suffix: {
      name: 'Suffix',
      description: 'Adds a suffix symbol or text after the textfield.',
      control: {
        type: 'boolean',
      },
    },
    suffixType: {
      name: 'Suffix type',
      description: 'Swithces between icon or text for the suffix.',
      control: {
        type: 'radio',
      },
      options: ['Icon', 'Text'],
      if: { arg: 'suffix', eq: true },
    },
    maxLength: {
      name: 'Max length',
      description: 'Sets a maximum value of how long the text can be.',
      control: {
        type: 'number',
      },
    },
    noMinWidth: {
      name: 'No minimum width',
      description: 'Enables component to shrink below 208px which is the default width.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    readonly: {
      description: 'Sets the textfield to read-only state.',
      name: 'Read Only',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      description: 'Disables the textfield.',
      name: 'Disabled',
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
    state: 'Default',
    type: 'Text',
    size: 'Large',
    label: 'Label',
    labelPosition: 'No label',
    placeholderText: 'Placeholder',
    helper: '',
    prefix: false,
    prefixType: 'Icon',
    suffix: false,
    suffixType: 'Icon',
    maxLength: 0,
    noMinWidth: 'Default',
    readonly: false,
    disabled: false,
  },
};

const Template = ({
  modeVariant,
  state,
  type,
  size,
  label,
  labelPosition,
  placeholderText,
  helper,
  prefix,
  prefixType,
  suffix,
  suffixType,
  maxLength,
  noMinWidth,
  readonly,
  disabled,
}) => {
  const maxlength = maxLength > 0 ? `max-length="${maxLength}"` : '';
  const stateValue = state.toLowerCase();
  const sizeLookUp = {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  };
  return formatHtmlPreview(
    `
    <style>
    /* demo-wrapper is for demonstration purposes only*/
  .demo-wrapper {
    width: 200px;
    height: 150px;
  }
    </style>

  <div class="demo-wrapper">
    <sdds-textfield
      type="${type}"
      size="${sizeLookUp[size]}"
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
      state="${stateValue}"
      label="${label}"
      label-position="${labelPosition.toLowerCase()}"
      ${helper ? `helper="${helper}"` : ''}
      ${maxlength}
      ${disabled ? 'disabled' : ''}
      ${readonly ? 'read-only' : ''}
      ${noMinWidth ? 'no-min-width' : ''}
      placeholder="${placeholderText}" >
        ${
          prefix
            ? `
          ${
            prefixType === 'Text'
              ? '<span slot="prefix">$</span>'
              : '<sdds-icon slot="prefix" name="truck" size="20px"></sdds-icon>'
          }
        `
            : ''
        }
        ${
          suffix
            ? `
          ${
            suffixType === 'Text'
              ? '<span slot="suffix">$</span>'
              : '<sdds-icon slot="suffix" name="truck" size="20px"></sdds-icon>'
          }        `
            : ''
        }
        </sdds-textfield>
  </div>
  <!-- Script tag for demo purposes -->
  <script>
    textElement = document.querySelector('sdds-textfield')
    textElement.addEventListener('sddsFocus',(event) => {
      console.log(event)
    })
    textElement.addEventListener('sddsBlur',(event) => {
      console.log(event)
    })
    textElement.addEventListener('sddsInput',(event) => {
      console.log(event)
    })
    textElement.addEventListener('sddsChange',(event) => {
      console.log(event)
    })
  </script>
  `,
  );
};

// ${true ? '<sdds-icon name="cross" slot="sdds-prefix"></sdds-icon>' : ''}

export const Textfield = Template.bind({});
