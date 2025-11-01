import formatHtmlPreview from '../../../stories/formatHtmlPreview';

function dropdownSelectScript(dropdownId: string): void {
  const select = document.getElementById(dropdownId) as HTMLSelectElement | null;
  if (!select) return;

  const parent = select.closest('.tl-dropdown');
  const chevron = parent?.querySelector('.tl-dropdown__chevron') as HTMLElement | null;

  function updateSelectValue() {
    if (!parent) return;
    if (select.value) {
      parent.classList.add('tl-dropdown--has-value');
    } else {
      parent.classList.remove('tl-dropdown--has-value');
    }
  }

  select.addEventListener('change', updateSelectValue);

  select.addEventListener('focus', () => {
    if (chevron) chevron.classList.add('tl-dropdown__chevron--rotated');
  });

  select.addEventListener('blur', () => {
    if (chevron) chevron.classList.remove('tl-dropdown__chevron--rotated');
  });

  updateSelectValue();
}

function dropdownScript(dropdownId: string, isMulti: boolean) {
  let btn: HTMLElement | null;
  let list: HTMLElement | null;
  let chevron: HTMLElement | null;

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
          valueSpan.classList.add('tl-dropdown__button-value--visible');
        }
        if (placeholderSpan)
          placeholderSpan.classList.remove('tl-dropdown__button-placeholder--visible');
        if (parent?.classList.contains('tl-dropdown--label-inside')) {
          parent.classList.add('tl-dropdown--has-value');
        }
      } else {
        if (valueSpan) {
          valueSpan.textContent = '';
          valueSpan.classList.remove('tl-dropdown__button-value--visible');
        }
        if (placeholderSpan)
          placeholderSpan.classList.add('tl-dropdown__button-placeholder--visible');
        if (parent?.classList.contains('tl-dropdown--label-inside')) {
          parent.classList.remove('tl-dropdown--has-value');
        }
      }
    }
  }

  function toggleOption(opt: HTMLElement) {
    const checkbox = opt.querySelector?.('.tl-checkbox__input') as HTMLInputElement | null;
    if (isMulti) {
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        if (checkbox.checked) {
          opt.classList.add('tl-dropdown__option--selected');
        } else {
          opt.classList.remove('tl-dropdown__option--selected');
        }
      }
      updateButtonValue();
    } else {
      const valueSpan = btn?.querySelector('.tl-dropdown__button-value') as HTMLElement | null;
      const placeholderSpan = btn?.querySelector(
        '.tl-dropdown__button-placeholder',
      ) as HTMLElement | null;
      const parent = btn?.closest('.tl-dropdown');
      if (valueSpan) {
        valueSpan.textContent = opt.textContent;
        valueSpan.classList.add('tl-dropdown__button-value--visible');
      }
      if (placeholderSpan && !btn?.classList.contains('tl-dropdown--label-inside')) {
        placeholderSpan.classList.remove('tl-dropdown__button-placeholder--visible');
      }
      if (parent?.classList.contains('tl-dropdown--label-inside')) {
        parent.classList.add('tl-dropdown--has-value');
      }
      btn?.classList.remove('tl-dropdown__button--expanded');
      if (chevron) chevron.classList.remove('tl-dropdown__chevron--rotated');
      if (list) {
        list.classList.remove('tl-dropdown__list--open');
        Array.from(list.querySelectorAll('.tl-dropdown__option')).forEach((o) => {
          const elem = o as HTMLElement;
          if (elem !== opt) {
            elem.classList.remove('tl-dropdown__option--selected');
            const tick = elem.querySelector('.tl-icon--tick') as HTMLElement | null;
            if (tick) tick.classList.remove('tl-icon--tick--visible');
          }
        });
      }
      opt.classList.add('tl-dropdown__option--selected');
      const tick = opt.querySelector?.('.tl-icon--tick') as HTMLElement | null;
      if (tick) tick.classList.add('tl-icon--tick--visible');
    }
  }
  function attach() {
    btn = document.querySelector(`[data-dropdown-toggle="${dropdownId}"]`);
    list = document.getElementById(dropdownId);
    chevron = btn?.querySelector('.tl-dropdown__chevron') as HTMLElement | null;
    if (btn && list && chevron) {
      if (!btn.hasAttribute('data-dropdown-listener')) {
        btn.setAttribute('data-dropdown-listener', 'true');
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const expanded = btn.classList.contains('tl-dropdown__button--expanded');
          if (!expanded) {
            btn.classList.add('tl-dropdown__button--expanded');
            list.classList.add('tl-dropdown__list--open');
            chevron.classList.add('tl-dropdown__chevron--rotated');
          } else {
            btn.classList.remove('tl-dropdown__button--expanded');
            list.classList.remove('tl-dropdown__list--open');
            chevron.classList.remove('tl-dropdown__chevron--rotated');
          }
        });
      }
      if (!list.hasAttribute('data-dropdown-listener')) {
        list.setAttribute('data-dropdown-listener', 'true');
        document.addEventListener('click', (e) => {
          const target = e.target as Node;
          if (!btn.contains(target) && !list.contains(target)) {
            btn.classList.remove('tl-dropdown__button--expanded');
            list.classList.remove('tl-dropdown__list--open');
            chevron.classList.remove('tl-dropdown__chevron--rotated');
          }
        });
        Array.from(list.querySelectorAll('.tl-dropdown__option')).forEach((el) => {
          const elem = el as HTMLElement;
          if (elem.classList.contains('tl-dropdown__option--disabled')) return;
          elem.addEventListener('click', (ev: Event) => {
            ev.stopPropagation();
            toggleOption(elem);
          });
          elem.addEventListener('keydown', (ev: KeyboardEvent) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
              ev.preventDefault();
              toggleOption(elem);
            }
          });
          elem.addEventListener('blur', () => {
            setTimeout(() => {
              const active = document.activeElement;
              if (!list.contains(active) && active !== btn) {
                btn.classList.remove('tl-dropdown__button--expanded');
                list.classList.remove('tl-dropdown__list--open');
                chevron.classList.remove('tl-dropdown__chevron--rotated');
              }
            }, 100);
          });
          const checkbox = elem.querySelector('.tl-checkbox__input') as HTMLInputElement | null;
          if (checkbox) {
            checkbox.addEventListener('click', (ev: Event) => {
              ev.stopPropagation();
              toggleOption(elem);
            });
            checkbox.addEventListener('blur', () => {
              setTimeout(() => {
                const active = document.activeElement;
                if (!list.contains(active) && active !== btn) {
                  btn.classList.remove('tl-dropdown__button--expanded');
                  list.classList.remove('tl-dropdown__list--open');
                  chevron.classList.remove('tl-dropdown__chevron--rotated');
                }
              }, 100);
            });
          }
        });
      }
    }
  }

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

