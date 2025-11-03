import formatHtmlPreview from '../../../stories/formatHtmlPreview';

/* Demo data */
const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'] as const;

/* Fixed IDs */
const IDS = {
  label: 'tl-dropdown-label',
  select: 'tl-dropdown-select',
  btn: 'tl-dropdown-btn',
  multi: 'tl-dropdown-multi',
  filterInput: 'tl-dropdown-filter-input',
  filterList: 'tl-dropdown-filter-list',
} as const;

/* ---------- Scripts (lint-clean) ---------- */
function dropdownSelectScript(selectId: string): void {
  const select = document.getElementById(selectId) as HTMLSelectElement | null;
  if (!select) {
    return;
  }

  const root = select.closest('.tl-dropdown') as HTMLElement | null;
  const chev = root?.querySelector('.tl-dropdown__chevron') as HTMLElement | null;
  const setHasValue = () => root?.classList.toggle('tl-dropdown--has-value', !!select.value);

  if (!select.hasAttribute('data-bound')) {
    select.setAttribute('data-bound', '1');
    select.addEventListener('change', setHasValue);
    select.addEventListener('focus', () => {
      chev?.classList.add('tl-dropdown__chevron--rotated');
    });
    select.addEventListener('blur', () => {
      chev?.classList.remove('tl-dropdown__chevron--rotated');
    });
  }
  setHasValue();
}

