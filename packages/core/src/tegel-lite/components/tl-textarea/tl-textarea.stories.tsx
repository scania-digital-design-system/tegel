import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Textarea',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    modeVariant: {
      name: 'Mode Variant',
      control: { type: 'radio' },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      description: 'Primary or secondary visual style',
    },
    state: {
      name: 'State',
      control: { type: 'radio' },
      options: ['Default', 'Success', 'Error'],
      description: 'Visual state of the component',
    },

    label: {
      name: 'Label Text',
      control: { type: 'text' },
      description: 'Text displayed as label',
    },
    labelPosition: {
      name: 'Label Position',
      control: { type: 'radio' },
      options: ['No label', 'Inside', 'Outside'],
      description: 'Where to position the label',
    },
    placeholder: {
      name: 'Placeholder Text',
      control: { type: 'text' },
      description: 'Placeholder text for the textarea',
    },
    helper: {
      name: 'Helper Text',
      control: { type: 'text' },
      description: 'Additional help text below the field',
    },

    rows: {
      name: 'Rows',
      control: { type: 'number' },
      description: 'Number of visible rows',
    },
    charCounter: {
      name: 'Character Counter',
      control: { type: 'boolean' },
      description: 'Show character counter',
    },
    maxLength: {
      name: 'Max Length',
      control: { type: 'number' },
      description: 'Maximum number of characters allowed',
      if: { arg: 'charCounter', eq: true },
    },
    noMinWidth: {
      name: 'No Minimum Width',
      control: { type: 'boolean' },
      description: 'Remove minimum width constraint',
    },

    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
      description: 'Disable the textarea',
    },
    readonly: {
      name: 'Read Only',
      control: { type: 'boolean' },
      description: 'Make the field read-only',
    },

    hideReadonlyIcon: {
      name: 'Hide Read Only Icon',
      control: { type: 'boolean' },
      if: { arg: 'readonly', eq: true },
      description: 'Hide the read-only indicator icon',
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
    charCounter: false,
    maxLength: 12,
    noMinWidth: false,

    disabled: false,
    readonly: false,
    hideReadonlyIcon: false,
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
  charCounter,
  maxLength,
  noMinWidth,
  readonly,
  hideReadonlyIcon,
  disabled,
}) => {
  const componentClasses = [
    'tl-textarea',
    modeVariant !== 'Inherit from parent' && `tl-textarea--${modeVariant.toLowerCase()}`,
    state !== 'Default' && `tl-textarea--${state.toLowerCase()}`,
    labelPosition === 'Inside' && 'tl-textarea--label-inside',
    labelPosition === 'Outside' && 'tl-textarea--label-outside',
    disabled && 'tl-textarea--disabled',
    readonly && 'tl-textarea--readonly',
    readonly && hideReadonlyIcon && 'tl-textarea--hide-readonly-icon',
    noMinWidth && 'tl-textarea--no-min-width',
  ]
    .filter(Boolean)
    .join(' ');

  const inputAttrs = [
    `rows="${rows}"`,
    `placeholder="${placeholder}"`,
    charCounter && maxLength > 0 && `maxlength="${maxLength}"`,
    disabled && 'disabled',
    readonly && 'readonly',
  ]
    .filter(Boolean)
    .join(' ');

  const labelContent =
    labelPosition === 'Outside' || labelPosition === 'Inside'
      ? `<label class="tl-textarea__label">${label}</label>`
      : '';

  const helperContent = helper ? `<div class="tl-textarea__helper">${helper}</div>` : '';

  const charCounterContent =
    charCounter && maxLength > 0
      ? `<span class="tl-textarea__charcounter">0 <span class="tl-textarea__charcounter-divider">/</span> ${maxLength}</span>`
      : '';

  const helperWrapperContent =
    helperContent || charCounterContent
      ? `<div class="tl-textarea__bottom">${helperContent}${charCounterContent}</div>`
      : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-textarea.css"
    -->
    <div class="${componentClasses}" style="width: calc(100vw - 40px); max-width: 400px;">
      ${labelContent}
      <textarea class="tl-textarea__input" ${inputAttrs}></textarea>
      ${helperWrapperContent}
    </div>
${
  charCounter && maxLength > 0
    ? `
  <!-- Script tag for demo purposes -->
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const textElement = document.querySelector('.tl-textarea__input');
        const counterElement = document.querySelector('.tl-textarea__charcounter');
        
        if (textElement && counterElement) {
          const initialLength = textElement.value.length;
          counterElement.innerHTML = initialLength + ' <span class="tl-textarea__charcounter-divider">/</span> ' + ${maxLength};
          
          textElement.addEventListener('input', (event) => {
            const currentLength = event.target.value.length;
            counterElement.innerHTML = currentLength + ' <span class="tl-textarea__charcounter-divider">/</span> ' + ${maxLength};
          });
        }
      });
    </script>`
    : ''
}
  `);
};

export const Default = Template.bind({});
