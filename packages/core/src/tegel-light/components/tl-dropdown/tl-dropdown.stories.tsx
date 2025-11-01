import formatHtmlPreview from '../../../stories/formatHtmlPreview';

/* ---------- Demo data ---------- */
const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'] as const;

/* ---------- Fixed IDs (no randomness) ---------- */
const IDS = {
  label: 'tl-dd-label',
  select: 'tl-dd-select',
  btn: 'tl-dd-btn',
  multi: 'tl-dd-multi',
  filterInput: 'tl-dd-filter-input',
  filterList: 'tl-dd-filter-list',
} as const;

/* ---------- Scripts ---------- */
// Native <select>
function dropdownSelectScript(selectId: string, labelId?: string): void {
  const select = document.getElementById(selectId) as HTMLSelectElement | null;
  if (!select) return;
  if (labelId) select.setAttribute('aria-labelledby', labelId);

  const root = select.closest('.tl-dropdown') as HTMLElement | null;
  const chev = root?.querySelector('.tl-dropdown__chevron') as HTMLElement | null;

  const setHasValue = () => root?.classList.toggle('tl-dropdown--has-value', !!select.value);

  if (!select.hasAttribute('data-dd-bound')) {
    select.setAttribute('data-dd-bound', '1');
    select.addEventListener('change', setHasValue);
    select.addEventListener('focus', () => chev?.classList.add('tl-dropdown__chevron--rotated'));
    select.addEventListener('blur', () => chev?.classList.remove('tl-dropdown__chevron--rotated'));
  }
  setHasValue();
}

// Button & Multiselect
function dropdownMenuScript(
  menuId: string,
  isMulti: boolean,
  controlId: string,
  labelId?: string,
): void {
  const list = document.getElementById(menuId) as HTMLElement | null;
  if (!list) return;

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const btn = root?.querySelector(`[data-dropdown-toggle="${menuId}"]`) as HTMLElement | null;
  const chev = root?.querySelector('.tl-dropdown__chevron') as HTMLElement | null;
  const valueSpan = root?.querySelector('.tl-dropdown__button-value') as HTMLElement | null;
  const placeholderSpan = root?.querySelector(
    '.tl-dropdown__button-placeholder',
  ) as HTMLElement | null;

  if (!root || !btn) return;

  btn.setAttribute('id', controlId);
  btn.setAttribute('aria-controls', menuId);
  btn.setAttribute('aria-expanded', 'false');
  if (labelId) btn.setAttribute('aria-labelledby', labelId);

  list.setAttribute('role', 'listbox');
  if (isMulti) list.setAttribute('aria-multiselectable', 'true');
  list
    .querySelectorAll<HTMLElement>('.tl-dropdown__option')
    .forEach((li) => li.setAttribute('role', 'option'));

  const setHasValue = (v: boolean) => root.classList.toggle('tl-dropdown--has-value', v);

  const open = () => {
    btn.classList.add('tl-dropdown__button--expanded');
    list.classList.add('tl-dropdown__list--open');
    chev?.classList.add('tl-dropdown__chevron--rotated');
    btn.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    btn.classList.remove('tl-dropdown__button--expanded');
    list.classList.remove('tl-dropdown__list--open');
    chev?.classList.remove('tl-dropdown__chevron--rotated');
    btn.setAttribute('aria-expanded', 'false');
  };

  const updateMulti = () => {
    const checks = list.querySelectorAll<HTMLInputElement>('.tl-checkbox__input:checked');
    const vals = Array.from(checks)
      .map((cb) => cb.closest('.tl-dropdown__option')?.getAttribute('data-value') || '')
      .filter(Boolean);
    const text = vals.join(', ');
    if (valueSpan) {
      valueSpan.textContent = text;
      valueSpan.classList.toggle('tl-dropdown__button-value--visible', !!text);
    }
    if (placeholderSpan) {
      placeholderSpan.classList.toggle('tl-dropdown__button-placeholder--visible', !text);
    }
    setHasValue(!!text);
  };

  const chooseSingle = (opt: HTMLElement) => {
    list.querySelectorAll('.tl-dropdown__option').forEach((o) => {
      o.classList.remove('tl-dropdown__option--selected');
      o.removeAttribute('aria-selected');
      o.querySelector('.tl-icon--tick')?.classList.remove('tl-icon--tick--visible');
    });
    opt.classList.add('tl-dropdown__option--selected');
    opt.setAttribute('aria-selected', 'true');
    opt.querySelector('.tl-icon--tick')?.classList.add('tl-icon--tick--visible');

    const text = (opt.getAttribute('data-value') || opt.textContent || '').trim();
    if (valueSpan) {
      valueSpan.textContent = text;
      valueSpan.classList.add('tl-dropdown__button-value--visible');
    }
    placeholderSpan?.classList.remove('tl-dropdown__button-placeholder--visible');
    setHasValue(!!text);
    close();
    btn.focus();
  };

  if (!btn.hasAttribute('data-dd-bound')) {
    btn.setAttribute('data-dd-bound', '1');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = btn.classList.contains('tl-dropdown__button--expanded');
      if (expanded) {
        close();
      } else {
        open();
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (root && !root.contains(e.target as Node)) close();
  });

  if (!list.hasAttribute('data-dd-bound')) {
    list.setAttribute('data-dd-bound', '1');

    list.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        btn?.focus();
      }
    });

    list.querySelectorAll<HTMLElement>('.tl-dropdown__option').forEach((li) => {
      if (li.classList.contains('tl-dropdown__option--disabled')) return;

      if (isMulti) {
        const cb = li.querySelector<HTMLInputElement>('.tl-checkbox__input');
        if (!cb) return;
        const toggle = () => {
          cb.checked = !cb.checked;
          li.classList.toggle('tl-dropdown__option--selected', cb.checked);
          updateMulti();
        };
        li.addEventListener('mousedown', (ev) => {
          ev.preventDefault();
          toggle();
        });
        li.addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            toggle();
          }
        });
        cb.addEventListener('click', (ev) => {
          ev.stopPropagation();
          toggle();
        });
      } else {
        const select = () => chooseSingle(li);
        li.addEventListener('mousedown', (ev) => {
          ev.preventDefault();
          select();
        });
        li.addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            select();
          }
        });
      }
    });
  }

  setHasValue(false);
}

