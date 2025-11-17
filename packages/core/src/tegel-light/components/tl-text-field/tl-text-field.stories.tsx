import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Text Field',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    modeVariant: {
      name: 'Mode Variant',
      control: { type: 'radio' },
      options: ['Primary', 'Secondary'],
    },
    state: {
      name: 'State',
      control: { type: 'radio' },
      options: ['Default', 'Success', 'Error'],
    },
    type: {
      name: 'Type',
      control: { type: 'radio' },
      options: ['Text', 'Password', 'Number'],
    },
    size: {
      name: 'Size',
      control: { type: 'radio' },
      options: ['Large', 'Medium', 'Small'],
    },
    label: {
      name: 'Label text',
      control: { type: 'text' },
    },
    labelPosition: {
      name: 'Label position',
      control: { type: 'radio' },
      options: ['No label', 'Inside', 'Outside'],
    },
    placeholderText: {
      name: 'Placeholder',
      control: { type: 'text' },
    },
    helper: {
      name: 'Helper text',
      control: { type: 'text' },
    },
    prefix: {
      name: 'Prefix',
      control: { type: 'boolean' },
    },
    prefixType: {
      name: 'Prefix type',
      control: { type: 'radio' },
      options: ['Icon', 'Text'],
      if: { arg: 'prefix', eq: true },
    },
    suffix: {
      name: 'Suffix',
      control: { type: 'boolean' },
    },
    suffixType: {
      name: 'Suffix type',
      control: { type: 'radio' },
      options: ['Icon', 'Text'],
      if: { arg: 'suffix', eq: true },
    },
    charCounter: {
      name: 'Character counter',
      control: { type: 'boolean' },
    },
    maxLength: {
      name: 'Max length',
      control: { type: 'number' },
      if: { arg: 'charCounter', eq: true },
    },
    noMinWidth: {
      name: 'No minimum width',
      control: { type: 'boolean' },
    },
    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
    },
    readonly: {
      name: 'Read only',
      control: { type: 'boolean' },
    },
    hideReadonlyIcon: {
      name: 'Hide read only icon',
      control: { type: 'boolean' },
      if: { arg: 'readonly', eq: true },
    },
  },
  args: {
    modeVariant: 'Primary',
    state: 'Default',
    type: 'Text',
    size: 'Large',
    label: 'Label',
    labelPosition: 'No label',
    placeholderText: 'Placeholder',
    helper: 'Helper text',
    prefix: false,
    prefixType: 'Icon',
    suffix: false,
    suffixType: 'Icon',
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
  charCounter,
  maxLength,
  noMinWidth,
  disabled,
  readonly,
  hideReadonlyIcon,
}) => {
  const componentClasses = [
    'tl-text-field',
    modeVariant === 'Secondary' && 'tl-text-field--secondary',
    state === 'Success' && 'tl-text-field--success',
    state === 'Error' && 'tl-text-field--error',
    size === 'Large' && 'tl-text-field--lg',
    size === 'Medium' && 'tl-text-field--md',
    size === 'Small' && 'tl-text-field--sm',
    labelPosition === 'Inside' && 'tl-text-field--label-inside',
    noMinWidth && 'tl-text-field--no-min-width',
    disabled && 'tl-text-field--disabled',
    readonly && 'tl-text-field--readonly',
  ]
    .filter(Boolean)
    .join(' ');

  const inputAttrs = [
    `type="${type.toLowerCase()}"`,
    `placeholder="${placeholderText}"`,
    charCounter && maxLength > 0 && `maxlength="${maxLength}"`,
    disabled && 'disabled',
    readonly && 'readonly',
  ]
    .filter(Boolean)
    .join(' ');

  let prefixContent = '';
  if (prefix) {
    if (prefixType === 'Text') {
      prefixContent = '<span class="tl-text-field__prefix--text">$</span>';
    } else {
      prefixContent =
        '<span class="tl-icon tl-icon--info tl-icon--20 tl-text-field__prefix--icon"></span>';
    }
  }

  let suffixContent = '';
  if (suffix && !readonly) {
    if (suffixType === 'Text') {
      suffixContent = '<span class="tl-text-field__suffix--text">$</span>';
    } else {
      suffixContent =
        '<span class="tl-icon tl-icon--info tl-icon--20 tl-text-field__suffix--icon"></span>';
    }
  }

  const readonlyIcon =
    readonly && !hideReadonlyIcon
      ? '<div class="tl-text-field__icon-readonly"><span class="tl-icon tl-icon--edit_inactive tl-icon--20"></span></div>'
      : '';

  const labelContent =
    labelPosition === 'Outside' || labelPosition === 'Inside'
      ? `<label class="tl-text-field__label">${label}</label>`
      : '';

  const helperContent = helper
    ? `<div class="tl-text-field__helper">${helper}${
        charCounter && maxLength > 0
          ? ` <span class="tl-text-field__textcounter">0/${maxLength}</span>`
          : ''
      }</div>`
    : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-light/global.css"
      "@scania/tegel-light/tl-text-field.css"
    -->
    <!-- Optional stylesheets:
      "@scania/tegel-light/tl-icon.css"
    -->
    <div class="demo-wrapper" style="max-width: 200px; height: 150px;">
      <div class="${componentClasses}">
        ${labelContent}
        <input class="tl-text-field__input" ${inputAttrs} />
        ${prefixContent}
        ${suffixContent}
        ${readonlyIcon}
        ${helperContent}
      </div>
    </div>

  ${
    charCounter && maxLength > 0
      ? `<!-- Script tag for demo purposes -->
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const textElement = document.querySelector('.tl-text-field__input');
        const counterElement = document.querySelector('.tl-text-field__textcounter');
        
        if (textElement && counterElement) {
          textElement.addEventListener('input', (event) => {
            const currentLength = event.target.value.length;
            const maxLength = ${maxLength};
            
            if (maxLength > 0 && currentLength > maxLength) {
              event.target.value = event.target.value.slice(0, maxLength);
            }
            
            counterElement.textContent = event.target.value.length + '/' + maxLength;
          });
        }
      });
    </script>`
      : ''
  }
  `);
};

export const Default = Template.bind({});
