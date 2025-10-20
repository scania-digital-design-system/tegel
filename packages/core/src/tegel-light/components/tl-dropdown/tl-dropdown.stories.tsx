import formatHtmlPreview from '../../../stories/formatHtmlPreview';

// --- Dropdown Scripts ---

// Handles label-inside logic for native select
function dropdownSelectScript(dropdownId: string): void {
  const wrapper = document.getElementById(`${dropdownId}-wrapper`);
  if (!wrapper) return;
  const select = wrapper.querySelector('.tl-dropdown__select') as HTMLSelectElement | null;
  if (!select) return;
  const parent = wrapper.closest('.tl-dropdown');
  function update() {
    if (!parent) return;
    if (select.value) {
      parent.classList.add('tl-dropdown--has-value');
    } else {
      parent.classList.remove('tl-dropdown--has-value');
    }
  }
  select.addEventListener('change', update);
  update();
}

// Handles open/close, value, and multiselect logic for button/multiselect
function dropdownScript(dropdownId: string, isMulti: boolean) {
  let btn: HTMLElement | null;
  let list: HTMLElement | null;

  // Update button value and label-inside state
  function updateButtonValue() {
    const valueSpan = btn?.querySelector('.tl-dropdown__button-value') as HTMLElement | null;
    const placeholderSpan = btn?.querySelector(
      '.tl-dropdown__button-placeholder',
    ) as HTMLElement | null;
    const parent = btn?.closest('.tl-dropdown');
    if (isMulti) {
      const checkedBoxes = list?.querySelectorAll('.tl-checkbox__input:checked') || [];
      const selectedValues = Array.from(checkedBoxes)
        .map((cb) => {
          const li = cb.closest('.tl-dropdown__option');
          return li ? li.getAttribute('data-value') : '';
        })
        .filter(Boolean);
      if (selectedValues.length) {
        if (valueSpan) {
          valueSpan.textContent = selectedValues.join(', ');
          valueSpan.style.display = '';
        }
        if (placeholderSpan) placeholderSpan.style.display = 'none';
        if (parent?.classList.contains('tl-dropdown--label-inside')) {
          parent.classList.add('tl-dropdown--has-value');
        }
      } else {
        if (valueSpan) {
          valueSpan.textContent = '';
          valueSpan.style.display = 'none';
        }
        if (placeholderSpan) placeholderSpan.style.display = '';
        if (parent?.classList.contains('tl-dropdown--label-inside')) {
          parent.classList.remove('tl-dropdown--has-value');
        }
      }
    }
  }

  // Toggle option selection (single/multi)
  function toggleOption(opt: HTMLElement) {
    const checkbox = opt.querySelector?.('.tl-checkbox__input') as HTMLInputElement | null;
    if (isMulti) {
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        if (checkbox.checked) {
          opt.setAttribute('aria-selected', 'true');
          opt.classList.add('tl-dropdown__option--selected');
        } else {
          opt.removeAttribute('aria-selected');
          opt.classList.remove('tl-dropdown__option--selected');
        }
      }
      updateButtonValue();
    } else {
      // Single select
      const valueSpan = btn?.querySelector('.tl-dropdown__button-value') as HTMLElement | null;
      const placeholderSpan = btn?.querySelector(
        '.tl-dropdown__button-placeholder',
      ) as HTMLElement | null;
      const parent = btn?.closest('.tl-dropdown');
      if (valueSpan) {
        valueSpan.textContent = opt.textContent;
        valueSpan.style.display = '';
      }
      if (placeholderSpan && !btn?.classList.contains('tl-dropdown--label-inside')) {
        placeholderSpan.style.display = 'none';
      }
      if (parent?.classList.contains('tl-dropdown--label-inside')) {
        parent.classList.add('tl-dropdown--has-value');
      }
      btn?.setAttribute('aria-expanded', 'false');
      if (list) {
        list.style.display = 'none';
        list.classList.remove('open');
        Array.from(list.querySelectorAll('.tl-dropdown__option')).forEach((o) => {
          const elem = o as HTMLElement;
          elem.removeAttribute('aria-selected');
          const tick = elem.querySelector('.tl-icon--tick') as HTMLElement | null;
          if (tick) tick.style.display = 'none';
        });
      }
      opt.setAttribute('aria-selected', 'true');
      const tick = opt.querySelector?.('.tl-icon--tick') as HTMLElement | null;
      if (tick) tick.style.display = '';

      // Attach event listeners
    }
  }
  function attach() {
    btn = document.querySelector(`[data-dropdown-toggle="${dropdownId}"]`);
    list = document.getElementById(dropdownId);
    type DropdownBtn = HTMLElement & { dropdownListener?: boolean };
    const btnTyped = btn as DropdownBtn;
    if (btn && list && !btnTyped.dropdownListener) {
      btnTyped.dropdownListener = true;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        list.style.display = expanded ? 'none' : 'block';
        if (!expanded) {
          list.classList.add('open');
        } else {
          list.classList.remove('open');
        }
      });
      document.addEventListener('click', (e) => {
        const target = e.target as Node;
        if (!btn.contains(target) && !list.contains(target)) {
          btn.setAttribute('aria-expanded', 'false');
          list.style.display = 'none';
          list.classList.remove('open');
          btnTyped.dropdownListener = false;
        }
      });
      Array.from(list.querySelectorAll('.tl-dropdown__option')).forEach((el) => {
        const elem = el as HTMLElement;
        if (elem.getAttribute('aria-disabled') === 'true') return;
        elem.addEventListener('click', (ev: Event) => {
          ev.stopPropagation();
          toggleOption(elem);
        });
        const checkbox = elem.querySelector('.tl-checkbox__input') as HTMLInputElement | null;
        if (checkbox) {
          checkbox.addEventListener('click', (ev: Event) => {
            ev.stopPropagation();
            toggleOption(elem);
          });
        }
      });
    }
  }

  // Use WeakMap to track MutationObservers
  type ObserverMap = WeakMap<Element, MutationObserver>;
  interface TegelWindow extends Window {
    dropdownObserverMap?: ObserverMap;
  }
  const win = window as TegelWindow;
  if (!win.dropdownObserverMap) win.dropdownObserverMap = new WeakMap();
  const scriptEl = document.getElementById(`script-${dropdownId}`);
  const observerMap = win.dropdownObserverMap;
  if (scriptEl && !observerMap.has(scriptEl)) {
    const observer = new MutationObserver(() => {
      attach();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    observerMap.set(scriptEl, observer);
    setTimeout(attach, 0);
  } else {
    setTimeout(attach, 0);
  }
}

// --- Dropdown Option Data ---
// ...existing code...

const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

// --- Markup Helpers ---

function getLabelMarkup(label: string, labelId: string, isLabelInside: boolean): string {
  if (!label) return '';
  const labelClasses = ['tl-dropdown__label'];
  if (isLabelInside) labelClasses.push('tl-dropdown__label--inside');
  return `<label class="${labelClasses.join(' ')}"${
    labelId ? ` id="${labelId}"` : ''
  }>${label}</label>`;
}

function getHelperMarkup(helper: string, error: boolean): string {
  if (!helper) return '';
  const helperIcon = error
    ? '<span class="tl-icon tl-icon--info tl-icon--16" aria-hidden="true"></span>'
    : '';
  return `<div class="tl-dropdown__helper">${helperIcon}${helper}</div>`;
}

function getSelectMarkup({ isLabelInside, placeholder, showLabel, labelId, disabled }) {
  const placeholderOption = isLabelInside
    ? '<option value="" hidden selected></option>'
    : placeholder
    ? `<option value="" disabled selected>${placeholder}</option>`
    : '';
  const ariaLabelAttr = showLabel && labelId ? `aria-labelledby="${labelId}"` : '';
  const selectId = 'tl-dropdown-select-demo';
  return `
    <div style="position: relative; display: flex; align-items: center;" id="${selectId}-wrapper">
      <select class="tl-dropdown__select" ${ariaLabelAttr}${
    disabled ? ' disabled' : ''
  } style="width: 100%;">
        ${placeholderOption}
        ${OPTIONS.map(
          (opt) => `<option class="tl-dropdown__option" value="${opt}">${opt}</option>`,
        ).join('')}
      </select>
      <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true" style="position: absolute; right: 16px; pointer-events: none;"></span>
    </div>
  `;
}

function getMultiselectMarkup({ isLabelInside, placeholder, disabled }) {
  const multiId = 'tl-dropdown-multiselect-demo';
  const optionsMarkup = OPTIONS.map((opt, i) => {
    const checkboxId = `tl-checkbox-${multiId}-${i}`;
    return `
      <li class="tl-dropdown__option" role="option" tabindex="0" data-value="${opt}">
        <span class="tl-dropdown__option-checkbox">
          <div class="tl-checkbox">
            <input type="checkbox" class="tl-checkbox__input" id="${checkboxId}" tabindex="0" />
            <label class="tl-checkbox__label" for="${checkboxId}" aria-label="${opt}">${opt}</label>
          </div>
        </span>
      </li>`;
  }).join('');
  return `
    <button type="button" class="tl-dropdown__button" aria-haspopup="listbox" aria-expanded="false"${
      disabled ? ' disabled' : ''
    } data-dropdown-toggle="${multiId}">
      <span class="tl-dropdown__button-placeholder" style="${
        isLabelInside ? 'display:none' : ''
      }">${!isLabelInside ? placeholder : ''}</span>
      <span class="tl-dropdown__button-value" style="display:none"></span>
      <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>
    </button>
    <ul class="tl-dropdown__list" id="${multiId}" role="listbox" tabindex="-1" style="display: none;">
      ${optionsMarkup}
    </ul>
  `;
}

function getButtonMarkup({ isLabelInside, placeholder, disabled }) {
  const buttonId = 'tl-dropdown-button-demo';
  const optionsMarkup =
    OPTIONS.map(
      (opt) =>
        `<li class="tl-dropdown__option" role="option" tabindex="0" data-value="${opt}">${opt}<span class="tl-icon tl-icon--tick" aria-hidden="true" style="display:none"></span></li>`,
    ).join('') +
    '<li class="tl-dropdown__option" role="option" tabindex="0" aria-disabled="true" data-value="Option disabled">Option disabled</li>';
  return `
    <button type="button" class="tl-dropdown__button" aria-haspopup="listbox" aria-expanded="false"${
      disabled ? ' disabled' : ''
    } data-dropdown-toggle="${buttonId}">
      <span class="tl-dropdown__button-placeholder" style="${
        isLabelInside ? 'display:none' : ''
      }">${!isLabelInside ? placeholder : ''}</span>
      <span class="tl-dropdown__button-value" style="display:none"></span>
      <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>
    </button>
    <ul class="tl-dropdown__list" id="${buttonId}" role="listbox" tabindex="-1" style="display: none;">
      ${optionsMarkup}
    </ul>
  `;
}

// --- Storybook Meta ---

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
    modeVariant: {
      name: 'Mode Variant',
      control: { type: 'radio' },
      options: ['Primary', 'Secondary'],
      defaultValue: 'Primary',
      description: 'Choose dropdown mode variant',
    },
    variant: {
      name: 'Variant',
      control: { type: 'radio' },
      options: ['Select', 'Button'],
      defaultValue: 'Select',
      description: 'Toggle between select and button variant',
    },
    size: {
      name: 'Size',
      control: { type: 'radio' },
      options: ['Large', 'Medium', 'Small'],
      defaultValue: 'Large',
    },
    label: { name: 'Label', control: 'text' },
    labelPlacement: {
      name: 'Label placement',
      control: { type: 'radio' },
      options: ['Outside', 'Inside', 'No label'],
      defaultValue: 'Outside',
    },
    placeholder: { name: 'Placeholder', control: 'text' },
    helper: { name: 'Helper', control: 'text' },
    showHelper: { name: 'Show helper', control: 'boolean' },
    error: { name: 'Error', control: 'boolean' },
    disabled: { name: 'Disabled', control: 'boolean' },
    multiselect: {
      name: 'Multiselect',
      control: { type: 'boolean' },
      defaultValue: false,

      // --- Storybook Template ---

      description: 'Enable multiselect for button variant',
    },
  },
  args: {
    modeVariant: 'Primary',
    variant: 'Select',
    size: 'Large',
    label: 'Label',
    labelPlacement: 'Outside',
    placeholder: 'Placeholder',
    helper: 'Helper text',
    showHelper: true,
    error: false,
    // --- Normalize and prepare props ---
    disabled: false,
    multiselect: false,
  },
};

