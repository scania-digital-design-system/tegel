function setupOptionTabindex(
  container: HTMLElement,
  selector = '.tl-dropdown__option',
  disableCheckboxes = false,
) {
  container.querySelectorAll<HTMLElement>(selector).forEach((option) => {
    const isDisabled = option.classList.contains('tl-dropdown__option--disabled');
    option.setAttribute('tabindex', isDisabled ? '-1' : '0');

    if (disableCheckboxes) {
      const checkbox = option.querySelector<HTMLInputElement>('.tl-checkbox__input');
      if (checkbox) checkbox.setAttribute('tabindex', '-1');
    }
  });
}

function setupClickOutside(root: HTMLElement, closeCallback: () => void) {
  document.addEventListener('click', (e) => {
    if (!root.contains(e.target as Node)) closeCallback();
  });

  root.addEventListener('focusout', (e: FocusEvent) => {
    setTimeout(() => {
      if (!root.contains(e.relatedTarget as Node)) closeCallback();
    }, 20);
  });
}

function handleKeyboardSelection(
  e: KeyboardEvent,
  selector: string,
  callback: (option: HTMLElement) => void,
) {
  if (e.key === 'Enter' || e.key === ' ') {
    const focusedOption = document.activeElement?.closest<HTMLElement>(selector);
    if (focusedOption) {
      e.preventDefault();
      callback(focusedOption);
    }
  }
}

export function tlDropdownSingleScript(menuId: string): void {
  const list = document.getElementById(menuId);
  if (!list) return;

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const button = root?.querySelector<HTMLElement>('.tl-dropdown__button');
  const textDisplay = root?.querySelector<HTMLElement>('.tl-dropdown__text');
  if (!root || !button) return;

  setupOptionTabindex(list);

  const toggleDropdown = () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  };

  const closeDropdown = () => button.setAttribute('aria-expanded', 'false');

  const selectOption = (selectedOption: HTMLElement) => {
    list.querySelectorAll('.tl-dropdown__option').forEach((option) => {
      option.classList.remove('tl-dropdown__option--selected');
    });

    selectedOption.classList.add('tl-dropdown__option--selected');
    if (textDisplay) textDisplay.textContent = selectedOption.textContent?.trim() || '';

    closeDropdown();
    button.focus();
  };

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  setupClickOutside(root, closeDropdown);

  list.addEventListener('click', (e) => {
    const clickedOption = (e.target as HTMLElement).closest<HTMLElement>(
      '.tl-dropdown__option:not(.tl-dropdown__option--disabled)',
    );
    if (clickedOption) selectOption(clickedOption);
  });

  list.addEventListener('keydown', (e) =>
    handleKeyboardSelection(
      e,
      '.tl-dropdown__option:not(.tl-dropdown__option--disabled)',
      selectOption,
    ),
  );
}

export function tlDropdownMultiScript(menuId: string): void {
  const list = document.getElementById(menuId);
  if (!list) return;

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const button = root?.querySelector<HTMLElement>('.tl-dropdown__button');
  const textDisplay = root?.querySelector<HTMLElement>('.tl-dropdown__text');
  if (!root || !button) return;

  setupOptionTabindex(list, '.tl-dropdown__option', true);

  const toggleDropdown = () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  };

  const closeDropdown = () => button.setAttribute('aria-expanded', 'false');

  const updateDisplay = () => {
    const selectedLabels = Array.from(
      list.querySelectorAll<HTMLInputElement>('.tl-checkbox__input:checked'),
    )
      .map((checkbox) => {
        const label = checkbox
          .closest('.tl-dropdown__option')
          ?.querySelector('.tl-checkbox__label');
        return label?.textContent?.trim() || '';
      })
      .filter(Boolean);

    if (textDisplay) textDisplay.textContent = selectedLabels.join(', ');
  };

  const handleOptionToggle = (option: HTMLElement) => {
    const checkbox = option.querySelector<HTMLInputElement>('.tl-checkbox__input');
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      option.classList.toggle('tl-dropdown__option--selected', checkbox.checked);
      updateDisplay();

      const changeEvent = new Event('change', { bubbles: true });
      checkbox.dispatchEvent(changeEvent);
    }
  };

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  setupClickOutside(root, closeDropdown);

  list.addEventListener('click', (e) => {
    const clickedOption = (e.target as HTMLElement).closest<HTMLElement>(
      '.tl-dropdown__option:not(.tl-dropdown__option--disabled)',
    );
    if (clickedOption) {
      e.preventDefault();
      handleOptionToggle(clickedOption);
    }
  });

  list.addEventListener('keydown', (e) =>
    handleKeyboardSelection(
      e,
      '.tl-dropdown__option:not(.tl-dropdown__option--disabled)',
      handleOptionToggle,
    ),
  );
}