const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

function getLabelMarkup(
  label: string,
  labelId: string,
  isLabelInside: boolean,
  isLabelOutside: boolean,
): string {
  if (!label) return '';
  const labelClasses = ['tl-dropdown__label'];
  if (isLabelInside) labelClasses.push('tl-dropdown__label-inside');
  if (isLabelOutside) labelClasses.push('tl-dropdown__label-outside');
  return `<label class="${labelClasses.join(' ')}"${
    labelId ? ` id="${labelId}"` : ''
  }>${label}</label>`;
}

function getHelperMarkup(helper: string, error: boolean): string {
  if (!helper) return '';
  const helperIcon = error ? '<span class="tl-icon tl-icon--info tl-icon--16"></span>' : '';
  return `<div class="tl-dropdown__helper">${helperIcon}${helper}</div>`;
}

function getSelectMarkup({ isLabelInside, placeholder, disabled }) {
  const placeholderOption = isLabelInside
    ? '<option value="" hidden selected></option>'
    : placeholder
    ? `<option value="" disabled selected>${placeholder}</option>`
    : '';
  const selectId = 'tl-dropdown-select-demo';
  return `
    <select class="tl-dropdown__select"${disabled ? ' disabled' : ''} id="${selectId}">
      ${placeholderOption}
      ${OPTIONS.map((opt) => `<option value="${opt}">${opt}</option>`).join('')}
    </select>
    <span class="tl-icon tl-icon--chevron_down tl-dropdown__chevron tl-icon--16"></span>
  `;
}

function getMultiselectMarkup({ isLabelInside, placeholder, disabled }) {
  const multiId = 'tl-dropdown-multiselect-demo';
  const optionsMarkup = OPTIONS.map((opt, i) => {
    const checkboxId = `tl-checkbox-${multiId}-${i}`;
    return `
      <li class="tl-dropdown__option tl-dropdown__option--visible" tabindex="0" data-value="${opt}">
        <span class="tl-dropdown__option-checkbox">
          <div class="tl-checkbox">
            <input type="checkbox" class="tl-checkbox__input" id="${checkboxId}" tabindex="-1" />
            <label class="tl-checkbox__label" for="${checkboxId}">${opt}</label>
          </div>
        </span>
      </li>`;
  }).join('');
  return `
    <button type="button" class="tl-dropdown__button"${
      disabled ? ' disabled' : ''
    } data-dropdown-toggle="${multiId}">
      <span class="tl-dropdown__button-placeholder${
        !isLabelInside ? ' tl-dropdown__button-placeholder--visible' : ''
      }">${!isLabelInside ? placeholder : ''}</span>
      <span class="tl-dropdown__button-value"></span>
      <span class="tl-icon tl-icon--chevron_down tl-dropdown__chevron tl-icon--16"></span>
    </button>
    <ul class="tl-dropdown__list" id="${multiId}" tabindex="-1">
      ${optionsMarkup}
    </ul>
  `;
}