// Filter (input + list)
function dropdownFilterScript(
  listId: string,
  inputId: string,
  multiselect: boolean,
  labelId?: string,
): void {
  const list = document.getElementById(listId) as HTMLElement | null;
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  if (!list || !input) return;

  if (labelId) input.setAttribute('aria-labelledby', labelId);
  input.setAttribute('aria-controls', listId);
  input.setAttribute('aria-expanded', 'false');

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const chev = input.parentElement?.querySelector('.tl-dropdown__chevron') as HTMLElement | null;
  const clearIcon = input.parentElement?.querySelector('.tl-icon--cross') as HTMLElement | null;
  const noResult = list.querySelector('.tl-dropdown__option--no-result') as HTMLElement | null;

  let selectedCache = '';
  let chevronToggle = false;

  const setHasValue = (v: boolean) => root?.classList.toggle('tl-dropdown--has-value', v);
  const open = () => {
    list.classList.add('tl-dropdown__list--open');
    chev?.classList.add('tl-dropdown__chevron--rotated');
    input.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    list.classList.remove('tl-dropdown__list--open');
    chev?.classList.remove('tl-dropdown__chevron--rotated');
    input.setAttribute('aria-expanded', 'false');
  };

  const options = Array.from(list.querySelectorAll<HTMLElement>('.tl-dropdown__option')).filter(
    (li) => !li.classList.contains('tl-dropdown__option--no-result'),
  );

  function filterOptions() {
    const q = (input.value || '').toLowerCase().trim();
    let matches = 0;

    for (const li of options) {
      const val = (li.getAttribute('data-value') || li.textContent || '').toLowerCase();
      const visible = !q || val.includes(q);
      li.classList.toggle('tl-dropdown__option--visible', visible);
      if (visible) matches++;
    }

    if (noResult) {
      const show = !!q && matches === 0;
      noResult.classList.toggle('tl-dropdown__option--visible', show);
    }
  }

  // Clear icon
  if (clearIcon && !clearIcon.hasAttribute('data-dd-bound')) {
    clearIcon.setAttribute('data-dd-bound', '1');
    clearIcon.addEventListener('mousedown', (e) => {
      e.preventDefault();
      selectedCache = '';
      input.value = '';
      setHasValue(false);
      input.focus();
      filterOptions();
    });
  }

  // Chevron toggle
  if (chev && !chev.hasAttribute('data-dd-bound')) {
    chev.setAttribute('data-dd-bound', '1');
    chev.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      chevronToggle = true;
      const isOpen = list.classList.contains('tl-dropdown__list--open');
      if (isOpen) {
        close();
        input.blur();
      } else {
        open();
        input.focus();
        filterOptions();
      }
      setTimeout(() => {
        chevronToggle = false;
      }, 0);
    });
  }

  if (!input.hasAttribute('data-dd-bound')) {
    input.setAttribute('data-dd-bound', '1');

    input.addEventListener('focus', () => {
      open();
      if (selectedCache) input.value = '';
      filterOptions();
      setHasValue(true);
    });

    input.addEventListener('blur', () => {
      setTimeout(() => {
        if (chevronToggle) return;
        const active = document.activeElement;
        if (!list.contains(active as Node) && active !== input) {
          close();
          if (selectedCache) {
            input.value = selectedCache;
            setHasValue(true);
          } else {
            setHasValue(!!input.value);
          }
        }
      }, 100);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        input.blur();
      }
    });

    input.addEventListener('input', () => {
      filterOptions();
      setHasValue(!!input.value || !!selectedCache);
    });
  }

  if (!list.hasAttribute('data-dd-bound')) {
    list.setAttribute('data-dd-bound', '1');

    list.querySelectorAll<HTMLElement>('.tl-dropdown__option').forEach((li) => {
      if (li.classList.contains('tl-dropdown__option--disabled')) return;

      if (multiselect) {
        const cb = li.querySelector<HTMLInputElement>('.tl-checkbox__input');
        if (!cb) return;
        const apply = () => {
          cb.checked = !cb.checked;
          li.classList.toggle('tl-dropdown__option--selected', cb.checked);
          const checks = list.querySelectorAll<HTMLInputElement>('.tl-checkbox__input:checked');
          const vals = Array.from(checks)
            .map((c) => c.closest('.tl-dropdown__option')?.getAttribute('data-value') || '')
            .filter(Boolean);
          selectedCache = vals.join(', ');
          input.value = selectedCache;
          setHasValue(!!selectedCache);
        };
        li.addEventListener('mousedown', (ev) => {
          ev.preventDefault();
          apply();
        });
        li.addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            apply();
          }
        });
        cb.addEventListener('click', (ev) => {
          ev.stopPropagation();
          apply();
        });
      } else {
        const choose = () => {
          options.forEach((o) => {
            o.classList.remove('tl-dropdown__option--selected');
            o.querySelector('.tl-icon--tick')?.classList.remove('tl-icon--tick--visible');
          });
          li.classList.add('tl-dropdown__option--selected');
          li.querySelector('.tl-icon--tick')?.classList.add('tl-icon--tick--visible');

          selectedCache = (li.getAttribute('data-value') || li.textContent || '').trim();
          input.value = selectedCache;
          setHasValue(!!selectedCache);
          close();
          input.blur();
        };
        li.addEventListener('mousedown', (ev) => {
          ev.preventDefault();
          choose();
        });
        li.addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            choose();
          }
        });
      }
    });
  }

  selectedCache = '';
  setHasValue(false);
  filterOptions();
}