const Template = ({
  variant,

  // --- Field and script markup ---
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

  // --- Final HTML ---
  const showLabel = labelPlacement !== 'No label';
  const modeClass = modeVariant === 'Secondary' ? 'tl-dropdown--secondary' : 'tl-dropdown--primary';
  const labelId = showLabel ? 'tl-dropdown-story-label' : '';
  const labelMarkup = showLabel ? getLabelMarkup(label, labelId, isLabelInside) : '';
  const helperMarkup = showHelper && helper ? getHelperMarkup(helper, error) : '';
  let fieldMarkup = '';
  let scriptMarkup = '';
  if (variant === 'Select') {
    fieldMarkup = getSelectMarkup({ isLabelInside, placeholder, showLabel, labelId, disabled });
    scriptMarkup = `<script id="script-tl-dropdown-select-demo">(${dropdownSelectScript.toString()})('tl-dropdown-select-demo');</script>`;
  } else if (multiselect) {
    fieldMarkup = getMultiselectMarkup({ isLabelInside, placeholder, disabled });
    scriptMarkup = `<script id="script-tl-dropdown-multiselect-demo">(${dropdownScript.toString()})('tl-dropdown-multiselect-demo', true);</script>`;
  } else {
    fieldMarkup = getButtonMarkup({ isLabelInside, placeholder, disabled });
    scriptMarkup = `<script id="script-tl-dropdown-button-demo">(${dropdownScript.toString()})('tl-dropdown-button-demo', false);</script>`;
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
      ${scriptMarkup}
    </div>
  `);
};

export const Default = Template.bind({});
