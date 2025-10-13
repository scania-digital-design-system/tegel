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
      options: ['Inherit from parent', 'Primary', 'Secondary'],
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
    showHelper: {
      name: 'Show helper',
      control: 'boolean',
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
      options: ['Large', 'Medium', 'Small'],
    },
    labelPlacement: {
      name: 'Label placement',
      control: { type: 'radio' },
      options: ['Outside', 'Inside', 'No label'],
    },
    fieldType: {
      name: 'Field type',
      control: { type: 'radio' },
      options: ['Custom input', 'Native select'],
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    label: 'Label',
    placeholder: 'Placeholder',
    helper: 'Helper text',
    showHelper: true,
    disabled: false,
    error: false,
    size: 'Large',
    labelPlacement: 'Outside',
    fieldType: 'Custom input',
  },
};

const Template = ({
  modeVariant,
  label,
  placeholder,
  helper,
  showHelper,
  disabled,
  error,
  size,
  labelPlacement,
  fieldType,
}) => {
  const normalizedSize =
    {
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
    }[size] ?? 'lg';
  const isLabelInside = labelPlacement === 'Inside';
  const showLabel = labelPlacement !== 'No label';
  const hasInitialPlaceholder = isLabelInside || Boolean(placeholder);
  const useNativeSelect = fieldType === 'Native select';

  const classes = [
    'tl-dropdown',
    `tl-dropdown--${normalizedSize}`,
    modeVariant === 'Primary' && 'tl-dropdown--primary',
    modeVariant === 'Secondary' && 'tl-dropdown--secondary',
    disabled && 'tl-dropdown--disabled',
    error && 'tl-dropdown--error',
    isLabelInside && 'tl-dropdown--label-inside',
    !showLabel && 'tl-dropdown--no-label',
  ].filter(Boolean);

  const dropdownClasses = classes.join(' ');

  const labelId = showLabel ? 'tl-dropdown-story-label' : '';
  const labelClasses = ['tl-dropdown__label'];
  if (isLabelInside) {
    labelClasses.push('tl-dropdown__label--inside');
  }

  let labelMarkup = '';
  if (showLabel) {
    const labelIdAttr = labelId ? ` id="${labelId}"` : '';
    labelMarkup = `<label class="${labelClasses.join(' ')}"${labelIdAttr}>${label}</label>`;
  }

  let placeholderOption = '';
  if (hasInitialPlaceholder) {
    placeholderOption = isLabelInside
      ? '<option value="" hidden selected></option>'
      : `<option value="" disabled selected>${placeholder}</option>`;
  }

  let ariaLabelAttr = '';
  if (showLabel && labelId) {
    ariaLabelAttr = `aria-labelledby="${labelId}"`;
  } else if (!showLabel && label) {
    ariaLabelAttr = `aria-label="${label}"`;
  }

  const selectAttributes = [ariaLabelAttr, disabled ? 'disabled' : ''].filter(Boolean).join(' ');

  const helperText = showHelper ? helper : '';

  let helperMarkup = '';
  if (helperText) {
    const helperIcon = error
      ? '<span class="tl-icon tl-icon--info tl-icon--16" aria-hidden="true"></span>'
      : '';
    helperMarkup = `<div class="tl-dropdown__helper">${helperIcon}${helperText}</div>`;
  }

  const fieldClass = useNativeSelect ? 'tl-dropdown__select' : 'tl-dropdown__input';
  const fieldMarkup = `<select class="${fieldClass}" ${selectAttributes}>
          ${placeholderOption}
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
          <option value="5">Option 5</option>
        </select>`;

  const barMarkup = useNativeSelect ? '' : '<div class="tl-dropdown__bar"></div>';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-light/tl-dropdown.css"
    -->
    <!-- Optional stylesheets:
      "@scania/tegel-light/tl-icon.css"
    -->

    <div class="demo-wrapper" style="max-width: 208px; height: 150px;">
      <div class="${dropdownClasses}">
        ${labelMarkup}

        ${fieldMarkup}
        ${barMarkup}
        ${helperMarkup}
      </div>
    </div>
  `);
};

export const Default = Template.bind({});
