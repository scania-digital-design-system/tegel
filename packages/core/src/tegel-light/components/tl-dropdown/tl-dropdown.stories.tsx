import formatHtmlPreview from '../../../stories/formatHtmlPreview';

/**
 * JS required: This dropdown uses JavaScript for open/close and keyboard navigation.
 * If JS är avstängt visas endast knappen.
 */

export const ButtonDropdown = ({
  size = 'Large',
  label = 'Dropdown',
  placeholder = 'Välj ett alternativ',
  helper = 'Helper text',
  showHelper = true,
  error = false,
  disabled = false,
  labelPlacement = 'Outside',
}) => {
  const normalizedSize =
    {
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
    }[size] ?? 'md';
  const isLabelInside = labelPlacement === 'Inside';
  const showLabel = labelPlacement !== 'No label';
  const labelId = 'tl-dropdown-label-btn-md';
  const dropdownClasses = [
    'tl-dropdown',
    `tl-dropdown--${normalizedSize}`,
    error && 'tl-dropdown--error',
    disabled && 'tl-dropdown--disabled',
    isLabelInside && 'tl-dropdown--label-inside',
    !showLabel && 'tl-dropdown--no-label',
    'tl-dropdown__button-demo',
  ]
    .filter(Boolean)
    .join(' ');
  const labelMarkup = showLabel
    ? `<label class="tl-dropdown__label${
        isLabelInside ? ' tl-dropdown__label--inside' : ''
      }" id="${labelId}">${label}</label>`
    : '';
  const helperMarkup =
    showHelper && helper
      ? `<div class="tl-dropdown__helper">${
          error ? '<span class="tl-icon tl-icon--info tl-icon--16" aria-hidden="true"></span>' : ''
        }${helper}</div>`
      : '';
  /*   const script = `
    (() => {
      const dropdown = document.querySelector('.tl-dropdown__button-demo');
      if (!dropdown) return;
      const button = dropdown.querySelector('.tl-dropdown__button');
      const chevron = button.querySelector('.tl-icon--chevron_down');
      const list = dropdown.querySelector('.tl-dropdown__list');
      let open = false;
      function setChevron(open) {
        if (chevron) {
          chevron.style.transition = 'transform 0.2s';
          chevron.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
      function setListDisplay(open) {
        list.style.display = open ? 'block' : 'none';
      }
      function close() {
        setListDisplay(false);
        button.setAttribute('aria-expanded', 'false');
        setChevron(false);
        open = false;
      }
      function openList() {
        setListDisplay(true);
        button.setAttribute('aria-expanded', 'true');
        setChevron(true);
        open = true;
        // Focus first option
        const first = list.querySelector('.tl-dropdown__option:not([aria-disabled="true"])');
        if (first) first.focus();
      }
      button.addEventListener('click', e => {
        open ? close() : openList();
      });
      button.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openList();
        }
      });
      list.addEventListener('keydown', e => {
        const options = Array.from(list.querySelectorAll('.tl-dropdown__option'));
        const idx = options.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = options[idx+1] || options[0];
          next.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = options[idx-1] || options[options.length-1];
          prev.focus();
        } else if (e.key === 'Escape') {
          close();
          button.focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (document.activeElement.classList.contains('tl-dropdown__option')) {
            button.innerHTML = document.activeElement.innerHTML + '<span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>';
            setChevron(false);
            close();
            button.focus();
          }
        }
      });
      // Option click
      list.querySelectorAll('.tl-dropdown__option').forEach(opt => {
        opt.addEventListener('click', e => {
          button.innerHTML = opt.innerHTML + '<span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>';
          setChevron(false);
          close();
        });
      });
      // Click outside
      document.addEventListener('mousedown', e => {
        if (!dropdown.contains(e.target)) close();
      });
      close();
    })();
  `; */
  return formatHtmlPreview(`
    <!-- JS required for open/close and keyboard navigation -->
    <div style="max-width: 208px; width: 100%;">
      <div class="${dropdownClasses}">
        ${labelMarkup}
        <button type="button" class="tl-dropdown__button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="${labelId}" ${
    disabled ? 'disabled' : ''
  }>
          <span class="tl-dropdown__button-placeholder">${!isLabelInside ? placeholder : ''}</span>
          <span class="tl-dropdown__button-value"></span>
          <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>
        </button>
        <ul class="tl-dropdown__list" role="listbox" aria-labelledby="${labelId}" tabindex="-1">
          <li class="tl-dropdown__option" role="option" tabindex="0">Option 1</li>
          <li class="tl-dropdown__option" role="option" tabindex="0">Option 2</li>
          <li class="tl-dropdown__option" role="option" tabindex="0">Option 3</li>
          <li class="tl-dropdown__option" role="option" tabindex="0" aria-disabled="true">Option disabled</li>
          <li class="tl-dropdown__option" role="option" tabindex="0">Option 4</li>
        </ul>
        ${helperMarkup}
      </div>
      <script>
      (() => {
        const dropdown = document.querySelector('.tl-dropdown__button-demo');
        if (!dropdown) return;
        const button = dropdown.querySelector('.tl-dropdown__button');
        const chevron = button.querySelector('.tl-icon--chevron_down');
        const list = dropdown.querySelector('.tl-dropdown__list');
        const valueSpan = button.querySelector('.tl-dropdown__button-value');
        let open = false;
        let selectedValue = '';
        function setChevron(open) {
          if (chevron) {
            chevron.style.transition = 'transform 0.2s';
            chevron.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
          }
        }
        function setListDisplay(open) {
          list.style.display = open ? 'block' : 'none';
        }
        function close() {
          setListDisplay(false);
          button.setAttribute('aria-expanded', 'false');
          setChevron(false);
          open = false;
        }
        function openList() {
          setListDisplay(true);
          button.setAttribute('aria-expanded', 'true');
          setChevron(true);
          open = true;
          // Focus first option
          const first = list.querySelector('.tl-dropdown__option:not([aria-disabled="true"])');
          if (first) first.focus();
        }
        function setHasValueClass(hasValue) {
          dropdown.classList.toggle('tl-dropdown--has-value', hasValue);
        }
        // Option click
        list.querySelectorAll('.tl-dropdown__option').forEach(opt => {
          opt.addEventListener('click', e => {
            valueSpan.textContent = opt.textContent;
            selectedValue = opt.textContent.trim();
            setHasValueClass(!!selectedValue);
            setChevron(false);
            close();
          });
        });
        // Keyboard selection
        list.addEventListener('keydown', e => {
          if ((e.key === 'Enter' || e.key === ' ') && document.activeElement.classList.contains('tl-dropdown__option')) {
            valueSpan.textContent = document.activeElement.textContent;
            selectedValue = document.activeElement.textContent.trim();
            setHasValueClass(!!selectedValue);
            setChevron(false);
            close();
          }
        });
        // Click outside
        document.addEventListener('mousedown', e => {
          if (!dropdown.contains(e.target)) close();
        });
        // Open/close logic
        button.addEventListener('click', e => {
          open ? close() : openList();
        });
        button.addEventListener('keydown', e => {
          if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openList();
          }
        });
        // Init: no value selected
  setHasValueClass(false);
        close();
      })();
      </script>
    </div>
  `);
};

export default {
  title: 'Tegel Light (CSS)/Dropdown',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
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
      defaultValue: true,
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
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helper: 'Helper text',
    showHelper: true,
    disabled: false,
    error: false,
    size: 'Large',
    labelPlacement: 'Outside',
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
  // ...existing code...
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
  // ...existing code...

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

  const fieldClass = 'tl-dropdown__select';
  const fieldMarkup = `
    <div style="position: relative; display: flex; align-items: center;">
      <select class="${fieldClass}" ${selectAttributes} style="width: 100%;">
        ${placeholderOption}
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
      </select>
      <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true" style="position: absolute; right: 12px; pointer-events: none;"></span>
    </div>`;

  const barMarkup = '<div class="tl-dropdown__bar"></div>';

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