export function tlDropdownFilterSingleScript(listId: string, inputId: string): void {
  const list = document.getElementById(listId) as HTMLElement | null;
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  if (!list || !input) return;

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const inputWrapper = input.parentElement;
  const clearButton = inputWrapper?.querySelector(
    '.tl-dropdown__input-clear',
  ) as HTMLButtonElement | null;

  const noResultMessage = list.querySelector(
    '.tl-dropdown__option--no-result',
  ) as HTMLElement | null;
  const options = Array.from(
    list.querySelectorAll<HTMLElement>('.tl-dropdown__option:not(.tl-dropdown__option--no-result)'),
  );

  setupOptionTabindex(list, '.tl-dropdown__option:not(.tl-dropdown__option--no-result)');
  if (noResultMessage) noResultMessage.setAttribute('tabindex', '-1');

  let selectedValue = '';

  const openDropdown = () => input.setAttribute('aria-expanded', 'true');
  const closeDropdown = () => input.setAttribute('aria-expanded', 'false');

  const updateClearButtonTabindex = () => {
    const isVisible = input.getAttribute('aria-expanded') === 'true' && input.value.trim() !== '';
    clearButton?.setAttribute('tabindex', isVisible ? '0' : '-1');
  };

  const filterOptions = () => {
    const searchQuery = input.value.toLowerCase().trim();
    let visibleCount = 0;

    options.forEach((option) => {
      const optionText = option.textContent?.trim() || '';
      const isVisible = !searchQuery || optionText.toLowerCase().includes(searchQuery);
      option.style.display = isVisible ? '' : 'none';
      if (isVisible) visibleCount++;
    });

    const showNoResults = !!searchQuery && visibleCount === 0;
    if (noResultMessage) {
      noResultMessage.style.display = showNoResults ? '' : 'none';
    }
  };

  const selectOption = (selectedOption: HTMLElement) => {
    options.forEach((option) => {
      option.classList.remove('tl-dropdown__option--selected');
    });

    selectedOption.classList.add('tl-dropdown__option--selected');
    selectedValue = selectedOption.textContent?.trim() || '';
    input.value = selectedValue;
    input.blur();
  };

  const handleClearButton = () => {
    selectedValue = '';
    input.value = '';
    input.focus();
    filterOptions();
    updateClearButtonTabindex();
  };

  clearButton?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleClearButton();
  });

  inputWrapper?.addEventListener('mousedown', (e) => {
    const target = e.target as HTMLElement;
    if (target === input || target.closest('.tl-dropdown__input-clear')) return;

    e.preventDefault();
    e.stopPropagation();
    const isOpen = input.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      closeDropdown();
      input.blur();
    } else {
      openDropdown();
      input.focus();
      filterOptions();
    }
  });

  input.addEventListener('focus', () => {
    openDropdown();
    if (selectedValue) input.value = '';
    filterOptions();
    updateClearButtonTabindex();
  });

  input.addEventListener('input', () => {
    filterOptions();
    updateClearButtonTabindex();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') updateClearButtonTabindex();
  });

  list.addEventListener('click', (e) => {
    const clickedOption = (e.target as HTMLElement).closest<HTMLElement>(
      '.tl-dropdown__option:not(.tl-dropdown__option--no-result):not(.tl-dropdown__option--disabled)',
    );
    if (clickedOption) {
      e.preventDefault();
      selectOption(clickedOption);
    }
  });

  root?.addEventListener('focusout', (e: FocusEvent) => {
    setTimeout(() => {
      const newFocus = (e.relatedTarget as Node) || document.activeElement;
      const isClearButton = clearButton && newFocus === clearButton;

      if (!root.contains(newFocus) && !isClearButton) {
        closeDropdown();
        if (selectedValue) input.value = selectedValue;
      }
    }, 20);
  });

  filterOptions();
  updateClearButtonTabindex();
}