function getButtonMarkup({ isLabelInside, placeholder, disabled }) {
  const buttonId = 'tl-dropdown-button-demo';
  const optionsMarkup =
    OPTIONS.map(
      (opt) =>
        `<li class="tl-dropdown__option tl-dropdown__option--visible" tabindex="0" data-value="${opt}">${opt}<span class="tl-icon tl-icon--tick"></span></li>`,
    ).join('') +
    '<li class="tl-dropdown__option tl-dropdown__option--disabled tl-dropdown__option--visible" tabindex="-1" data-value="Option disabled">Option disabled</li>';
  return `
    <button type="button" class="tl-dropdown__button"${
      disabled ? ' disabled' : ''
    } data-dropdown-toggle="${buttonId}">
      <span class="tl-dropdown__button-placeholder${
        !isLabelInside ? ' tl-dropdown__button-placeholder--visible' : ''
      }">${!isLabelInside ? placeholder : ''}</span>
      <span class="tl-dropdown__button-value"></span>
      <span class="tl-icon tl-icon--chevron_down tl-dropdown__chevron tl-icon--16"></span>
    </button>
    <ul class="tl-dropdown__list" id="${buttonId}" tabindex="-1">
      ${optionsMarkup}
    </ul>
  `;
}

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
      options: ['Select', 'Button', 'Filter'],
      defaultValue: 'Select',
      description: 'Toggle between select and button variant',
    },
    multiselect: {
      name: 'Multiselect',
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'Enable multiselect for button variant',
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
  },
  args: {
    modeVariant: 'Primary',
    variant: 'Select',
    multiselect: false,
    size: 'Large',
    label: 'Label',
    labelPlacement: 'Outside',
    placeholder: 'Placeholder',
    showHelper: true,
    helper: 'Helper text',
    error: false,
    disabled: false,
  },
};

