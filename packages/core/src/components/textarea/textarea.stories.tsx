import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Textarea',
  parameters: {
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
    textValue: {
      name: 'Text value',
      description: 'Sets the text value.',
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
    hideReadonlyIcon: {
      name: 'Hide Read Only Icon',
      description: 'Hides the read-only icon in the Text Field. Requires Read Only to be enabled.',
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
    tdsAriaLabel: {
      name: 'Aria Label',
      description: 'Value to be used for the aria-label attribute',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    state: 'Default',
    label: 'Label',
    labelPosition: 'No label',
    placeholder: 'Placeholder',
    textValue: '',
    helper: '',
    rows: 5,
    maxLength: 0,
    noMinWidth: false,
    readonly: false,
    hideReadonlyIcon: false,
    disabled: false,
    tdsAriaLabel: 'A textarea component',
  },
};

const Template = ({
  modeVariant,
  state,
  label,
  labelPosition,
  placeholder,
  helper,
  textValue,
  rows,
  maxLength,
  noMinWidth,
  readonly,
  hideReadonlyIcon,
  disabled,
  tdsAriaLabel,
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
      width: calc(100vw - 40px);
      max-width: 400px;
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
          ${hideReadonlyIcon ? 'hide-read-only-icon' : ''}
          ${noMinWidth ? 'no-min-width' : ''}
          placeholder="${placeholder}"
          ${maxlength}
          value="${textValue}"
          tds-aria-label="${tdsAriaLabel}"
          >
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

    isReadOnly = textElement.hasAttribute('read-only') || textElement.readOnly === true || false
    isDisabled = textElement.hasAttribute('disabled') || textElement.disabled === true || false

    if(isReadOnly || isDisabled) {
      textElement.value = 'Lorem ipsum odor amet, consectetuer adipiscing elit. Quis nunc facilisi ante, proin eros morbi.'
    }
  </script>
  `);
};

export const Default = Template.bind({});
