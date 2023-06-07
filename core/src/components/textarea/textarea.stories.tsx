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
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=1828%3A85238&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=1828%3A85238&t=Ne6myqwca5m00de7-1',
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
    placeholder: {
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
    rows: {
      name: 'Rows',
      description: 'Sets the number of rows.',
      control: {
        type: 'number',
      },
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
      name: 'Read only',
      description: 'Sets the Textarea to read-only state.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the Textarea.',
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
    label: 'Label',
    labelPosition: 'No label',
    placeholder: 'Placeholder',
    helper: '',
    rows: 5,
    maxLength: 0,
    noMinWidth: false,
    readonly: false,
    disabled: false,
  },
};

const Template = ({
  modeVariant,
  state,
  label,
  labelPosition,
  placeholder,
  helper,
  rows,
  maxLength,
  noMinWidth,
  readonly,
  disabled,
}) => {
  const maxlength = maxLength > 0 ? `max-length="${maxLength}"` : '';
  const stateValue = state.toLowerCase();
  const labelPosLookup = {
    'No label': 'no-label',
    'Inside': 'inside',
    'Outside': 'outside',
  };
  return formatHtmlPreview(`
  <style>
  /* demo-wrapper is for demonstration purposes only*/
    .demo-wrapper {
      width: 400px;
    }
  </style>

  <div class="demo-wrapper">
        <tds-textarea
          rows="${rows}"
          state="${stateValue}"
          label="${label}"
          helper="${helper}"
          ${
            modeVariant !== 'Inherit from parent'
              ? `mode-variant="${modeVariant.toLowerCase()}"`
              : ''
          }
          label-position="${labelPosLookup[labelPosition]}"
          ${disabled ? 'disabled' : ''}
          ${readonly ? 'read-only' : ''}
          ${noMinWidth ? 'no-min-width' : ''}
          placeholder="${placeholder}"
          ${maxlength}>
        </tds-textarea>
  </div>
  <!-- Script tag for demo purposes -->
  <script>
    textElement = document.querySelector('tds-textarea')

    textElement.addEventListener('tdsFocus',(event) => {
      console.log(event)
    })
    textElement.addEventListener('tdsBlur',(event) => {
      console.log(event)
    })
    textElement.addEventListener('tdsInput',(event) => {
      console.log(event)
    })
    textElement.addEventListener('tdsChange',(event) => {
      console.log(event)
    })
  </script>
  `);
};

export const Textarea = Template.bind({});
