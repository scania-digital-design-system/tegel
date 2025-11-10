import formatHtmlPreview from '../../../stories/formatHtmlPreview';
import { initDropdownKeyboard } from './_dropdownKeyboard';

if (typeof window !== 'undefined') {
  requestAnimationFrame(() => initDropdownKeyboard());
}

const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'] as const;

const IDS = {
  label: 'tl-dropdown-label',
  select: 'tl-dropdown-select',
  btn: 'tl-dropdown-btn',
  btnList: 'tl-dropdown-btn-list',
  multiBtn: 'tl-dropdown-multi-btn',
  multi: 'tl-dropdown-multi',
  filterInput: 'tl-dropdown-filter-input',
  filterList: 'tl-dropdown-filter-list',
} as const;

function dropdownSingleScript(menuId: string): void {
  const list = document.getElementById(menuId);
  if (!list) return;

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const btn = root?.querySelector<HTMLElement>(`[data-dropdown-toggle="${menuId}"]`);
  const valueSpan = root?.querySelector<HTMLElement>('.tl-dropdown__button-value');
  const placeholderSpan = root?.querySelector<HTMLElement>('.tl-dropdown__button-placeholder');
  if (!root || !btn) return;

  const setHasValue = (v: boolean) => root.classList.toggle('tl-dropdown--has-value', v);
  const open = () => {
    list.classList.add('tl-dropdown__list--open');
    btn.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    list.classList.remove('tl-dropdown__list--open');
    btn.setAttribute('aria-expanded', 'false');
  };

  const chooseSingle = (opt: HTMLElement) => {
    list.querySelectorAll('.tl-dropdown__option').forEach((o) => {
      o.classList.remove('tl-dropdown__option--selected');
      o.querySelector('.tl-icon--tick')?.classList.remove('tl-icon--tick--visible');
    });
    opt.classList.add('tl-dropdown__option--selected');
    opt.querySelector('.tl-icon--tick')?.classList.add('tl-icon--tick--visible');
    const text = (opt.dataset.value || opt.textContent || '').trim();
    if (valueSpan) {
      valueSpan.textContent = text;
      valueSpan.classList.add('tl-dropdown__button-value--visible');
    }
    placeholderSpan?.classList.remove('tl-dropdown__button-placeholder--visible');
    setHasValue(!!text);
    close();
    btn.focus();
  };

  if (!btn.hasAttribute('data-bound')) {
    btn.setAttribute('data-bound', '1');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (list.classList.contains('tl-dropdown__list--open')) {
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

  if (root && !root.hasAttribute('data-focusout-bound')) {
    root.setAttribute('data-focusout-bound', '1');
    root.addEventListener('focusout', (ev: FocusEvent) => {
      setTimeout(() => {
        const next = ev.relatedTarget as HTMLElement | null;
        if (!next || !root.contains(next)) close();
      }, 20);
    });
  }

  list.querySelectorAll<HTMLElement>('.tl-dropdown__option').forEach((li) => {
    if (li.classList.contains('tl-dropdown__option--disabled')) return;

    li.addEventListener('mousedown', (ev) => {
      ev.preventDefault();
      chooseSingle(li);
    });
    li.addEventListener('click', () => {
      chooseSingle(li);
    });
  });

  setHasValue(false);
}

function dropdownMultiScript(menuId: string): void {
  const list = document.getElementById(menuId);
  if (!list) return;

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const btn = root?.querySelector<HTMLElement>(`[data-dropdown-toggle="${menuId}"]`);
  const valueSpan = root?.querySelector<HTMLElement>('.tl-dropdown__button-value');
  const placeholderSpan = root?.querySelector<HTMLElement>('.tl-dropdown__button-placeholder');
  if (!root || !btn) return;

  const setHasValue = (v: boolean) => root.classList.toggle('tl-dropdown--has-value', v);
  const open = () => {
    list.classList.add('tl-dropdown__list--open');
    btn.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    list.classList.remove('tl-dropdown__list--open');
    btn.setAttribute('aria-expanded', 'false');
  };

  const updateMulti = () => {
    const selected = Array.from(
      list.querySelectorAll<HTMLInputElement>('.tl-checkbox__input:checked'),
    );
    const text = selected
      .map((cb) => (cb.closest('.tl-dropdown__option') as HTMLElement | null)?.dataset.value || '')
      .filter(Boolean)
      .join(', ');
    if (valueSpan) {
      valueSpan.textContent = text;
      valueSpan.classList.toggle('tl-dropdown__button-value--visible', !!text);
    }
    if (placeholderSpan) {
      placeholderSpan.classList.toggle('tl-dropdown__button-placeholder--visible', !text);
    }
    setHasValue(!!text);
  };

  if (!btn.hasAttribute('data-bound')) {
    btn.setAttribute('data-bound', '1');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (list.classList.contains('tl-dropdown__list--open')) {
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

  if (root && !root.hasAttribute('data-focusout-bound')) {
    root.setAttribute('data-focusout-bound', '1');
    root.addEventListener('focusout', (ev: FocusEvent) => {
      setTimeout(() => {
        const next = ev.relatedTarget as HTMLElement | null;
        if (!next || !root.contains(next)) close();
      }, 20);
    });
  }

  list.querySelectorAll<HTMLElement>('.tl-dropdown__option').forEach((li) => {
    if (li.classList.contains('tl-dropdown__option--disabled')) return;

    const cb = li.querySelector<HTMLInputElement>('.tl-checkbox__input');
    li.addEventListener('mousedown', (ev) => {
      ev.preventDefault();
      if (!cb) return;
      cb.checked = !cb.checked;
      li.classList.toggle('tl-dropdown__option--selected', cb.checked);
      updateMulti();
    });
    cb?.addEventListener('click', (ev) => {
      ev.stopPropagation();
    });
  });

  setHasValue(false);
}

function dropdownFilterSingleScript(listId: string, inputId: string): void {
  const list = document.getElementById(listId) as HTMLElement | null;
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  if (!list || !input) return;

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const chev = input.parentElement?.querySelector('.tl-dropdown__chevron') as HTMLElement | null;
  const clearIcon = input.parentElement?.querySelector(
    '.tl-dropdown__input-clear',
  ) as HTMLElement | null;
  const noResult = list.querySelector('.tl-dropdown__option--no-result') as HTMLElement | null;

  let selectedCache = '';
  const isClearVisible = () => {
    if (!clearIcon) return false;
    const layoutVisible = (clearIcon as HTMLElement).offsetParent !== null;
    const hasText = (input.value || '').trim().length > 0 || !!selectedCache;
    return layoutVisible && hasText;
  };

  const updateClearTabIndex = () => {
    if (!clearIcon) return;
    clearIcon.setAttribute('tabindex', isClearVisible() ? '0' : '-1');
  };

  const setHasValue = (v: boolean) => {
    root?.classList.toggle('tl-dropdown--has-value', v);
    updateClearTabIndex();
  };
  const open = () => {
    list.classList.add('tl-dropdown__list--open');
    input.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    list.classList.remove('tl-dropdown__list--open');
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
      if (visible) matches += 1;
    });

    if (noResult) {
      const show = !!q && matches === 0;
      noResult.classList.toggle('tl-dropdown__option--visible', show);
    }
  };

  if (clearIcon && !clearIcon.hasAttribute('data-bound')) {
    clearIcon.setAttribute('data-bound', '1');
    const clearInputValue = () => {
      selectedCache = '';
      input.value = '';
      setHasValue(false);
      input.focus();
      filterOptions();
      updateClearTabIndex();
    };
    clearIcon.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearInputValue();
    });
    clearIcon.addEventListener('focus', () => {
      open();
    });
  }

  if (chev && !chev.hasAttribute('data-bound')) {
    chev.setAttribute('data-bound', '1');
    chev.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = list.classList.contains('tl-dropdown__list--open');
      if (isOpen) {
        close();
        input.blur();
      } else {
        open();
        input.focus();
        filterOptions();
      }
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
      updateClearTabIndex();
    });

    input.addEventListener('input', () => {
      filterOptions();
      setHasValue(!!input.value || !!selectedCache);
      updateClearTabIndex();
    });
  }

  if (!list.hasAttribute('data-bound')) {
    list.setAttribute('data-bound', '1');

    const optionArr = Array.from(list.querySelectorAll<HTMLElement>('.tl-dropdown__option'));
    optionArr.forEach((li) => {
      if (li.classList.contains('tl-dropdown__option--no-result')) return;
      if (li.classList.contains('tl-dropdown__option--disabled')) return;

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
        updateClearTabIndex();
        selectedCache = (li.getAttribute('data-value') || '').trim();
        input.blur();
      };

      li.addEventListener('mousedown', (ev) => {
        ev.preventDefault();
        choose();
      });
    });
  }

  if (root && !root.hasAttribute('data-focusout-bound')) {
    root.setAttribute('data-focusout-bound', '1');
    root.addEventListener('focusout', (ev: FocusEvent) => {
      setTimeout(() => {
        const next =
          (ev.relatedTarget as HTMLElement) || (document.activeElement as HTMLElement | null);
        if (!next || !root.contains(next)) {
          close();
          if (selectedCache) {
            input.value = selectedCache;
            setHasValue(true);
          } else {
            setHasValue(!!input.value);
          }
          updateClearTabIndex();
        }
      }, 20);
    });
  }

  selectedCache = '';
  setHasValue(false);
  filterOptions();
}