export function tlDropdownFilterMultiScript(listId: string, inputId: string): void {
  const list = document.getElementById(listId) as HTMLElement | null;
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  if (!list || !input) return;

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const inputWrapper = input.parentElement;
  const clearButton = inputWrapper?.querySelector(
    '.tl-dropdown__input-clear',
  ) as HTMLButtonElement | null;

  const options = Array.from(list.querySelectorAll<HTMLElement>('.tl-dropdown__option'));

  setupOptionTabindex(list, '.tl-dropdown__option', true);

  const openDropdown = () => input.setAttribute('aria-expanded', 'true');
  const closeDropdown = () => input.setAttribute('aria-expanded', 'false');

  const updateClearButtonTabindex = () => {
    const isVisible = input.getAttribute('aria-expanded') === 'true' && input.value.trim() !== '';
    clearButton?.setAttribute('tabindex', isVisible ? '0' : '-1');
  };

  const getSelectedValues = () => {
    const selectedLabels = Array.from(
      list.querySelectorAll<HTMLInputElement>('.tl-checkbox__input:checked'),
    )
      .map((checkbox) => {
        const label = checkbox
          .closest('.tl-dropdown__option')
          ?.querySelector('.tl-checkbox__label');
        return label?.textContent?.trim() || '';
      })
      .filter(Boolean);
    return selectedLabels.join(', ');
  };

  const filterOptions = () => {
    const searchQuery = input.value.toLowerCase().trim();
    options.forEach((option) => {
      const optionText = option.textContent?.trim() || '';
      const isVisible = !searchQuery || optionText.toLowerCase().includes(searchQuery);
      option.style.display = isVisible ? '' : 'none';
    });
  };

  const updateDisplay = () => {
    input.value = getSelectedValues();
    updateClearButtonTabindex();
  };

  const handleClearButton = () => {
    list.querySelectorAll<HTMLInputElement>('.tl-checkbox__input:checked').forEach((cb) => {
      cb.checked = false;
      cb.closest('.tl-dropdown__option')?.classList.remove('tl-dropdown__option--selected');
    });
    input.value = '';
    input.focus();
    filterOptions();
    updateClearButtonTabindex();
  };

  const handleOptionToggle = (option: HTMLElement) => {
    const checkbox = option.querySelector<HTMLInputElement>('.tl-checkbox__input');
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      option.classList.toggle('tl-dropdown__option--selected', checkbox.checked);
      updateDisplay();

      const changeEvent = new Event('change', { bubbles: true });
      checkbox.dispatchEvent(changeEvent);
    }
  };

  clearButton?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleClearButton();
  });

  inputWrapper?.addEventListener('mousedown', (e) => {
    const target = e.target as HTMLElement;
    if (target === input || target.closest('.tl-dropdown__input-clear')) return;

    e.preventDefault();
    e.stopPropagation();
    const isOpen = input.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      closeDropdown();
      input.blur();
    } else {
      openDropdown();
      input.focus();
      filterOptions();
    }
  });

  input.addEventListener('focus', () => {
    openDropdown();
    const selectedText = getSelectedValues();
    if (selectedText) input.value = '';
    filterOptions();
    updateClearButtonTabindex();
  });

  input.addEventListener('input', () => {
    filterOptions();
    updateClearButtonTabindex();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') updateClearButtonTabindex();
  });

  list.addEventListener('click', (e) => {
    const clickedOption = (e.target as HTMLElement).closest<HTMLElement>(
      '.tl-dropdown__option:not(.tl-dropdown__option--disabled)',
    );
    if (clickedOption) {
      e.preventDefault();
      handleOptionToggle(clickedOption);
    }
  });

  list.addEventListener('keydown', (e) =>
    handleKeyboardSelection(
      e,
      '.tl-dropdown__option:not(.tl-dropdown__option--disabled)',
      handleOptionToggle,
    ),
  );

  root?.addEventListener('focusout', (e: FocusEvent) => {
    setTimeout(() => {
      const newFocus = (e.relatedTarget as Node) || document.activeElement;
      const isClearButton = clearButton && newFocus === clearButton;

      if (!root.contains(newFocus) && !isClearButton) {
        closeDropdown();
        input.value = getSelectedValues();
      }
    }, 20);
  });

  filterOptions();
  updateClearButtonTabindex();
}