/* ---------- Markup helpers ---------- */
function getLabel(label: string, placement: 'Outside' | 'Inside', forId?: string) {
  const cls =
    placement === 'Inside'
      ? 'tl-dropdown__label tl-dropdown__label-inside'
      : 'tl-dropdown__label tl-dropdown__label-outside';
  const forAttr = placement === 'Outside' && forId ? ` for="${forId}"` : '';
  return `<label class="${cls}" id="${IDS.label}"${forAttr}>${label}</label>`;
}

function getHelper(helper: string, show: boolean, error: boolean) {
  if (!show || !helper) return '';
  const icon = error ? '<span class="tl-icon tl-icon--info tl-icon--16"></span>' : '';
  return `<div class="tl-dropdown__helper">${icon}${helper}</div>`;
}

function getSelectMarkup(isInside: boolean, placeholder: string, disabled: boolean) {
  const placeholderOpt = isInside
    ? '<option value="" hidden selected></option>'
    : placeholder
    ? `<option value="" disabled selected>${placeholder}</option>`
    : '';
  return `
    <select class="tl-dropdown__select"${disabled ? ' disabled' : ''} id="${IDS.select}">
      ${placeholderOpt}
      ${OPTIONS.map((o) => `<option value="${o}">${o}</option>`).join('')}
    </select>
    <span class="tl-icon tl-icon--chevron_down tl-dropdown__chevron tl-icon--16"></span>`;
}

