import formatHtmlPreview from '../../../stories/formatHtmlPreview';

function dropdownSelectScript(dropdownId: string): void {
  const select = document.getElementById(dropdownId) as HTMLSelectElement | null;
  if (!select) return;

  const parent = select.closest('.tl-dropdown');
  const chevron = parent?.querySelector('.tl-icon--chevron_down') as HTMLElement | null;

  function update() {
    if (!parent) return;
    if (select.value) {
      parent.classList.add('tl-dropdown--has-value');
    } else {
      parent.classList.remove('tl-dropdown--has-value');
    }
  }

  // Handle native select change
  select.addEventListener('change', update);

  // Handle focus/blur for chevron rotation (visual feedback)
  select.addEventListener('focus', () => {
    if (chevron) chevron.classList.add('tl-icon--chevron_down--rotated');
  });

  select.addEventListener('blur', () => {
    if (chevron) chevron.classList.remove('tl-icon--chevron_down--rotated');
  });

  // Initial update
  update();
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
      if (chevron) chevron.classList.remove('tl-icon--chevron_down--rotated');
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
    chevron = btn?.querySelector('.tl-icon--chevron_down') as HTMLElement | null;
    if (btn && list && chevron) {
      if (!btn.hasAttribute('data-dropdown-listener')) {
        btn.setAttribute('data-dropdown-listener', 'true');
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const expanded = btn.classList.contains('tl-dropdown__button--expanded');
          if (!expanded) {
            btn.classList.add('tl-dropdown__button--expanded');
            list.classList.add('tl-dropdown__list--open');
            chevron.classList.add('tl-icon--chevron_down--rotated');
          } else {
            btn.classList.remove('tl-dropdown__button--expanded');
            list.classList.remove('tl-dropdown__list--open');
            chevron.classList.remove('tl-icon--chevron_down--rotated');
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
            chevron.classList.remove('tl-icon--chevron_down--rotated');
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
                chevron.classList.remove('tl-icon--chevron_down--rotated');
              }
            }, 100);
          });
          const checkbox = elem.querySelector('.tl-checkbox__input') as HTMLInputElement | null;
          if (checkbox) {
            checkbox.addEventListener('click', (ev: Event) => {
              ev.stopPropagation();
              toggleOption(elem);
            });
            // Multiselect: also close dropdown on blur from checkbox
            checkbox.addEventListener('blur', () => {
              setTimeout(() => {
                const active = document.activeElement;
                if (!list.contains(active) && active !== btn) {
                  btn.classList.remove('tl-dropdown__button--expanded');
                  list.classList.remove('tl-dropdown__list--open');
                  chevron.classList.remove('tl-icon--chevron_down--rotated');
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
    <select class="tl-dropdown__select" ${ariaLabelAttr}${
    disabled ? ' disabled' : ''
  } id="${selectId}">
      ${placeholderOption}
      ${OPTIONS.map((opt) => `<option value="${opt}">${opt}</option>`).join('')}
    </select>
    <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>
  `;
}

function getMultiselectMarkup({ isLabelInside, placeholder, disabled }) {
  const multiId = 'tl-dropdown-multiselect-demo';
  const optionsMarkup = OPTIONS.map((opt, i) => {
    const checkboxId = `tl-checkbox-${multiId}-${i}`;
    return `
      <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" tabindex="0" data-value="${opt}">
        <span class="tl-dropdown__option-checkbox">
          <div class="tl-checkbox">
            <input type="checkbox" class="tl-checkbox__input" id="${checkboxId}" tabindex="-1" />
            <label class="tl-checkbox__label" for="${checkboxId}" aria-label="${opt}">${opt}</label>
          </div>
        </span>
      </li>`;
  }).join('');
  return `
    <button type="button" class="tl-dropdown__button" aria-haspopup="listbox"${
      disabled ? ' disabled' : ''
    } data-dropdown-toggle="${multiId}">
      <span class="tl-dropdown__button-placeholder${
        !isLabelInside ? ' tl-dropdown__button-placeholder--visible' : ''
      }">${!isLabelInside ? placeholder : ''}</span>
      <span class="tl-dropdown__button-value"></span>
      <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>
    </button>
    <ul class="tl-dropdown__list" id="${multiId}" role="listbox" tabindex="-1">
      ${optionsMarkup}
    </ul>
  `;
}

function getButtonMarkup({ isLabelInside, placeholder, disabled }) {
  const buttonId = 'tl-dropdown-button-demo';
  const optionsMarkup =
    OPTIONS.map(
      (opt) =>
        `<li class="tl-dropdown__option tl-dropdown__option--visible" role="option" tabindex="0" data-value="${opt}">${opt}<span class="tl-icon tl-icon--tick" aria-hidden="true"></span></li>`,
    ).join('') +
    '<li class="tl-dropdown__option tl-dropdown__option--disabled tl-dropdown__option--visible" role="option" tabindex="-1" data-value="Option disabled">Option disabled</li>';
  return `
    <button type="button" class="tl-dropdown__button" aria-haspopup="listbox"${
      disabled ? ' disabled' : ''
    } data-dropdown-toggle="${buttonId}">
      <span class="tl-dropdown__button-placeholder${
        !isLabelInside ? ' tl-dropdown__button-placeholder--visible' : ''
      }">${!isLabelInside ? placeholder : ''}</span>
      <span class="tl-dropdown__button-value"></span>
      <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>
    </button>
    <ul class="tl-dropdown__list" id="${buttonId}" role="listbox" tabindex="-1">
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
  },
  args: {
    modeVariant: 'Primary',
    variant: 'Select',
    multiselect: false,
    size: 'Large',
    label: 'Label',
    labelPlacement: 'Outside',
    placeholder: 'Placeholder',
    helper: 'Helper text',
    showHelper: true,
    error: false,
    disabled: false,
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
  const labelMarkup = showLabel ? getLabelMarkup(label, labelId, isLabelInside) : '';
  const helperMarkup = showHelper && helper ? getHelperMarkup(helper, error) : '';
  let fieldMarkup = '';
  let scriptMarkup = '';
  if (variant === 'Select') {
    fieldMarkup = getSelectMarkup({ isLabelInside, placeholder, showLabel, labelId, disabled });
    scriptMarkup = `<script id="script-tl-dropdown-select-demo">(${dropdownSelectScript.toString()})('tl-dropdown-select-demo');</script>`;
  } else if (variant === 'Filter') {
    // Filter functionality for filter/input variant
    const filterId = 'tl-dropdown-filter-demo';
    let optionsMarkup = '';
    if (multiselect) {
      optionsMarkup = OPTIONS.map((opt, i) => {
        const checkboxId = `tl-checkbox-${filterId}-${i}`;
        return `
          <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" tabindex="0" data-value="${opt}">
            <span class="tl-dropdown__option-checkbox">
              <div class="tl-checkbox">
                <input type="checkbox" class="tl-checkbox__input" id="${checkboxId}" tabindex="-1" />
                <label class="tl-checkbox__label" for="${checkboxId}" aria-label="${opt}">${opt}</label>
              </div>
            </span>
          </li>`;
      }).join('');
    } else {
      optionsMarkup =
        OPTIONS.map(
          (opt) =>
            `<li class="tl-dropdown__option tl-dropdown__option--visible" role="option" tabindex="0" data-value="${opt}">${opt}<span class="tl-icon tl-icon--tick" aria-hidden="true"></span></li>`,
        ).join('') +
        '<li class="tl-dropdown__option tl-dropdown__option--disabled tl-dropdown__option--visible" role="option" tabindex="-1" data-value="Option disabled">Option disabled</li>';
    }
    fieldMarkup = `
      <div class="tl-dropdown__input-wrapper" id="${filterId}-wrapper">
        <input class="tl-dropdown__input" type="text" placeholder="${placeholder}"${
      disabled ? ' disabled' : ''
    } data-dropdown-toggle="${filterId}" />
        <span class="tl-icon tl-icon--cross tl-icon--16 tl-dropdown__icon--cross" aria-hidden="true"></span>
        <span class="tl-dropdown__input--divider"></span>
        <span class="tl-icon tl-icon--chevron_down tl-icon--16 tl-dropdown__chevron" aria-hidden="true"></span>
      </div>
      <ul class="tl-dropdown__list" id="${filterId}" role="listbox" tabindex="-1">
        ${optionsMarkup}
        <li class="tl-dropdown__option tl-dropdown__option--no-result" role="option" tabindex="-1" data-value="No result">No result</li>
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
          chevron.classList.add('tl-icon--chevron_down--rotated');
          isOpen = true;
        }
        function closeDropdown() {
          list.classList.remove('tl-dropdown__list--open');
          chevron.classList.remove('tl-icon--chevron_down--rotated');
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
            chevronClicked = false; // Reset flag
            setHasValueClass(true); // Always add class on focus
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
                input.parentElement?.parentElement?.classList.remove('tl-dropdown--has-value');
                if (selectedValue) {
                  input.value = selectedValue;
                }
              }
            }, 100);
          });
          input.addEventListener('input', () => {
            filterOptions();
            setHasValueClass();
          });
          chevron.addEventListener('mousedown', (e) => {
            console.log('Filter chevron clicked, isOpen:', isOpen);
            e.preventDefault();
            e.stopPropagation();
            chevronClicked = true;
            if (isOpen) {
              console.log('Closing filter dropdown');
              preventBlurClose = true; // Prevent blur from closing dropdown
              closeDropdown();
              input.blur();
            } else {
              console.log('Opening filter dropdown');
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
          // Also set class on initial render
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
  const barMarkup = '<div class="tl-dropdown__bar"></div>';
  return formatHtmlPreview(`
    <div class="demo-wrapper">
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
