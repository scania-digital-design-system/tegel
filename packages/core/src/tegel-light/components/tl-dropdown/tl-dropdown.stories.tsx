import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Dropdown',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Use the radio button in the Controls panel to toggle between the select and button variants.',
      },
    },
  },
  argTypes: {
    multiselect: {
      name: 'Multiselect',
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'Enable multiselect for button variant',
    },
    variant: {
      name: 'Variant',
      control: { type: 'radio' },
      options: ['Select', 'Button'],
      defaultValue: 'Select',
      description: 'Toggle between select and button variant',
    },
    label: { name: 'Label', control: 'text' },
    placeholder: { name: 'Placeholder', control: 'text' },
    helper: { name: 'Helper', control: 'text' },
    showHelper: { name: 'Show helper', control: 'boolean' },
    disabled: { name: 'Disabled', control: 'boolean' },
    error: { name: 'Error', control: 'boolean' },
    size: {
      name: 'Size',
      control: { type: 'radio' },
      options: ['Large', 'Medium', 'Small'],
      defaultValue: 'Large',
    },
    labelPlacement: {
      name: 'Label placement',
      control: { type: 'radio' },
      options: ['Outside', 'Inside', 'No label'],
      defaultValue: 'Outside',
    },
    modeVariant: {
      name: 'Mode Variant',
      control: { type: 'radio' },
      options: ['Primary', 'Secondary'],
      defaultValue: 'Primary',
      description: 'Choose dropdown mode variant',
    },
  },
  args: {
    multiselect: false,
    variant: 'Select',
    label: 'Label',
    placeholder: 'Placeholder',
    helper: 'Helper text',
    showHelper: true,
    disabled: false,
    error: false,
    size: 'Large',
    labelPlacement: 'Outside',
    modeVariant: 'Primary',
  },
};