function getButtonMarkup(isInside: boolean, placeholder: string, disabled: boolean) {
  const items =
    OPTIONS.map(
      (o) => `<li class="tl-dropdown__option tl-dropdown__option--visible" data-value="${o}">
              ${o}<span class="tl-icon tl-icon--tick"></span>
            </li>`,
    ).join('') +
    `<li class="tl-dropdown__option tl-dropdown__option--disabled tl-dropdown__option--visible">Option disabled</li>`;

  return `
    <button type="button" class="tl-dropdown__button"${
      disabled ? ' disabled' : ''
    } data-dropdown-toggle="${IDS.btn}">
      <span class="tl-dropdown__button-placeholder${
        !isInside ? ' tl-dropdown__button-placeholder--visible' : ''
      }">
        ${!isInside ? placeholder : ''}
      </span>
      <span class="tl-dropdown__button-value"></span>
      <span class="tl-icon tl-icon--chevron_down tl-dropdown__chevron tl-icon--16"></span>
    </button>
    <ul class="tl-dropdown__list" id="${IDS.btn}">
      ${items}
    </ul>`;
}

function getMultiselectMarkup(isInside: boolean, placeholder: string, disabled: boolean) {
  const items = OPTIONS.map((o, i) => {
    const cbId = `cb-${IDS.multi}-${i}`;
    return `
      <li class="tl-dropdown__option tl-dropdown__option--visible" data-value="${o}">
        <span class="tl-dropdown__option-checkbox">
          <div class="tl-checkbox">
            <input type="checkbox" class="tl-checkbox__input" id="${cbId}" tabindex="-1" />
            <label class="tl-checkbox__label" for="${cbId}">${o}</label>
          </div>
        </span>
      </li>`;
  }).join('');

  return `
    <button type="button" class="tl-dropdown__button"${
      disabled ? ' disabled' : ''
    } data-dropdown-toggle="${IDS.multi}">
      <span class="tl-dropdown__button-placeholder${
        !isInside ? ' tl-dropdown__button-placeholder--visible' : ''
      }">
        ${!isInside ? placeholder : ''}
      </span>
      <span class="tl-dropdown__button-value"></span>
      <span class="tl-icon tl-icon--chevron_down tl-dropdown__chevron tl-icon--16"></span>
    </button>
    <ul class="tl-dropdown__list" id="${IDS.multi}">
      ${items}
    </ul>`;
}

function getFilterMarkup(placeholder: string, disabled: boolean, multiselect: boolean) {
  const items =
    (multiselect
      ? OPTIONS.map(
          (o, i) => `<li class="tl-dropdown__option tl-dropdown__option--visible" data-value="${o}">
            <span class="tl-dropdown__option-checkbox">
              <div class="tl-checkbox">
                <input type="checkbox" class="tl-checkbox__input" id="cb-${IDS.filterList}-${i}" tabindex="-1" />
                <label class="tl-checkbox__label" for="${IDS.filterList}-${i}">${o}</label>
              </div>
            </span>
          </li>`,
        ).join('')
      : OPTIONS.map(
          (o) => `<li class="tl-dropdown__option tl-dropdown__option--visible" data-value="${o}">
                ${o}<span class="tl-icon tl-icon--tick"></span>
              </li>`,
        ).join('')) +
    (!multiselect
      ? `<li class="tl-dropdown__option tl-dropdown__option--no-result" tabindex="-1">No result</li>`
      : '');

  return `
    <div class="tl-dropdown__input-wrapper">
      <input class="tl-dropdown__input" id="${
        IDS.filterInput
      }" type="text" placeholder="${placeholder}"${
    disabled ? ' disabled' : ''
  } data-dropdown-toggle="${IDS.filterList}" aria-controls="${
    IDS.filterList
  }" aria-expanded="false" aria-labelledby="${IDS.label}"/>
      <span class="tl-icon tl-icon--cross tl-icon--16 tl-dropdown__icon--cross"></span>
      <span class="tl-dropdown__input--divider"></span>
      <span class="tl-icon tl-icon--chevron_down tl-icon--16 tl-dropdown__chevron"></span>
    </div>
    <ul class="tl-dropdown__list" id="${IDS.filterList}" role="listbox"${
    multiselect ? ' aria-multiselectable="true"' : ''
  }>
      ${items}
    </ul>`;
}