function dropdownMenuScript(menuId: string, isMulti: boolean, controlId: string): void {
  const list = document.getElementById(menuId) as HTMLElement | null;
  if (!list) {
    return;
  }

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const btn = root?.querySelector<HTMLElement>(`[data-dropdown-toggle="${menuId}"]`);
  const chev = root?.querySelector<HTMLElement>('.tl-dropdown__chevron');
  const valueSpan = root?.querySelector<HTMLElement>('.tl-dropdown__button-value');
  const placeholderSpan = root?.querySelector<HTMLElement>('.tl-dropdown__button-placeholder');
  if (!root || !btn) {
    return;
  }

  btn.id = controlId;
  btn.setAttribute('aria-controls', menuId);
  btn.setAttribute('aria-expanded', 'false');

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
    const text = Array.from(checks)
      .map((cb) => cb.closest('.tl-dropdown__option')?.getAttribute('data-value') || '')
      .filter(Boolean)
      .join(', ');

    if (valueSpan) {
      valueSpan.textContent = text;
      valueSpan.classList.toggle('tl-dropdown__button-value--visible', !!text);
    }
    if (placeholderSpan) {
      const showPlaceholder = !text;
      placeholderSpan.classList.toggle('tl-dropdown__button-placeholder--visible', showPlaceholder);
    }
    setHasValue(!!text);
  };

  const chooseSingle = (opt: HTMLElement) => {
    list.querySelectorAll('.tl-dropdown__option').forEach((o) => {
      o.classList.remove('tl-dropdown__option--selected');
      o.querySelector('.tl-icon--tick')?.classList.remove('tl-icon--tick--visible');
    });

    opt.classList.add('tl-dropdown__option--selected');
    opt.querySelector('.tl-icon--tick')?.classList.add('tl-icon--tick--visible');

    const text = (opt.getAttribute('data-value') || opt.textContent || '').trim();
    if (valueSpan) {
      valueSpan.textContent = text;
      valueSpan.classList.add('tl-dropdown__button-value--visible');
    }
    if (placeholderSpan) {
      placeholderSpan.classList.remove('tl-dropdown__button-placeholder--visible');
    }
    setHasValue(!!text);
    close();
    btn.focus();
  };

  if (!btn.hasAttribute('data-bound')) {
    btn.setAttribute('data-bound', '1');
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
    if (root && !root.contains(e.target as Node)) {
      close();
    }
  });

  if (!list.hasAttribute('data-bound')) {
    list.setAttribute('data-bound', '1');

    list.addEventListener('keydown', (e: KeyboardEvent) => {
      const options = Array.from(
        list.querySelectorAll<HTMLElement>('.tl-dropdown__option.tl-dropdown__option--visible'),
      );
      const active = document.activeElement as HTMLElement;
      let idx = options.findIndex((el) => el === active);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (options.length) {
          idx = idx < 0 ? 0 : Math.min(idx + 1, options.length - 1);
          options[idx].focus();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (options.length) {
          idx = idx < 0 ? options.length - 1 : Math.max(idx - 1, 0);
          options[idx].focus();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        close();
        btn?.focus();
      }
    });

    list.querySelectorAll<HTMLElement>('.tl-dropdown__option').forEach((li) => {
      li.setAttribute('tabindex', '0');
      if (li.classList.contains('tl-dropdown__option--disabled')) {
        return;
      }

      if (isMulti) {
        const cb = li.querySelector<HTMLInputElement>('.tl-checkbox__input');
        if (!cb) {
          return;
        }

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
        const select = () => {
          chooseSingle(li);
        };
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

function dropdownFilterScript(listId: string, inputId: string, multiselect: boolean): void {
  const list = document.getElementById(listId) as HTMLElement | null;
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  if (!list || !input) {
    return;
  }

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

  const filterOptions = () => {
    const q = (input.value || '').toLowerCase().trim();
    let matches = 0;

    options.forEach((li) => {
      const val = (li.getAttribute('data-value') || li.textContent || '').toLowerCase();
      const visible = !q || val.includes(q);
      li.classList.toggle('tl-dropdown__option--visible', visible);
      if (visible) {
        matches += 1;
      }
    });

    if (noResult) {
      const show = !!q && matches === 0;
      noResult.classList.toggle('tl-dropdown__option--visible', show);
    }
  };

  if (clearIcon && !clearIcon.hasAttribute('data-bound')) {
    clearIcon.setAttribute('data-bound', '1');
    clearIcon.addEventListener('mousedown', (e) => {
      e.preventDefault();
      selectedCache = '';
      input.value = '';
      setHasValue(false);
      input.focus();
      filterOptions();
    });
  }

  if (chev && !chev.hasAttribute('data-bound')) {
    chev.setAttribute('data-bound', '1');
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
      window.setTimeout(() => {
        chevronToggle = false;
      }, 0);
    });
  }

  if (!input.hasAttribute('data-bound')) {
    input.setAttribute('data-bound', '1');

    input.addEventListener('focus', () => {
      open();
      if (selectedCache) {
        input.value = '';
      }
      filterOptions();
      setHasValue(true);
    });

    input.addEventListener('blur', () => {
      window.setTimeout(() => {
        if (chevronToggle) {
          return;
        }
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

  if (!list.hasAttribute('data-bound')) {
    list.setAttribute('data-bound', '1');

    list.querySelectorAll<HTMLElement>('.tl-dropdown__option').forEach((li) => {
      if (li.classList.contains('tl-dropdown__option--disabled')) {
        return;
      }

      if (multiselect) {
        const cb = li.querySelector<HTMLInputElement>('.tl-checkbox__input');
        if (!cb) {
          return;
        }

        const apply = () => {
          cb.checked = !cb.checked;
          li.classList.toggle('tl-dropdown__option--selected', cb.checked);

          const checks = list.querySelectorAll<HTMLInputElement>('.tl-checkbox__input:checked');
          selectedCache = Array.from(checks)
            .map((c) => c.closest('.tl-dropdown__option')?.getAttribute('data-value') || '')
            .filter(Boolean)
            .join(', ');

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
const getLabel = (label: string, placement: 'Outside' | 'Inside', forId?: string) => {
  const cls =
    placement === 'Inside'
      ? 'tl-dropdown__label tl-dropdown__label-inside'
      : 'tl-dropdown__label tl-dropdown__label-outside';
  const forAttr = placement === 'Outside' && forId ? ` for="${forId}"` : '';
  return `<label class="${cls}" id="${IDS.label}"${forAttr}>${label}</label>`;
};

const getHelper = (helper: string, show: boolean, error: boolean) => {
  if (!show || !helper) {
    return '';
  }
  const icon = error ? '<span class="tl-icon tl-icon--info tl-icon--16"></span>' : '';
  return `<div class="tl-dropdown__helper">${icon}${helper}</div>`;
};

function getSelectMarkup(
  isInside: boolean,
  placeholder: string,
  disabled: boolean,
  labelled: boolean,
) {
  const ph = isInside
    ? '<option value="" hidden selected></option>'
    : placeholder
    ? `<option value="" disabled selected>${placeholder}</option>`
    : '';
  return `
    <select class="tl-dropdown__select" id="${IDS.select}" ${disabled ? 'disabled' : ''} ${
    labelled ? `aria-labelledby="${IDS.label}"` : ''
  }>
      ${ph}
      ${OPTIONS.map((o) => `<option value="${o}">${o}</option>`).join('')}
    </select>
    <span class="tl-icon tl-icon--chevron_down tl-dropdown__chevron tl-icon--16" aria-hidden="true"></span>`;
}

function getButtonMarkup(
  isInside: boolean,
  placeholder: string,
  disabled: boolean,
  labelled: boolean,
  listId: string,
) {
  const items = `${OPTIONS.map(
    (o) => `
    <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" data-value="${o}">
      ${o}<span class="tl-icon tl-icon--tick"></span>
    </li>`,
  ).join('')}
    <li class="tl-dropdown__option tl-dropdown__option--disabled tl-dropdown__option--visible" role="option" aria-disabled="true">Option disabled</li>`;

  return `
    <button type="button" class="tl-dropdown__button" ${
      disabled ? 'disabled' : ''
    } data-dropdown-toggle="${listId}" ${
    labelled ? `aria-labelledby="${IDS.label}"` : ''
  } aria-expanded="false" aria-controls="${listId}">
      <span class="tl-dropdown__button-placeholder${
        !isInside ? ' tl-dropdown__button-placeholder--visible' : ''
      }">${!isInside ? placeholder : ''}</span>
      <span class="tl-dropdown__button-value"></span>
      <span class="tl-icon tl-icon--chevron_down tl-dropdown__chevron tl-icon--16" aria-hidden="true"></span>
    </button>
    <ul class="tl-dropdown__list" id="${listId}" role="listbox">
      ${items}
    </ul>`;
}

function getMultiselectMarkup(
  isInside: boolean,
  placeholder: string,
  disabled: boolean,
  labelled: boolean,
) {
  const items = OPTIONS.map(
    (o, i) => `
    <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" data-value="${o}">
      <span class="tl-dropdown__option-checkbox">
        <div class="tl-checkbox">
          <input type="checkbox" class="tl-checkbox__input" id="cb-${IDS.multi}-${i}" tabindex="-1" />
          <label class="tl-checkbox__label" for="cb-${IDS.multi}-${i}">${o}</label>
        </div>
      </span>
    </li>`,
  ).join('');

  return `
    <button type="button" class="tl-dropdown__button" ${
      disabled ? 'disabled' : ''
    } data-dropdown-toggle="${IDS.multi}" ${
    labelled ? `aria-labelledby="${IDS.label}"` : ''
  } aria-expanded="false" aria-controls="${IDS.multi}">
      <span class="tl-dropdown__button-placeholder${
        !isInside ? ' tl-dropdown__button-placeholder--visible' : ''
      }">${!isInside ? placeholder : ''}</span>
      <span class="tl-dropdown__button-value"></span>
      <span class="tl-icon tl-icon--chevron_down tl-dropdown__chevron tl-icon--16" aria-hidden="true"></span>
    </button>
    <ul class="tl-dropdown__list" id="${IDS.multi}" role="listbox" aria-multiselectable="true">
      ${items}
    </ul>`;
}

function getFilterMarkup(
  placeholder: string,
  disabled: boolean,
  multiselect: boolean,
  labelled: boolean,
) {
  const baseItems = multiselect
    ? OPTIONS.map(
        (o, i) => `
        <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" data-value="${o}">
          <span class="tl-dropdown__option-checkbox">
            <div class="tl-checkbox">
              <input type="checkbox" class="tl-checkbox__input" id="cb-${IDS.filterList}-${i}" tabindex="-1" />
              <label class="tl-checkbox__label" for="cb-${IDS.filterList}-${i}">${o}</label>
            </div>
          </span>
        </li>`,
      ).join('')
    : OPTIONS.map(
        (o) => `
        <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" data-value="${o}">
          ${o}<span class="tl-icon tl-icon--tick"></span>
        </li>`,
      ).join('');

  const noResult = multiselect
    ? ''
    : '<li class="tl-dropdown__option tl-dropdown__option--no-result" role="option" tabindex="-1">No result</li>';

  return `
    <div class="tl-dropdown__input-wrapper">
      <input class="tl-dropdown__input" id="${
        IDS.filterInput
      }" type="text" placeholder="${placeholder}" ${
    disabled ? 'disabled' : ''
  } data-dropdown-toggle="${IDS.filterList}" aria-controls="${
    IDS.filterList
  }" aria-expanded="false" ${labelled ? `aria-labelledby="${IDS.label}"` : ''}/>
      <span class="tl-icon tl-icon--cross tl-icon--16 tl-dropdown__icon--cross"></span>
      <span class="tl-dropdown__input--divider"></span>
      <span class="tl-icon tl-icon--chevron_down tl-icon--16 tl-dropdown__chevron" aria-hidden="true"></span>
    </div>
    <ul class="tl-dropdown__list" id="${IDS.filterList}" role="listbox" ${
    multiselect ? 'aria-multiselectable="true"' : ''
  }>
      ${baseItems}${noResult}
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
    modeVariant: 'Primary',
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
  const sizeMap = { Small: 'sm', Medium: 'md', Large: 'lg' } as const;
  const sizeClass = sizeMap[size] || 'lg';
  const isInside = labelPlacement === 'Inside';
  const showLabel = labelPlacement !== 'No label';
  const labelled = showLabel;

  let currentVariant: 'Select' | 'Filter' | 'Button' = 'Button';
  if (select) {
    currentVariant = 'Select';
  } else if (filter) {
    currentVariant = 'Filter';
  }

  let fieldMarkup = '';
  let scriptMarkup = '';

  if (currentVariant === 'Select') {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside', IDS.select) : ''}
      <div class="tl-dropdown__input-wrapper">
        ${getSelectMarkup(isInside, placeholder, disabled, labelled)}
      </div>`;
    scriptMarkup = `<script>(${dropdownSelectScript.toString()})('${IDS.select}');</script>`;
  } else if (currentVariant === 'Button' && multiselect) {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside', IDS.multi) : ''}
      ${getMultiselectMarkup(isInside, placeholder, disabled, labelled)}`;
    scriptMarkup = `<script>(${dropdownMenuScript.toString()})('${IDS.multi}', true, '${
      IDS.btn
    }');</script>`;
  } else if (currentVariant === 'Button') {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside', IDS.btn) : ''}
      ${getButtonMarkup(isInside, placeholder, disabled, labelled, IDS.btn)}`;
    scriptMarkup = `<script>(${dropdownMenuScript.toString()})('${IDS.btn}', false, '${
      IDS.btn
    }');</script>`;
  } else {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside', IDS.filterInput) : ''}
      ${getFilterMarkup(placeholder, disabled, Boolean(multiselect), labelled)}`;
    scriptMarkup = `<script>(${dropdownFilterScript.toString()})('${IDS.filterList}', '${
      IDS.filterInput
    }', ${Boolean(multiselect)});</script>`;
  }

  const classesList: string[] = ['tl-dropdown', `tl-dropdown--${sizeClass}`];

  if (isInside) {
    classesList.push('tl-dropdown--label-inside');
  } else if (showLabel) {
    classesList.push('tl-dropdown--label-outside');
  } else {
    classesList.push('tl-dropdown--no-label');
  }

  if (error) {
    classesList.push('tl-dropdown--error');
  }
  if (disabled) {
    classesList.push('tl-dropdown--disabled');
  }
  classesList.push(modeVariant === 'Secondary' ? 'tl-dropdown--secondary' : 'tl-dropdown--primary');
  if (multiselect && currentVariant !== 'Select') {
    classesList.push('tl-dropdown--multiselect');
  }

  const classes = classesList.join(' ');

  return formatHtmlPreview(`
    <div class="demo-wrapper" style="width:200px;height:200px;max-width:960px;">
      <div class="${classes}">
        ${fieldMarkup}
        ${showHelper ? getHelper(helper, showHelper, error) : ''}
      </div>
      ${scriptMarkup}
    </div>
  `);
};

export const Default = Template.bind({});