const Template = ({
  variant,
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
  const normalizedSize = { Small: 'sm', Medium: 'md', Large: 'lg' }[size];
  const isLabelInside = labelPlacement === 'Inside';
  const isLabelOutside = labelPlacement === 'Outside';
  const showLabel = labelPlacement !== 'No label';
  const modeClass = modeVariant === 'Secondary' ? 'tl-dropdown--secondary' : 'tl-dropdown--primary';
  const labelId = showLabel ? 'tl-dropdown-story-label' : '';
  const labelMarkup = showLabel
    ? getLabelMarkup(label, labelId, isLabelInside, isLabelOutside)
    : '';
  const helperMarkup = showHelper && helper ? getHelperMarkup(helper, error) : '';
  let fieldMarkup = '';
  let scriptMarkup = '';
  if (variant === 'Select') {
    fieldMarkup = getSelectMarkup({ isLabelInside, placeholder, disabled });
    scriptMarkup = `<script id="script-tl-dropdown-select-demo">(${dropdownSelectScript.toString()})('tl-dropdown-select-demo');</script>`;
  } else if (variant === 'Filter') {
    const filterId = 'tl-dropdown-filter-demo';
    let optionsMarkup = '';
    if (multiselect) {
      optionsMarkup = OPTIONS.map((opt, i) => {
        const checkboxId = `tl-checkbox-${filterId}-${i}`;
        return `
          <li class="tl-dropdown__option tl-dropdown__option--visible" tabindex="0" data-value="${opt}">
            <span class="tl-dropdown__option-checkbox">
              <div class="tl-checkbox">
                <input type="checkbox" class="tl-checkbox__input" id="${checkboxId}" tabindex="-1" />
                <label class="tl-checkbox__label" for="${checkboxId}">${opt}</label>
              </div>
            </span>
          </li>`;
      }).join('');
    } else {
      optionsMarkup =
        OPTIONS.map(
          (opt) =>
            `<li class="tl-dropdown__option tl-dropdown__option--visible" tabindex="0" data-value="${opt}">${opt}<span class="tl-icon tl-icon--tick"></span></li>`,
        ).join('') +
        '<li class="tl-dropdown__option tl-dropdown__option--disabled tl-dropdown__option--visible" tabindex="-1" data-value="Option disabled">Option disabled</li>';
    }
    fieldMarkup = `
      <div class="tl-dropdown__input-wrapper" id="${filterId}-wrapper">
        <input class="tl-dropdown__input" type="text" placeholder="${placeholder}"${
      disabled ? ' disabled' : ''
    } data-dropdown-toggle="${filterId}" />
        <span class="tl-icon tl-icon--cross tl-icon--16 tl-dropdown__icon--cross"></span>
        <span class="tl-dropdown__input--divider"></span>
        <span class="tl-icon tl-icon--chevron_down tl-icon--16 tl-dropdown__chevron"></span>
      </div>
      <ul class="tl-dropdown__list" id="${filterId}" tabindex="-1">
        ${optionsMarkup}
        <li class="tl-dropdown__option tl-dropdown__option--no-result" tabindex="-1" style="pointer-events: none" data-value="No result">No result</li>
      </ul>
    `;
    scriptMarkup = `<script id="script-${filterId}">
      (() => {
  const input = document.querySelector('[data-dropdown-toggle="${filterId}"]');
  const list = document.getElementById('${filterId}');
  const chevron = input?.parentElement?.querySelector('.tl-dropdown__chevron');
  const clearIcon = input?.parentElement?.querySelector('.tl-icon--cross');
        let isOpen = false;
        let lastFilter = '';
        let optionHasFocus = false;
        let chevronClicked = false;
        let preventBlurClose = false;
        function openDropdown() {
          list.classList.add('tl-dropdown__list--open');
          chevron.classList.add('tl-dropdown__chevron--rotated');
          isOpen = true;
        }
        function closeDropdown() {
          list.classList.remove('tl-dropdown__list--open');
          chevron.classList.remove('tl-dropdown__chevron--rotated');
          isOpen = false;
        }
        let selectedValue = '';
        function setHasValueClass(forceAdd = false) {
          const dropdown = input.parentElement?.parentElement;
          if (forceAdd) {
            dropdown?.classList.add('tl-dropdown--has-value');
            return;
          }
          if (input.value) {
            dropdown?.classList.add('tl-dropdown--has-value');
          } else {
            dropdown?.classList.remove('tl-dropdown--has-value');
          }
        }
        function filterOptions() {
          const filterValue = input.value.toLowerCase();
          lastFilter = filterValue;
          let matchCount = 0;
          Array.from(list.querySelectorAll('.tl-dropdown__option:not(.tl-dropdown__option--no-result)')).forEach((el) => {
            const elem = el;
            const value = elem.getAttribute('data-value')?.toLowerCase() || '';
            if (!filterValue || value.includes(filterValue)) {
              elem.classList.add('tl-dropdown__option--visible');
              elem.setAttribute('tabindex', '0');
              matchCount++;
            } else {
              elem.classList.remove('tl-dropdown__option--visible');
              elem.setAttribute('tabindex', '-1');
            }
          });
          const noResult = list.querySelector('.tl-dropdown__option--no-result');
          if (noResult) {
            if (filterValue && matchCount === 0) {
              noResult.classList.add('tl-dropdown__option--visible');
            } else {
              noResult.classList.remove('tl-dropdown__option--visible');
            }
          }
        }
        function updateInputValue() {
          const checkedBoxes = list.querySelectorAll('.tl-checkbox__input:checked');
          const selectedValues = Array.from(checkedBoxes)
            .map(cb => {
              const li = cb.closest('.tl-dropdown__option');
              return li ? li.getAttribute('data-value') : '';
            })
            .filter(Boolean);
          selectedValue = selectedValues.join(', ');
          input.value = selectedValue;
          setHasValueClass();
        }
        if (input && list && chevron) {
          if (clearIcon) {
            clearIcon.addEventListener('mousedown', (e) => {
              e.preventDefault();
              input.value = '';
              input.focus();
              setHasValueClass();
              filterOptions();
            });
          }

          input.addEventListener('focus', () => {
            if (!chevronClicked) {
              openDropdown();
            }
            chevronClicked = false;
            setHasValueClass(true);
            if (selectedValue) {
              input.value = '';
            }
          });
          input.addEventListener('blur', () => {
              setTimeout(() => {
              if (preventBlurClose) {
                preventBlurClose = false;
                return;
              }
              const active = document.activeElement;
              if (!list.contains(active) && active !== input) {
                closeDropdown();
                if (selectedValue) {
                  input.value = selectedValue;
                  input.parentElement?.parentElement?.classList.add('tl-dropdown--has-value');
                } else {
                  input.parentElement?.parentElement?.classList.remove('tl-dropdown--has-value');
                }
              }
            }, 100);
          });
          input.addEventListener('input', () => {
            filterOptions();
            setHasValueClass();
          });
          chevron.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            chevronClicked = true;
            if (isOpen) {
              preventBlurClose = true;
              closeDropdown();
              input.blur();
            } else {
              openDropdown();
              input.focus();
            }
          });

          Array.from(list.querySelectorAll('.tl-dropdown__option')).forEach((el) => {
            const elem = el;
            if (elem.classList.contains('tl-dropdown__option--disabled')) return;
            elem.addEventListener('focus', () => {
              optionHasFocus = true;
            });
            elem.addEventListener('blur', () => {
              setTimeout(() => {
                const active = document.activeElement;
                if (!list.contains(active) && active !== input) {
                  closeDropdown();
                  if (selectedValue) {
                    input.value = selectedValue;
                    setHasValueClass();
                  }
                }
              }, 100);
            });
            if (${multiselect}) {
              const checkbox = elem.querySelector('.tl-checkbox__input');
              if (checkbox) {
                checkbox.addEventListener('click', (ev) => {
                  ev.stopPropagation();
                  checkbox.checked = !checkbox.checked;
                  if (checkbox.checked) {
                    elem.classList.add('tl-dropdown__option--selected');
                  } else {
                    elem.classList.remove('tl-dropdown__option--selected');
                  }
                  updateInputValue();
                });
                elem.addEventListener('mousedown', (ev) => {
                  ev.preventDefault();
                  checkbox.checked = !checkbox.checked;
                  if (checkbox.checked) {
                    elem.classList.add('tl-dropdown__option--selected');
                  } else {
                    elem.classList.remove('tl-dropdown__option--selected');
                  }
                  updateInputValue();
                });
                elem.addEventListener('keydown', (ev) => {
                  if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault();
                    checkbox.checked = !checkbox.checked;
                    if (checkbox.checked) {
                      elem.classList.add('tl-dropdown__option--selected');
                    } else {
                      elem.classList.remove('tl-dropdown__option--selected');
                    }
                    updateInputValue();
                  }
                });
              }
            } else {
              elem.addEventListener('mousedown', (ev) => {
                ev.preventDefault();
                selectOption(elem);
              });

              elem.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') {
                  ev.preventDefault();
                  selectOption(elem);
                }
              });

              function selectOption(optionElem) {
                Array.from(list.querySelectorAll('.tl-dropdown__option')).forEach((o) => {
                  o.classList.remove('tl-dropdown__option--selected');
                  const tick = o.querySelector('.tl-icon--tick');
                  if (tick) tick.classList.remove('tl-icon--tick--visible');
                });
                optionElem.classList.add('tl-dropdown__option--selected');
                const tick = optionElem.querySelector('.tl-icon--tick');
                if (tick) tick.classList.add('tl-icon--tick--visible');
                selectedValue = optionElem.getAttribute('data-value') || '';
                input.value = selectedValue;
                setHasValueClass();
                closeDropdown();
                input.blur();
              }
            }
          });
          selectedValue = '';
          setHasValueClass();
        }
      })();
    </script>`;
  } else if (multiselect) {
    fieldMarkup = getMultiselectMarkup({ isLabelInside, placeholder, disabled });
    scriptMarkup = `<script id="script-tl-dropdown-multiselect-demo">(${dropdownScript.toString()})('tl-dropdown-multiselect-demo', true);</script>`;
  } else {
    fieldMarkup = getButtonMarkup({ isLabelInside, placeholder, disabled });
    scriptMarkup = `<script id="script-tl-dropdown-button-demo">(${dropdownScript.toString()})('tl-dropdown-button-demo', false);</script>`;
  }

  const labelOutsideClass = labelPlacement === 'Outside' ? ' tl-dropdown--label-outside' : '';
  return formatHtmlPreview(`
    <div class="demo-wrapper">
      <div class="tl-dropdown tl-dropdown--${normalizedSize}${error ? ' tl-dropdown--error' : ''}${
    disabled ? ' tl-dropdown--disabled' : ''
  }${isLabelInside ? ' tl-dropdown--label-inside' : ''}${
    !showLabel ? ' tl-dropdown--no-label' : ''
  }${labelOutsideClass}${multiselect ? ' tl-dropdown--multiselect' : ''} ${modeClass}">
        ${labelMarkup}
        ${fieldMarkup}
        ${helperMarkup}
      </div>
      ${scriptMarkup}
    </div>
  `);
};

export const Default = Template.bind({});
