import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Dropdown',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      control: { type: 'radio' },
      options: ['Primary', 'Secondary'],
    },
    label: {
      name: 'Label',
      control: 'text',
    },
    placeholder: {
      name: 'Placeholder',
      control: 'text',
    },
    helper: {
      name: 'Helper text',
      control: 'text',
    },
    disabled: {
      name: 'Disabled',
      control: 'boolean',
    },
    error: {
      name: 'Error state',
      control: 'boolean',
    },
    size: {
      name: 'Size',
      control: { type: 'radio' },
      options: ['Large', 'Medium', 'Small', 'Xsmall'],
    },
  },
  args: {
    modeVariant: 'Primary',
    label: 'Label',
    placeholder: 'Placeholder',
    helper: 'Helper text',
    disabled: false,
    error: false,
    size: 'Large',
  },
};

const Template = ({
  modeVariant,
  label,
  placeholder,
  helper,
  disabled,
  error,
  size,
  labelPlacement,
}) => {
  const sizeClassMap = {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  };

  const normalizedSize = sizeClassMap[size] ?? 'lg';
  const isLabelInside = labelPlacement === 'Inside';
  const showLabel = labelPlacement !== 'No label';
  const hasInitialPlaceholder = isLabelInside || Boolean(placeholder);

  const classes = [
    'tl-dropdown',
    `tl-dropdown--${normalizedSize}`,
    modeVariant === 'Secondary' && 'tl-dropdown--secondary',
    disabled && 'tl-dropdown--disabled',
    error && 'tl-dropdown--error',
    placeholder && 'tl-dropdown--placeholder',
  ].filter(Boolean);

  const dropdownClasses = classes.join(' ');

  const labelId = showLabel ? 'tl-dropdown-story-label' : '';
  const labelClassNames = ['tl-dropdown__label'];
  if (isLabelInside) labelClassNames.push('tl-dropdown__label--inside');
  const labelMarkup = showLabel
    ? `<label class="${labelClassNames.join(' ')}"${
        labelId ? ` id="${labelId}"` : ''
      }>${label}</label>`
    : '';
  const placeholderOption = !hasInitialPlaceholder
    ? ''
    : isLabelInside
    ? '<option value="" hidden selected></option>'
    : `<option value="" disabled selected>${placeholder}</option>`;
  const ariaLabelAttr =
    showLabel && labelId
      ? `aria-labelledby="${labelId}"`
      : !showLabel && label
      ? `aria-label="${label}"`
      : '';

  let helperMarkup = '';
  if (helper) {
    const helperIcon = error
      ? '<span class="tl-icon tl-icon--info tl-icon--16" aria-hidden="true"></span>'
      : '';
    helperMarkup = `<div class="tl-dropdown__helper">${helperIcon}${helper}</div>`;
  }

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-light/tl-dropdown.css"
    -->
    <!-- Optional stylesheets:
      "@scania/tegel-light/tl-icon.css"
    -->

    <div class="demo-wrapper" style="max-width: 208px; height: 150px;">
      <div class="${classes.join(' ')}">
        ${labelMarkup}

        <select class="tl-dropdown__input" ${ariaLabelAttr} ${disabled ? 'disabled' : ''}>
          ${placeholderOption}
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
          <option value="5">Option 5</option>
        </select>
        <div class="tl-dropdown__bar"></div>
        ${helperMarkup}
      </div>
    </div>
  `);
};

export const Default = Template.bind({});
