import formatHtmlPreview from '../../../stories/formatHtmlPreview';

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
    select.addEventListener('active', () => {
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
    list.classList.add('tl-dropdown__list--open');
    chev?.classList.add('tl-dropdown__chevron--rotated');
    btn.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
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

  let chooseSingle: ((opt: HTMLElement) => void) | undefined;
  if (!isMulti) {
    chooseSingle = (opt: HTMLElement) => {
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
  }

  if (!btn.hasAttribute('data-bound')) {
    btn.setAttribute('data-bound', '1');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = list.classList.contains('tl-dropdown__list--open');
      if (isOpen) {
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

    const computeOrdered = () => {
      const raw = Array.from(
        list.querySelectorAll<HTMLElement>(
          '.tl-dropdown__option.tl-dropdown__option--visible:not(.tl-dropdown__option--disabled)',
        ),
      );
      const isDropUp = root?.classList.contains('tl-dropdown--dropup');
      if (!isDropUp) return raw;
      return raw.slice().reverse();
    };

    const focusByLinearIndex = (current: HTMLElement, forward: boolean, shift: boolean) => {
      const ordered = computeOrdered();
      const idx = ordered.findIndex((o) => o === current);
      if (idx < 0) return false;
      const nextIdx = shift ? idx - 1 : idx + 1;
      if (forward) {
        if (nextIdx >= ordered.length) return false;
        ordered[nextIdx].focus();
        return true;
      }
      if (nextIdx < 0) return false;
      ordered[nextIdx].focus();
      return true;
    };

    list.addEventListener('keydown', (e: KeyboardEvent) => {
      const optionsDom = Array.from(
        list.querySelectorAll<HTMLElement>(
          '.tl-dropdown__option.tl-dropdown__option--visible:not(.tl-dropdown__option--disabled)',
        ),
      );
      const active = document.activeElement as HTMLElement;
      let idx = optionsDom.findIndex((el) => el === active);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (optionsDom.length) {
          idx = idx < 0 ? 0 : Math.min(idx + 1, optionsDom.length - 1);
          optionsDom[idx].focus();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (optionsDom.length) {
          idx = idx < 0 ? optionsDom.length - 1 : Math.max(idx - 1, 0);
          optionsDom[idx].focus();
        }
      } else if (e.key === 'Tab') {
        const forward = !e.shiftKey;
        e.preventDefault();
        const moved = focusByLinearIndex(active, forward, e.shiftKey);
        if (!moved) {
          if (forward) {
            close();
            btn?.focus();
          } else {
            btn?.focus();
          }
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        close();
        btn?.focus();
      }
    });

    if (btn && !btn.hasAttribute('data-arrow-bound')) {
      btn.setAttribute('data-arrow-bound', '1');
      btn.addEventListener('keydown', (e) => {
        const options = Array.from(
          list.querySelectorAll<HTMLElement>(
            '.tl-dropdown__option.tl-dropdown__option--visible:not(.tl-dropdown__option--disabled)',
          ),
        );
        const isDropUp = root.classList.contains('tl-dropdown--dropup');
        const lastIdx = options.length - 1;
        const firstIdx = 0;
        const ensureOpen = () => {
          if (!list.classList.contains('tl-dropdown__list--open')) {
            open();
          }
        };

        if (
          (e.key === 'ArrowDown' || e.key === 'ArrowUp') &&
          !list.classList.contains('tl-dropdown__list--open') &&
          options.length
        ) {
          e.preventDefault();
          ensureOpen();
          (isDropUp ? options[lastIdx] : options[firstIdx]).focus();
          return;
        }
        if (
          e.key === 'ArrowDown' &&
          options.length &&
          list.classList.contains('tl-dropdown__list--open')
        ) {
          e.preventDefault();
          (isDropUp ? options[lastIdx] : options[firstIdx]).focus();
          return;
        }
        if (
          e.key === 'ArrowUp' &&
          options.length &&
          list.classList.contains('tl-dropdown__list--open')
        ) {
          e.preventDefault();
          (isDropUp ? options[firstIdx] : options[lastIdx]).focus();
          return;
        }
        if (e.key === 'Enter' && !list.classList.contains('tl-dropdown__list--open')) {
          e.preventDefault();
          ensureOpen();
          (isDropUp ? options[lastIdx] : options[firstIdx])?.focus();
          return;
        }
        if (e.key === 'Tab' && !e.shiftKey) {
          if (!list.classList.contains('tl-dropdown__list--open') && options.length) {
            e.preventDefault();
            ensureOpen();
            (isDropUp ? options[lastIdx] : options[firstIdx]).focus();
          } else if (
            list.classList.contains('tl-dropdown__list--open') &&
            isDropUp &&
            options.length
          ) {
            e.preventDefault();
            options[lastIdx].focus();
          }
        }
      });
    }
    if (root && !root.hasAttribute('data-focusout-bound')) {
      root.setAttribute('data-focusout-bound', '1');
      root.addEventListener('focusout', (ev: FocusEvent) => {
        setTimeout(() => {
          const next =
            (ev.relatedTarget as HTMLElement | null) ??
            (document.activeElement as HTMLElement | null);

          const keepOpen =
            (!!next && !!root?.contains(next)) ||
            !list.classList.contains('tl-dropdown__list--open');

          if (!keepOpen) {
            close();
          }
        }, 20);
      });
    }

    if (!list.hasAttribute('data-roving-bound')) {
      list.setAttribute('data-roving-bound', '1');
      list.addEventListener('focusin', (ev: FocusEvent) => {
        const target = ev.target as HTMLElement | null;
        if (!target) return;
        if (!target.classList.contains('tl-dropdown__option')) return;
        const all = Array.from(
          list.querySelectorAll<HTMLElement>('.tl-dropdown__option.tl-dropdown__option--visible'),
        );
        all.forEach((el) => el.setAttribute('tabindex', el === target ? '0' : '-1'));
      });
    }

    list.querySelectorAll<HTMLElement>('.tl-dropdown__option').forEach((li) => {
      if (li.classList.contains('tl-dropdown__option--disabled')) {
        li.setAttribute('tabindex', '-1');
        return;
      }
      li.setAttribute('tabindex', '-1');

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
      } else if (chooseSingle) {
        const select = () => {
          chooseSingle!(li);
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
  const dropUp = !!root && root.classList.contains('tl-dropdown--dropup');
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

  function updateTabIndexes() {
    options.forEach((li) => {
      if (li.classList.contains('tl-dropdown__option--visible')) {
        li.setAttribute('tabindex', '0');
      } else {
        li.setAttribute('tabindex', '-1');
      }
    });
  }

  const computeOrderedVisible = () => {
    const raw = Array.from(
      list.querySelectorAll<HTMLElement>('.tl-dropdown__option.tl-dropdown__option--visible'),
    ).filter((li) => !li.classList.contains('tl-dropdown__option--no-result'));
    return dropUp ? raw.slice().reverse() : raw;
  };

  if (!list.hasAttribute('data-nav-bound')) {
    list.setAttribute('data-nav-bound', '1');
    list.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!list.classList.contains('tl-dropdown__list--open')) return;
      const ordered = computeOrderedVisible();
      if (!ordered.length) return;
      const active = document.activeElement as HTMLElement | null;
      let idx = active ? ordered.findIndex((o) => o === active) : -1;
      const isDropUp = dropUp;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (isDropUp) {
          idx = idx < 0 ? 0 : Math.max(idx - 1, 0);
        } else {
          idx = idx < 0 ? 0 : Math.min(idx + 1, ordered.length - 1);
        }
        ordered[idx].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (isDropUp) {
          idx = idx < 0 ? ordered.length - 1 : Math.min(idx + 1, ordered.length - 1);
        } else {
          idx = idx < 0 ? ordered.length - 1 : Math.max(idx - 1, 0);
        }
        ordered[idx].focus();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const nextIdx = e.shiftKey ? idx - 1 : idx + 1;
        if (nextIdx < 0 || nextIdx >= ordered.length) {
          close();
          input.focus();
        } else {
          ordered[nextIdx].focus();
        }
      }
    });
  }

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
    updateTabIndexes();
  };

  input.addEventListener('keydown', (e) => {
    const visibleOptions = options.filter((o) =>
      o.classList.contains('tl-dropdown__option--visible'),
    );
    if (document.activeElement === input) {
      if (e.key === 'Tab' && clearIcon && isClearVisible()) {
        e.preventDefault();
        clearIcon.focus();
        return;
      }
      if (list.classList.contains('tl-dropdown__list--open')) {
        if (e.key === 'Tab' && visibleOptions.length) {
          e.preventDefault();
          (dropUp ? visibleOptions[visibleOptions.length - 1] : visibleOptions[0]).focus();
          return;
        }
        if (e.key === 'ArrowDown' && visibleOptions.length) {
          e.preventDefault();
          (dropUp ? visibleOptions[visibleOptions.length - 1] : visibleOptions[0]).focus();
          return;
        }
        if (e.key === 'ArrowUp' && visibleOptions.length) {
          e.preventDefault();
          visibleOptions[visibleOptions.length - 1].focus();
          return;
        }
      }
    }
    if (!list.classList.contains('tl-dropdown__list--open')) return;
    const active = document.activeElement as HTMLElement;
    let idx = visibleOptions.findIndex((el) => el === active);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (visibleOptions.length) {
        if (dropUp) {
          idx = idx <= 0 ? 0 : idx - 1;
        } else {
          idx = idx < 0 ? 0 : Math.min(idx + 1, visibleOptions.length - 1);
        }
        visibleOptions[idx].focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (visibleOptions.length) {
        if (dropUp) {
          idx = idx < 0 ? 0 : Math.min(idx + 1, visibleOptions.length - 1);
        } else {
          idx = idx < 0 ? visibleOptions.length - 1 : Math.max(idx - 1, 0);
        }
        visibleOptions[idx].focus();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
      input.blur();
    } else if ((e.key === 'Enter' || e.key === ' ') && idx >= 0) {
      if (visibleOptions.length) {
        e.preventDefault();
        visibleOptions[idx].click();
      }
    }
  });
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
    clearIcon.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clearInputValue();
      } else if (e.key === 'Tab' && !e.shiftKey) {
        const visibleOptions = options.filter((o) =>
          o.classList.contains('tl-dropdown__option--visible'),
        );
        if (visibleOptions.length) {
          e.preventDefault();
          visibleOptions[0].focus();
        }
      } else if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        input.focus();
      }
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

      // removed no-op keydown handler

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
          updateClearTabIndex();
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
          updateClearTabIndex();
          selectedCache = (li.getAttribute('data-value') || '').trim();
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

  if (!list.hasAttribute('data-roving-bound')) {
    list.setAttribute('data-roving-bound', '1');
    list.addEventListener('focusin', (ev: FocusEvent) => {
      const target = ev.target as HTMLElement | null;
      if (!target) return;
      if (!target.classList.contains('tl-dropdown__option')) return;
      const all = Array.from(
        list.querySelectorAll<HTMLElement>('.tl-dropdown__option.tl-dropdown__option--visible'),
      );
      all.forEach((el) => el.setAttribute('tabindex', el === target ? '0' : '-1'));
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
    <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" data-value="${o}">
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
    <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" data-value="${o}">
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
        <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" data-value="${o}">
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
        <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" data-value="${o}">
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
    scriptMarkup = `<script>(${dropdownSelectScript.toString()})('${IDS.select}');</script>`;
  } else if (!filter && multiselect) {
    scriptMarkup = `<script>(${dropdownMenuScript.toString()})('${IDS.multi}', true, '${
      IDS.multiBtn
    }');</script>`;
  } else if (!filter) {
    const listId = IDS.btnList;
    scriptMarkup = `<script>(${dropdownMenuScript.toString()})('${listId}', false, '${
      IDS.btn
    }');</script>`;
  } else {
    scriptMarkup = `<script>(${dropdownFilterScript.toString()})('${IDS.filterList}', '${
      IDS.filterInput
    }', ${multiselect});</script>`;
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