function dropdownFilterMultiScript(listId: string, inputId: string): void {
  const list = document.getElementById(listId) as HTMLElement | null;
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  if (!list || !input) return;

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const chev = input.parentElement?.querySelector('.tl-dropdown__chevron') as HTMLElement | null;
  const clearIcon = input.parentElement?.querySelector(
    '.tl-dropdown__input-clear',
  ) as HTMLElement | null;

  let selectedCache = '';
  const isClearVisible = () => {
    if (!clearIcon) return false;
    const layoutVisible = (clearIcon as HTMLElement).offsetParent !== null;
    const hasText = (input.value || '').trim().length > 0 || !!selectedCache;
    return layoutVisible && hasText;
  };

  const updateClearTabIndex = () => {
    if (!clearIcon) return;
    clearIcon.setAttribute('tabindex', isClearVisible() ? '0' : '-1');
  };

  const setHasValue = (v: boolean) => {
    root?.classList.toggle('tl-dropdown--has-value', v);
    updateClearTabIndex();
  };
  const open = () => {
    list.classList.add('tl-dropdown__list--open');
    input.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    list.classList.remove('tl-dropdown__list--open');
    input.setAttribute('aria-expanded', 'false');
  };

  const options = Array.from(list.querySelectorAll<HTMLElement>('.tl-dropdown__option'));

  const filterOptions = () => {
    const q = (input.value || '').toLowerCase().trim();

    options.forEach((li) => {
      const val = (li.getAttribute('data-value') || li.textContent || '').toLowerCase();
      const visible = !q || val.includes(q);
      li.classList.toggle('tl-dropdown__option--visible', visible);
    });
  };

  if (clearIcon && !clearIcon.hasAttribute('data-bound')) {
    clearIcon.setAttribute('data-bound', '1');
    const clearInputValue = () => {
      selectedCache = '';
      input.value = '';
      setHasValue(false);
      input.focus();
      filterOptions();
      updateClearTabIndex();
    };
    clearIcon.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearInputValue();
    });
    clearIcon.addEventListener('focus', () => {
      open();
    });
  }

  if (chev && !chev.hasAttribute('data-bound')) {
    chev.setAttribute('data-bound', '1');
    chev.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = list.classList.contains('tl-dropdown__list--open');
      if (isOpen) {
        close();
        input.blur();
      } else {
        open();
        input.focus();
        filterOptions();
      }
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
      updateClearTabIndex();
    });

    input.addEventListener('input', () => {
      filterOptions();
      setHasValue(!!input.value || !!selectedCache);
      updateClearTabIndex();
    });
  }

  if (!list.hasAttribute('data-bound')) {
    list.setAttribute('data-bound', '1');

    const optionArr = Array.from(list.querySelectorAll<HTMLElement>('.tl-dropdown__option'));
    optionArr.forEach((li) => {
      if (li.classList.contains('tl-dropdown__option--disabled')) return;

      const cb = li.querySelector<HTMLInputElement>('.tl-checkbox__input');
      if (!cb) return;

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
        updateClearTabIndex();
      };

      li.addEventListener('mousedown', (ev) => {
        ev.preventDefault();
        apply();
      });
      cb.addEventListener('click', (ev) => {
        ev.stopPropagation();
        apply();
      });
    });
  }

  if (root && !root.hasAttribute('data-focusout-bound')) {
    root.setAttribute('data-focusout-bound', '1');
    root.addEventListener('focusout', (ev: FocusEvent) => {
      setTimeout(() => {
        const next =
          (ev.relatedTarget as HTMLElement) || (document.activeElement as HTMLElement | null);
        if (!next || !root.contains(next)) {
          close();
          if (selectedCache) {
            input.value = selectedCache;
            setHasValue(true);
          } else {
            setHasValue(!!input.value);
          }
          updateClearTabIndex();
        }
      }, 20);
    });
  }

  selectedCache = '';
  setHasValue(false);
  filterOptions();
}

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
  let ph = '';
  if (isInside) {
    ph = '<option value="" hidden selected></option>';
  } else if (placeholder) {
    ph = `<option value="" disabled selected>${placeholder}</option>`;
  }
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
  opts: readonly string[],
  dropUp: boolean,
) {
  const optionLis = opts
    .map(
      (o) => `
    <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" data-value="${o}" tabindex="0">
      ${o}<span class="tl-icon tl-icon--tick"></span>
    </li>`,
    )
    .join('');

  const disabledLi =
    '<li class="tl-dropdown__option tl-dropdown__option--disabled tl-dropdown__option--visible" role="option" aria-disabled="true">Option disabled</li>';

  const items = dropUp ? `${disabledLi}${optionLis}` : `${optionLis}${disabledLi}`;

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
  opts: readonly string[],
) {
  const items = opts
    .map(
      (o, i) => `
    <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" data-value="${o}" tabindex="0">
      <div class="tl-checkbox">
        <input type="checkbox" class="tl-checkbox__input" id="cb-${IDS.multi}-${i}" tabindex="-1" />
        <label class="tl-checkbox__label" for="cb-${IDS.multi}-${i}">${o}</label>
      </div>
    </li>`,
    )
    .join('');

  const disabledItem = `
    <li class="tl-dropdown__option tl-dropdown__option--disabled tl-dropdown__option--visible" role="option" aria-disabled="true" data-value="Option disabled">
      <div class="tl-checkbox">
        <input type="checkbox" class="tl-checkbox__input" id="cb-${IDS.multi}-disabled" tabindex="-1" disabled />
        <label class="tl-checkbox__label" for="cb-${IDS.multi}-disabled">Option disabled</label>
      </div>
    </li>`;

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
      ${disabledItem}
    </ul>`;
}

function getFilterMarkup(
  placeholder: string,
  disabled: boolean,
  multiselect: boolean,
  labelled: boolean,
  opts: readonly string[],
) {
  const baseItems = multiselect
    ? opts
        .map(
          (o, i) => `
        <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" data-value="${o}" tabindex="0">
          <div class="tl-checkbox">
            <input type="checkbox" class="tl-checkbox__input" id="cb-${IDS.filterList}-${i}" tabindex="-1" />
            <label class="tl-checkbox__label" for="cb-${IDS.filterList}-${i}">${o}</label>
          </div>
        </li>`,
        )
        .join('')
    : opts
        .map(
          (o) => `
        <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" data-value="${o}" tabindex="0">
          ${o}<span class="tl-icon tl-icon--tick"></span>
        </li>`,
        )
        .join('');

  const noResult = multiselect
    ? ''
    : '<li class="tl-dropdown__option tl-dropdown__option--no-result" role="option" aria-disabled="true" tabindex="-1">No result</li>';

  return `
    <div class="tl-dropdown__input-wrapper">
      <input class="tl-dropdown__input" id="${
        IDS.filterInput
      }" type="text" placeholder="${placeholder}" ${
    disabled ? 'disabled' : ''
  } data-dropdown-toggle="${IDS.filterList}" aria-controls="${
    IDS.filterList
  }" aria-expanded="false" ${labelled ? `aria-labelledby="${IDS.label}"` : ''}/>
  <button type="button" class="tl-dropdown__input-clear" aria-label="Clear input" tabindex="-1">
        <span class="tl-icon tl-icon--cross tl-icon--16" aria-hidden="true"></span>
      </button>
      <span class="tl-dropdown__input-divider"></span>
      <span class="tl-icon tl-icon--chevron_down tl-icon--16 tl-dropdown__chevron" aria-hidden="true"></span>
    </div>
    <ul class="tl-dropdown__list" id="${IDS.filterList}" role="listbox" ${
    multiselect ? 'aria-multiselectable="true"' : ''
  }>
      ${baseItems}${noResult}
    </ul>`;
}

export default {
  title: 'Tegel Light (CSS)/Dropdown',
  parameters: { layout: 'centered' },
  argTypes: {
    select: { name: 'Select', control: { type: 'boolean' }, defaultValue: false },
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
    direction: {
      name: 'Open direction',
      control: { type: 'radio' },
      options: ['Down', 'Up'],
      defaultValue: 'Down',
    },
  },
  args: {
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
    direction: 'Down',
    select: false,
  },
};

type TemplateProps = {
  direction: 'Down' | 'Up';
  select: boolean;
  filter: boolean;
  label: string;
  placeholder: string;
  showHelper: boolean;
  helper: string;
  disabled: boolean;
  error: boolean;
  size: 'Small' | 'Medium' | 'Large';
  labelPlacement: 'Outside' | 'Inside' | 'No label';
  multiselect: boolean;
};

function getDropdownMarkup(props: TemplateProps, optionOrder: readonly string[]): string {
  const {
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
    direction,
  } = props;

  const sizeMap = { Small: 'sm', Medium: 'md', Large: 'lg' } as const;
  const sizeClass = sizeMap[size] || 'lg';
  const isInside = labelPlacement === 'Inside';
  const showLabel = labelPlacement !== 'No label';
  const labelled = showLabel;
  const dropUp = direction === 'Up';

  let currentVariant: 'Select' | 'Filter' | 'Button' = 'Button';
  if (select) {
    currentVariant = 'Select';
  } else if (filter) {
    currentVariant = 'Filter';
  }

  let fieldMarkup = '';
  if (currentVariant === 'Select') {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside', IDS.select) : ''}
      ${getSelectMarkup(isInside, placeholder, disabled, labelled)}`;
  } else if (currentVariant === 'Button' && multiselect) {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside') : ''}
      ${getMultiselectMarkup(isInside, placeholder, disabled, labelled, optionOrder)}`;
  } else if (currentVariant === 'Button') {
    const listId = IDS.btnList;
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside') : ''}
      ${getButtonMarkup(isInside, placeholder, disabled, labelled, listId, optionOrder, dropUp)}`;
  } else {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside', IDS.filterInput) : ''}
      ${getFilterMarkup(placeholder, disabled, multiselect, labelled, optionOrder)}`;
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
  if (direction === 'Up') {
    classesList.push('tl-dropdown--dropup');
  }
  const classes = classesList.join(' ');

  return `
    <div class="demo-wrapper" style="width:200px;height:200px;max-width:960px;">
      <div class="${classes}">
        ${fieldMarkup}
        ${showHelper ? getHelper(helper, showHelper, error) : ''}
      </div>
    </div>
  `;
}

function getDropdownScript(props: TemplateProps): string {
  const { select, filter, multiselect } = props;

  let scriptMarkup = '';
  if (select) {
    scriptMarkup = '';
  } else if (filter && multiselect) {
    scriptMarkup = `<script>(${dropdownFilterMultiScript.toString()})('${IDS.filterList}', '${
      IDS.filterInput
    }');</script>`;
  } else if (filter) {
    scriptMarkup = `<script>(${dropdownFilterSingleScript.toString()})('${IDS.filterList}', '${
      IDS.filterInput
    }');</script>`;
  } else if (multiselect) {
    scriptMarkup = `<script>(${dropdownMultiScript.toString()})('${IDS.multi}');</script>`;
  } else {
    scriptMarkup = `<script>(${dropdownSingleScript.toString()})('${IDS.btnList}');</script>`;
  }
  return scriptMarkup;
}

const Template = (props: TemplateProps): string => {
  const dropUp = props.direction === 'Up';
  const optionOrder = dropUp ? [...OPTIONS].reverse() : [...OPTIONS];
  const markup = getDropdownMarkup(props, optionOrder);
  const script = getDropdownScript(props);
  return formatHtmlPreview(`${markup}\n${script}`);
};

export const Default = Template.bind({});
