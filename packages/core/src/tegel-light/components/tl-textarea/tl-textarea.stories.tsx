import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Textarea',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance
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

    // Content
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
    textValue: {
      name: 'Text Value',
      control: { type: 'text' },
      description: 'Initial text value',
    },
    helper: {
      name: 'Helper Text',
      control: { type: 'text' },
      description: 'Additional help text below the field',
    },

    // Input Configuration
    rows: {
      name: 'Rows',
      control: { type: 'number' },
      description: 'Number of visible rows',
    },
    maxLength: {
      name: 'Max Length',
      control: { type: 'number' },
      description: 'Maximum number of characters allowed',
    },
    noMinWidth: {
      name: 'No Minimum Width',
      control: { type: 'boolean' },
      description: 'Remove minimum width constraint',
    },

    // States
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

    // Read Only Options
    hideReadonlyIcon: {
      name: 'Hide Read Only Icon',
      control: { type: 'boolean' },
      if: { arg: 'readonly', eq: true },
      description: 'Hide the read-only indicator icon',
    },
  },
  args: {
    // Appearance
    modeVariant: 'Inherit from parent',
    state: 'Default',

    // Content
    label: 'Label',
    labelPosition: 'No label',
    placeholder: 'Placeholder',
    textValue: '',
    helper: '',

    // Input Configuration
    rows: 5,
    maxLength: 0,
    noMinWidth: false,

    // States
    disabled: false,
    readonly: false,

    // Read Only Options
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
  textValue,
  rows,
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
    disabled && 'tl-textarea--disabled',
    readonly && 'tl-textarea--readonly',
    noMinWidth && 'tl-textarea--no-min-width',
  ]
    .filter(Boolean)
    .join(' ');

  const inputAttrs = [
    `rows="${rows}"`,
    `placeholder="${placeholder}"`,
    maxLength > 0 && `maxlength="${maxLength}"`,
    disabled && 'disabled',
    readonly && 'readonly',
  ]
    .filter(Boolean)
    .join(' ');

  const readonlyIcon =
    readonly && !hideReadonlyIcon
      ? '<div class="tl-textarea__icon-readonly"><span class="tl-icon tl-icon--edit_inactive tl-icon--20"></span></div>'
      : '';

  const labelOutside =
    labelPosition === 'Outside'
      ? `<div class="tl-textarea__label-outside"><label>${label}</label></div>`
      : '';

  const labelInside =
    labelPosition === 'Inside' ? `<label class="tl-textarea__label-inside">${label}</label>` : '';

  const helperContent = helper
    ? `<div class="tl-textarea__helper">${
        state === 'Error'
          ? '<span class="tl-icon tl-icon--info tl-icon--16" aria-hidden="true"></span>'
          : ''
      }${helper} ${
        maxLength > 0 ? `<span class="tl-textarea__textcounter">0/${maxLength}</span>` : ''
      }</div>`
    : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-light/global.css"
      "@scania/tegel-light/tl-textarea.css"
    -->
    <!-- Optional stylesheets:
      "@scania/tegel-light/tl-icon.css"
    -->
    <div class="demo-wrapper" style="width: calc(100vw - 40px); max-width: 400px;">
      <div class="${componentClasses}">
        ${labelOutside}
        <div class="tl-textarea__wrapper">
          <div class="tl-textarea__content">
            <div style="position: relative; flex: 1;">
              <textarea class="tl-textarea__input" ${inputAttrs}>${textValue}</textarea>
              <div class="tl-textarea__resizer-icon">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.8536 0.853553C12.0488 0.658291 12.0488 0.341709 11.8536 0.146447C11.6583 -0.0488155 11.3417 -0.0488155 11.1464 0.146447L0.146447 11.1464C-0.0488155 11.3417 -0.0488155 11.6583 0.146447 11.8536C0.341709 12.0488 0.658291 12.0488 0.853553 11.8536L11.8536 0.853553ZM11.8536 4.64645C12.0488 4.84171 12.0488 5.15829 11.8536 5.35355L5.35355 11.8536C5.15829 12.0488 4.84171 12.0488 4.64645 11.8536C4.45118 11.6583 4.45118 11.3417 4.64645 11.1464L11.1464 4.64645C11.3417 4.45118 11.6583 4.45118 11.8536 4.64645ZM11.8536 8.64645C12.0488 8.84171 12.0488 9.15829 11.8536 9.35355L9.35355 11.8536C9.15829 12.0488 8.84171 12.0488 8.64645 11.8536C8.45118 11.6583 8.45118 11.3417 8.64645 11.1464L11.1464 8.64645C11.3417 8.45118 11.6583 8.45118 11.8536 8.64645Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            ${readonlyIcon}
            ${labelInside}
          </div>
          <div class="tl-textarea__bar"></div>
        </div>
        ${helperContent}
      </div>
    </div>

  <!-- Script tag for demo purposes -->
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const textElement = document.querySelector('.tl-textarea__input');
        const counterElement = document.querySelector('.tl-textarea__textcounter');
        
        if (textElement && counterElement && ${maxLength} > 0) {
          // Update counter on initial load
          const initialLength = textElement.value.length;
          counterElement.textContent = initialLength + '/' + ${maxLength};
          
          // Update counter on input
          textElement.addEventListener('input', (event) => {
            const currentLength = event.target.value.length;
            counterElement.textContent = currentLength + '/' + ${maxLength};
          });
        }
      });
    </script>
  `);
};

export const Default = Template.bind({});