/* ---------- Story ---------- */
export default {
  title: 'Tegel Light (CSS)/Dropdown',
  parameters: { layout: 'centered' },
  argTypes: {
    modeVariant: {
      name: 'Mode Variant',
      control: { type: 'radio' },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      defaultValue: 'Primary',
      description:
        'Controls the mode variant. "Inherit from parent" allows the dropdown to inherit its mode from a parent component.',
    },

    filter: {
      name: 'Filter',
      control: { type: 'boolean' },
      if: { arg: 'select', eq: false },
      defaultValue: false,
    },
    multiselect: {
      name: 'Multiselect',
      control: { type: 'boolean' },
      if: { arg: 'select', eq: false },
      defaultValue: false,
    },
    size: {
      name: 'Size',
      control: { type: 'radio' },
      options: ['Small', 'Medium', 'Large'],
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
    showHelper: { name: 'Show helper', control: 'boolean' },
    helper: { name: 'Helper', control: 'text' },
    error: { name: 'Error', control: 'boolean' },
    disabled: { name: 'Disabled', control: 'boolean' },
    select: { name: 'Select', control: { type: 'boolean' }, defaultValue: false },
  },
  args: {
    modeVariant: 'Primary', // Can be 'Primary', 'Secondary', or 'Inherit from parent'
    filter: false,
    multiselect: false,
    size: 'Large',
    label: 'Label',
    labelPlacement: 'Outside',
    placeholder: 'Placeholder',
    showHelper: true,
    helper: 'Helper text',
    error: false,
    disabled: false,
    select: false,
  },
};

/* ---------- Template ---------- */
const Template = ({
  select,
  filter,
  label,
  placeholder,
  showHelper,
  helper,
  disabled,
  error,
  size,
  labelPlacement,
  multiselect,
  modeVariant,
}) => {
  const sizeClass = ({ Small: 'sm', Medium: 'md', Large: 'lg' } as const)[size] || 'lg';
  const isInside = labelPlacement === 'Inside';
  const showLabel = labelPlacement !== 'No label';

  // Decide variant by booleans
  const currentVariant = select ? 'Select' : filter ? 'Filter' : 'Button';

  let fieldMarkup = '';
  let scriptMarkup = '';

  if (currentVariant === 'Select') {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside', IDS.select) : ''}
      <div class="tl-dropdown__input-wrapper">
        ${getSelectMarkup(isInside, placeholder, disabled)}
      </div>`;
    scriptMarkup = `<script id="script-${IDS.select}">(${dropdownSelectScript.toString()})('${
      IDS.select
    }', '${showLabel ? IDS.label : ''}');</script>`;
  } else if (currentVariant === 'Button' && multiselect) {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside', IDS.btn) : ''}
      ${getMultiselectMarkup(isInside, placeholder, disabled)}`;
    scriptMarkup = `<script id="script-${IDS.multi}">(${dropdownMenuScript.toString()})('${
      IDS.multi
    }', true, '${IDS.btn}', '${showLabel ? IDS.label : ''}');</script>`;
  } else if (currentVariant === 'Button') {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside', IDS.btn) : ''}
      ${getButtonMarkup(isInside, placeholder, disabled)}`;
    scriptMarkup = `<script id="script-${IDS.btn}">(${dropdownMenuScript.toString()})('${
      IDS.btn
    }', false, '${IDS.btn}', '${showLabel ? IDS.label : ''}');</script>`;
  } else {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside', IDS.filterInput) : ''}
      ${getFilterMarkup(placeholder, disabled, Boolean(multiselect))}`;
    scriptMarkup = `<script id="script-${IDS.filterList}">(${dropdownFilterScript.toString()})('${
      IDS.filterList
    }', '${IDS.filterInput}', ${Boolean(multiselect)}, '${showLabel ? IDS.label : ''}');</script>`;
  }

  const classes = [
    'tl-dropdown',
    `tl-dropdown--${sizeClass}`,
    isInside
      ? 'tl-dropdown--label-inside'
      : showLabel
      ? 'tl-dropdown--label-outside'
      : 'tl-dropdown--no-label',
    error && 'tl-dropdown--error',
    disabled && 'tl-dropdown--disabled',
    modeVariant === 'Secondary' ? 'tl-dropdown--secondary' : 'tl-dropdown--primary',
    multiselect && currentVariant !== 'Select' && 'tl-dropdown--multiselect',
  ]
    .filter(Boolean)
    .join(' ');

  const helperHtml = showHelper ? getHelper(helper, showHelper, error) : '';

  return formatHtmlPreview(`
    <div class="demo-wrapper">
      <div class="${classes}">
        ${fieldMarkup}
        ${helperHtml}
      </div>
      ${scriptMarkup}
    </div>
  `);
};

export const Default = Template.bind({});