const Template = ({
  variant,
  label,
  placeholder,
  helper,
  showHelper,
  disabled,
  error,
  size,
  labelPlacement,
  multiselect,
  modeVariant,
}) => {
  const normalizedSize = { Large: 'lg', Medium: 'md', Small: 'sm' }[size] ?? 'lg';
  const isLabelInside = labelPlacement === 'Inside';
  const showLabel = labelPlacement !== 'No label';
  const modeClass = modeVariant === 'Secondary' ? 'tl-dropdown--secondary' : 'tl-dropdown--primary';
  const labelId = showLabel ? 'tl-dropdown-story-label' : '';
  const labelClasses = ['tl-dropdown__label'];
  if (isLabelInside) labelClasses.push('tl-dropdown__label--inside');
  let labelMarkup = '';
  if (showLabel) {
    const labelIdAttr = labelId ? ` id="${labelId}"` : '';
    labelMarkup = `<label class="${labelClasses.join(' ')}"${labelIdAttr}>${label}</label>`;
  }
  let helperMarkup = '';
  if (showHelper && helper) {
    const helperIcon = error
      ? '<span class="tl-icon tl-icon--info tl-icon--16" aria-hidden="true"></span>'
      : '';
    helperMarkup = `<div class="tl-dropdown__helper">${helperIcon}${helper}</div>`;
  }
  let fieldMarkup = '';
  if (variant === 'Select') {
    let placeholderOption = '';
    if (isLabelInside) {
      placeholderOption = '<option value="" hidden selected></option>';
    } else if (placeholder) {
      placeholderOption = `<option value="" disabled selected>${placeholder}</option>`;
    }
    let ariaLabelAttr = '';
    if (showLabel && labelId) {
      ariaLabelAttr = `aria-labelledby="${labelId}"`;
    } else if (!showLabel && label) {
      ariaLabelAttr = `aria-label="${label}"`;
    }
    const selectAttributes = [ariaLabelAttr, disabled ? 'disabled' : ''].filter(Boolean).join(' ');
    fieldMarkup = `
      <div style="position: relative; display: flex; align-items: center;">
        <select class="tl-dropdown__select" ${selectAttributes} style="width: 100%;">
          ${placeholderOption}
          <option class="tl-dropdown__option" value="1">Option 1</option>
          <option class="tl-dropdown__option" value="2">Option 2</option>
          <option class="tl-dropdown__option" value="3">Option 3</option>
          <option class="tl-dropdown__option" value="4">Option 4</option>
          <option class="tl-dropdown__option" value="5">Option 5</option>
        </select>
        <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true" style="position: absolute; right: 16px; pointer-events: none;"></span>
      </div>`;
  } else if (multiselect) {
    // Multiselect button variant
    const dropdownId = 'tl-dropdown-list-' + Math.random().toString(36).slice(2, 8);
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
    const optionsMarkup = options
      .map((opt, i) => {
        const checkboxId = `tl-checkbox-${dropdownId}-${i}`;
        return `
          <li class="tl-dropdown__option" role="option" tabindex="0" data-value="${opt}">
            <span class="tl-dropdown__option-checkbox">
              <div class="tl-checkbox">
                <input type="checkbox" class="tl-checkbox__input" id="${checkboxId}" tabindex="0" />
                <label class="tl-checkbox__label" for="${checkboxId}" aria-label="${opt}">${opt}</label>
              </div>
            </span>
            <!-- Removed .tl-dropdown__option-label, use only checkbox label for text -->
          </li>`;
      })
      .join('');
    fieldMarkup = `
      <button type="button" class="tl-dropdown__button" aria-haspopup="listbox" aria-expanded="false" ${
        disabled ? 'disabled' : ''
      } data-dropdown-toggle="${dropdownId}">
  <span class="tl-dropdown__button-placeholder" style="${isLabelInside ? 'display:none' : ''}">${
      !isLabelInside ? placeholder : ''
    }</span>
        <span class="tl-dropdown__button-value" style="display:none"></span>
        <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>
      </button>
      <ul class="tl-dropdown__list" id="${dropdownId}" role="listbox" tabindex="-1" style="display: none;">
        ${optionsMarkup}
      </ul>
      <script id="script-${dropdownId}">
        (function() {
          var btn, list, selected = [];
          function updateButtonValue() {
            var valueSpan = btn.querySelector('.tl-dropdown__button-value');
            var placeholderSpan = btn.querySelector('.tl-dropdown__button-placeholder');
            var parent = btn.closest('.tl-dropdown');
            if (selected.length) {
              valueSpan.textContent = selected.join(', ');
              valueSpan.style.display = '';
              placeholderSpan.style.display = 'none';
              if (parent && parent.classList.contains('tl-dropdown--label-inside')) {
                parent.classList.add('tl-dropdown--has-value');
              }
            } else {
              valueSpan.textContent = '';
              valueSpan.style.display = 'none';
              placeholderSpan.style.display = '';
              if (parent && parent.classList.contains('tl-dropdown--label-inside')) {
                parent.classList.remove('tl-dropdown--has-value');
              }
            }
          }
          function toggleOption(opt) {
            var value = opt.getAttribute('data-value');
            var idx = selected.indexOf(value);
            var checkbox = opt.querySelector('.tl-checkbox__input');
            if (idx === -1) {
              selected.push(value);
              opt.setAttribute('aria-selected', 'true');
              opt.classList.add('tl-dropdown__option--selected');
              if (checkbox) checkbox.checked = true;
            } else {
              selected.splice(idx, 1);
              opt.removeAttribute('aria-selected');
              opt.classList.remove('tl-dropdown__option--selected');
              if (checkbox) checkbox.checked = false;
            }
            updateButtonValue();
          }
          function attach() {
            btn = document.querySelector('[data-dropdown-toggle="${dropdownId}"]');
            list = document.getElementById('${dropdownId}');
            if (btn && list && !btn._dropdownListener) {
              btn._dropdownListener = true;
              btn.addEventListener('click', function(e) {
                e.stopPropagation();
                var expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
                list.style.display = expanded ? 'none' : 'block';
                if (!expanded) {
                  list.classList.add('open');
                } else {
                  list.classList.remove('open');
                }
              });
              document.addEventListener('click', function(e) {
                if (!btn.contains(e.target) && !list.contains(e.target)) {
                  btn.setAttribute('aria-expanded', 'false');
                  list.style.display = 'none';
                  list.classList.remove('open');
                  btn._dropdownListener = false;
                }
              });
              Array.from(list.querySelectorAll('.tl-dropdown__option')).forEach(function(opt) {
                if (opt.getAttribute('aria-disabled') === 'true') return;
                // Klick på hela option
                opt.addEventListener('click', function(ev) {
                  ev.stopPropagation();
                  toggleOption(opt);
                });
                // Klick på tl-checkbox
                var checkbox = opt.querySelector('.tl-checkbox__input');
                if (checkbox) {
                  checkbox.addEventListener('click', function(ev) {
                    ev.stopPropagation();
                    toggleOption(opt);
                  });
                }
              });
            }
          }
          if (!document.getElementById('script-${dropdownId}')._observer) {
            var observer = new MutationObserver(function() {
              attach();
            });
            observer.observe(document.body, { childList: true, subtree: true });
            document.getElementById('script-${dropdownId}')._observer = observer;
            setTimeout(attach, 0);
          } else {
            setTimeout(attach, 0);
          }
        })();
      </script>
    `;
  } else {
    // button variant with JS toggle (MutationObserver for Storybook re-renders)
    const dropdownId = 'tl-dropdown-list-' + Math.random().toString(36).slice(2, 8);
    fieldMarkup = `
      <button type="button" class="tl-dropdown__button" aria-haspopup="listbox" aria-expanded="false" ${
        disabled ? 'disabled' : ''
      } data-dropdown-toggle="${dropdownId}">
  <span class="tl-dropdown__button-placeholder" style="${isLabelInside ? 'display:none' : ''}">${
      !isLabelInside ? placeholder : ''
    }</span>
  <span class="tl-dropdown__button-value" style="display:none"></span>
        <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>
      </button>
      <ul class="tl-dropdown__list" id="${dropdownId}" role="listbox" tabindex="-1" style="display: none;">
  <li class="tl-dropdown__option" role="option" tabindex="0" data-value="Option 1">Option 1</li>
  <li class="tl-dropdown__option" role="option" tabindex="0" data-value="Option 2">Option 2</li>
  <li class="tl-dropdown__option" role="option" tabindex="0" data-value="Option 3">Option 3</li>
  <li class="tl-dropdown__option" role="option" tabindex="0" aria-disabled="true" data-value="Option disabled">Option disabled</li>
  <li class="tl-dropdown__option" role="option" tabindex="0" data-value="Option 4">Option 4</li>
      </ul>
      <script id="script-${dropdownId}">
        (function() {
          var btn, list;
          function attach() {
            btn = document.querySelector('[data-dropdown-toggle="${dropdownId}"]');
            list = document.getElementById('${dropdownId}');
            if (btn && list && !btn._dropdownListener) {
              btn._dropdownListener = true;
              btn.addEventListener('click', function(e) {
                e.stopPropagation();
                var expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
                list.style.display = expanded ? 'none' : 'block';
                if (!expanded) {
                  list.classList.add('open');
                } else {
                  list.classList.remove('open');
                }
              });
              document.addEventListener('click', function(e) {
                if (!btn.contains(e.target) && !list.contains(e.target)) {
                  btn.setAttribute('aria-expanded', 'false');
                  list.style.display = 'none';
                  list.classList.remove('open');
                  btn._dropdownListener = false;
                }
              });
                // Option selection logic
                Array.from(list.querySelectorAll('.tl-dropdown__option')).forEach(function(opt) {
                  if (opt.getAttribute('aria-disabled') === 'true') return;
                  opt.addEventListener('click', function(ev) {
                    ev.stopPropagation();
                    // Set value
                    var valueSpan = btn.querySelector('.tl-dropdown__button-value');
                    var placeholderSpan = btn.querySelector('.tl-dropdown__button-placeholder');
                    var parent = btn.closest('.tl-dropdown');
                    if (valueSpan) {
                      valueSpan.textContent = opt.textContent;
                      valueSpan.style.display = '';
                    }
                    if (placeholderSpan && !btn.classList.contains('tl-dropdown--label-inside')) {
                      placeholderSpan.style.display = 'none';
                    }
                    // For inside label, set .tl-dropdown--has-value on parent
                    if (parent && parent.classList.contains('tl-dropdown--label-inside')) {
                      parent.classList.add('tl-dropdown--has-value');
                    }
                    // Close dropdown
                    btn.setAttribute('aria-expanded', 'false');
                    list.style.display = 'none';
                    list.classList.remove('open');
                    // Option selected styling
                    Array.from(list.querySelectorAll('.tl-dropdown__option')).forEach(function(o) {
                      o.removeAttribute('aria-selected');
                      var tick = o.querySelector('.tl-icon--tick');
                      if (tick) tick.remove();
                    });
                    opt.setAttribute('aria-selected', 'true');
                    // Insert tick icon
                    if (!opt.querySelector('.tl-icon--tick')) {
                      var tick = document.createElement('span');
                      tick.className = 'tl-icon tl-icon--tick';
                      tick.setAttribute('aria-hidden', 'true');
                      opt.appendChild(tick);
                    }
              // Reset to placeholder if dropdown is reopened and no value selected
              btn.addEventListener('click', function() {
                var valueSpan = btn.querySelector('.tl-dropdown__button-value');
                var placeholderSpan = btn.querySelector('.tl-dropdown__button-placeholder');
                var parent = btn.closest('.tl-dropdown');
                var hasValue = valueSpan && valueSpan.textContent;
                if (btn.classList.contains('tl-dropdown--label-inside')) {
                  // Hide both if no value
                  if (!hasValue) {
                    if (placeholderSpan) placeholderSpan.style.display = 'none';
                    if (valueSpan) valueSpan.style.display = 'none';
                    if (parent) parent.classList.remove('tl-dropdown--has-value');
                  } else {
                    if (parent) parent.classList.add('tl-dropdown--has-value');
                  }
                } else {
                  if (!hasValue && placeholderSpan) {
                    placeholderSpan.style.display = '';
                    if (valueSpan) valueSpan.style.display = 'none';
                  }
                }
              });
                  });
                });
            }
          }
          if (!document.getElementById('script-${dropdownId}')._observer) {
            var observer = new MutationObserver(function() {
              attach();
            });
            observer.observe(document.body, { childList: true, subtree: true });
            document.getElementById('script-${dropdownId}')._observer = observer;
            setTimeout(attach, 0);
          } else {
            setTimeout(attach, 0);
          }
        })();
      </script>
    `;
  }
  const barMarkup = '<div class="tl-dropdown__bar"></div>';
  return formatHtmlPreview(`
    <div class="demo-wrapper" style="max-width: 208px; height: 150px;">
      <div class="tl-dropdown tl-dropdown--${normalizedSize}${error ? ' tl-dropdown--error' : ''}${
    disabled ? ' tl-dropdown--disabled' : ''
  }${isLabelInside ? ' tl-dropdown--label-inside' : ''}${
    !showLabel ? ' tl-dropdown--no-label' : ''
  }${multiselect ? ' tl-dropdown--multiselect' : ''} ${modeClass}">
        ${labelMarkup}
        ${fieldMarkup}
        ${barMarkup}
        ${helperMarkup}
      </div>
    </div>
  `);
};

export const Default = Template.bind({});
