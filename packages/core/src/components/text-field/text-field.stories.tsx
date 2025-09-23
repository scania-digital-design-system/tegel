import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Text Field',
  parameters: {
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
      description: 'Which type of Text Field',
      control: {
        type: 'radio',
      },
      options: ['Text', 'Password', 'Number', 'Email', 'Tel'],
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    min: {
      name: 'Min',
      description: 'Minimum acceptable value when input type is number',
      control: {
        type: 'number',
      },
      if: {
        arg: 'type',
        eq: 'Number',
      },
    },
    max: {
      name: 'Max',
      description: 'Maximum acceptable value when input type is number',
      control: {
        type: 'number',
      },
      if: {
        arg: 'type',
        eq: 'Number',
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
      description: 'Adds a prefix symbol or text before the Text Field.',
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
      description: 'Adds a suffix symbol or text after the Text Field.',
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
    disabled: {
      description: 'Disables the Text Field.',
      name: 'Disabled',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    readonly: {
      description: 'Sets the Text Field to read-only state.',
      name: 'Read Only',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    hideReadonlyIcon: {
      description: 'Hides the read-only icon in the Text Field. Requires Read Only to be enabled.',
      name: 'Hide Read Only Icon',
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
    required: {
      name: 'Required',
      description: 'Value to be used for the required attribute',
      control: {
        type: 'boolean',
      },
      options: [true, false],
      table: {
        defaultValue: { summary: false },
      },
    },
    autocomplete: {
      name: 'Auto complete',
      description: 'Value to be used for the autocomplete attribute',
      control: {
        type: 'text',
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
    min: '0',
    max: '10',
    maxLength: 0,
    noMinWidth: 'Default',
    readonly: false,
    hideReadonlyIcon: false,
    disabled: false,
    tdsAriaLabel: 'A text field component',
    required: false,
    autocomplete: 'off',
  },
};

const Template = ({
  modeVariant,
  state,
  type,
  min,
  max,
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
  hideReadonlyIcon,
  disabled,
  tdsAriaLabel,
  required,
  autocomplete,
}) => {
  const maxlength = maxLength > 0 ? `max-length="${maxLength}"` : '';
  const minAttr = min != null ? `min="${min}"` : '';
  const maxAttr = max ? `max="${max}"` : '';
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
    max-width: 200px;
    height: 150px;
  }
    </style>

  <div class="demo-wrapper">
    <tds-text-field
      type="${type.toLowerCase()}"
      size="${sizeLookUp[size]}"
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
      state="${stateValue}"
      label="${label}"
      label-position="${labelPosition.toLowerCase()}"
      ${helper ? `helper="${helper}"` : ''}
      ${maxlength}
      ${minAttr}
      ${maxAttr}
      ${disabled ? 'disabled' : ''}
      ${readonly ? 'read-only' : ''}
      ${hideReadonlyIcon ? 'hide-read-only-icon' : ''}
      ${noMinWidth ? 'no-min-width' : ''}
      placeholder="${placeholderText}"
      tds-aria-label="${tdsAriaLabel}"
      required="${required}"
      autocomplete="${autocomplete}"
    >
        ${
          prefix || suffix
            ? `
          ${
            prefixType || suffixType === 'Text'
              ? `<span slot="${prefix ? 'prefix' : 'suffix'}">$</span>`
              : `<tds-icon slot="${
                  prefix ? 'prefix' : 'suffix'
                }" name="truck" size="20px"></tds-icon>`
          }
        `
            : ''
        }

        </tds-text-field>
  </div>
  <!-- Script tag for demo purposes -->
  <script>
    textElement = document.querySelector('tds-text-field')
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

    isReadonly = textElement.hasAttribute('readonly') || textElement.readOnly;
    isDisabled = textElement.hasAttribute('disabled') || textElement.disabled;
    if(isReadonly) {
      textElement.value = "Read only"
    }
      
    if(isDisabled) {
      textElement.value = "Disabled"
    }

  </script>
  `,
  );
};

export const Default = Template.bind({});
