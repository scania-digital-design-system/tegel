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

const Template = ({ modeVariant, label, placeholder, helper, disabled, error, size }) => {
  const sizeClassMap = {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
    Xsmall: 'xs',
  };

  const normalizedSize = sizeClassMap[size] ?? 'lg';

  const classes = [
    'tl-dropdown',
    `tl-dropdown--${normalizedSize}`,
    modeVariant === 'Secondary' && 'tl-dropdown--secondary',
    disabled && 'tl-dropdown--disabled',
    error && 'tl-dropdown--error',
    placeholder && 'tl-dropdown--placeholder',
  ].filter(Boolean);

  const inputId = `tl-dropdown-${Math.random().toString(36).slice(2, 9)}`;

  const helperIcon = error
    ? '<span class="tl-icon tl-icon--info tl-icon--16" aria-hidden="true"></span>'
    : '';

  const helperMarkup = helper
    ? `<div class="tl-dropdown__helper">${helperIcon}${helper}</div>`
    : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-light/tl-dropdown.css"
    -->
    <!-- Optional stylesheets:
      "@scania/tegel-light/tl-icon.css"
    -->

    <div class="${classes.join(' ')}" style="--dropdown-border-radius: 0;">
      <label class="tl-dropdown__label" for="${inputId}">${label}</label>
      <select class="tl-dropdown__input" id="${inputId}" ${disabled ? 'disabled' : ''}>
        <option value="" disabled selected>${placeholder}</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>
      <div class="tl-dropdown__bar"></div>
      ${helperMarkup}
    </div>
    <script>
      (function () {
        const dropdown = document.getElementById('${inputId}');
        if (!dropdown || dropdown.dataset.placeholderInit === 'true') return;
        dropdown.dataset.placeholderInit = 'true';

        const hasPlaceholder = ${JSON.stringify(Boolean(placeholder))};
        const wrapper = dropdown.closest('.tl-dropdown');
        if (!wrapper) return;
        if (!hasPlaceholder) {
          wrapper.classList.remove('tl-dropdown--placeholder');
          return;
        }

        const togglePlaceholderClass = () => {
          if (dropdown.value === '') {
            wrapper.classList.add('tl-dropdown--placeholder');
          } else {
            wrapper.classList.remove('tl-dropdown--placeholder');
          }
        };

        dropdown.addEventListener('change', togglePlaceholderClass);
        dropdown.addEventListener('input', togglePlaceholderClass);
        togglePlaceholderClass();

        dropdown.addEventListener('keydown', (event) => {
          if (event.defaultPrevented || dropdown.disabled) return;
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (typeof dropdown.showPicker === 'function') {
              dropdown.showPicker();
            } else if (typeof dropdown.click === 'function') {
              dropdown.click();
            }
          }
        });
      })();
    </script>
  `);
};

export const Default = Template.bind({});
