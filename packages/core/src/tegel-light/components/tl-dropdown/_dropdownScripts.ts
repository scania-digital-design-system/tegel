// ============================================================================
// Single-select button dropdown
// Note: Requires additional SCSS for styling
// ============================================================================
export function tlDropdownSingleScript(menuId: string): void {
  const list = document.getElementById(menuId);
  if (!list) return;

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const button = root?.querySelector<HTMLElement>('.tl-dropdown__button');
  const valueDisplay = root?.querySelector<HTMLElement>('.tl-dropdown__button-value');
  if (!root || !button) return;

  // State management
  const toggleDropdown = () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  };

  const closeDropdown = () => {
    button.setAttribute('aria-expanded', 'false');
  };

  const selectOption = (selectedOption: HTMLElement) => {
    list.querySelectorAll('.tl-dropdown__option').forEach((option) => {
      option.classList.remove('tl-dropdown__option--selected');
    });

    selectedOption.classList.add('tl-dropdown__option--selected');

    if (valueDisplay) valueDisplay.textContent = selectedOption.textContent?.trim() || '';

    closeDropdown();
    button.focus();
  };

  // Event listeners
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  document.addEventListener('click', (e) => {
    if (!root.contains(e.target as Node)) closeDropdown();
  });

  root.addEventListener('focusout', (e: FocusEvent) => {
    setTimeout(() => {
      if (!root.contains(e.relatedTarget as Node)) closeDropdown();
    }, 20);
  });

  list.addEventListener('mousedown', (e) => {
    const clickedOption = (e.target as HTMLElement).closest<HTMLElement>(
      '.tl-dropdown__option:not(.tl-dropdown__option--disabled)',
    );
    if (clickedOption) {
      e.preventDefault();
      selectOption(clickedOption);
    }
  });

  list.addEventListener('click', (e) => {
    const clickedOption = (e.target as HTMLElement).closest<HTMLElement>(
      '.tl-dropdown__option:not(.tl-dropdown__option--disabled)',
    );
    if (clickedOption) selectOption(clickedOption);
  });
}

// ============================================================================
// Multi-select button dropdown
// Note: Requires additional SCSS for styling (tl-checkbox)
// ============================================================================
export function tlDropdownMultiScript(menuId: string): void {
  const list = document.getElementById(menuId);
  if (!list) return;

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const button = root?.querySelector<HTMLElement>('.tl-dropdown__button');
  const valueDisplay = root?.querySelector<HTMLElement>('.tl-dropdown__button-value');
  if (!root || !button) return;

  // State management
  const toggleDropdown = () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  };

  const closeDropdown = () => {
    button.setAttribute('aria-expanded', 'false');
  };

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

    if (valueDisplay) valueDisplay.textContent = selectedLabels.join(', ');
  };

  // Event listeners
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  document.addEventListener('click', (e) => {
    if (!root.contains(e.target as Node)) closeDropdown();
  });

  root.addEventListener('focusout', (e: FocusEvent) => {
    setTimeout(() => {
      if (!root.contains(e.relatedTarget as Node)) closeDropdown();
    }, 20);
  });

  list.addEventListener('mousedown', (e) => {
    const clickedOption = (e.target as HTMLElement).closest<HTMLElement>(
      '.tl-dropdown__option:not(.tl-dropdown__option--disabled)',
    );
    const checkbox = clickedOption?.querySelector<HTMLInputElement>('.tl-checkbox__input');

    if (checkbox) {
      e.preventDefault();
      checkbox.checked = !checkbox.checked;
      clickedOption.classList.toggle('tl-dropdown__option--selected', checkbox.checked);
      updateDisplay();
    }
  });

  list.addEventListener('click', (e) => {
    const checkbox = (e.target as HTMLElement).closest<HTMLInputElement>('.tl-checkbox__input');
    if (checkbox) {
      e.stopPropagation();
      updateDisplay();
    }
  });
}

// ============================================================================
// Single-select filter dropdown
// Note: Requires additional SCSS for styling
// ============================================================================
export function tlDropdownFilterSingleScript(listId: string, inputId: string): void {
  // Get elements
  const list = document.getElementById(listId) as HTMLElement | null;
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  if (!list || !input) return;

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const chevron = input.parentElement?.querySelector('.tl-dropdown__chevron') as HTMLElement | null;
  const clearButton = input.parentElement?.querySelector(
    '.tl-dropdown__input-clear',
  ) as HTMLElement | null;
  const noResultMessage = list.querySelector(
    '.tl-dropdown__option--no-result',
  ) as HTMLElement | null;
  const options = Array.from(
    list.querySelectorAll<HTMLElement>('.tl-dropdown__option:not(.tl-dropdown__option--no-result)'),
  );

  // State
  let selectedValue = '';

  // Helper functions
  const openDropdown = () => input.setAttribute('aria-expanded', 'true');
  const closeDropdown = () => input.setAttribute('aria-expanded', 'false');

  const updateClearButtonState = () => {
    const hasContent = input.value.trim() || selectedValue;
    const isVisible = clearButton?.offsetParent !== null;
    clearButton?.setAttribute('tabindex', isVisible && hasContent ? '0' : '-1');
  };

  const filterOptions = () => {
    const searchQuery = input.value.toLowerCase().trim();
    let visibleCount = 0;

    options.forEach((option) => {
      const optionText = option.textContent?.trim() || '';
      const isVisible = !searchQuery || optionText.toLowerCase().includes(searchQuery);
      option.classList.toggle('tl-dropdown__option--visible', isVisible);
      if (isVisible) visibleCount++;
    });

    // Show "no results" message if searching with no matches
    const showNoResults = !!searchQuery && visibleCount === 0;
    noResultMessage?.classList.toggle('tl-dropdown__option--visible', showNoResults);
  };

  const selectOption = (selectedOption: HTMLElement) => {
    options.forEach((option) => {
      option.classList.remove('tl-dropdown__option--selected');
    });

    selectedOption.classList.add('tl-dropdown__option--selected');

    selectedValue = selectedOption.textContent?.trim() || '';
    input.value = selectedValue;
    updateClearButtonState();
    input.blur();
  };

  // Event listeners - Clear button
  clearButton?.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    selectedValue = '';
    input.value = '';
    input.focus();
    filterOptions();
    updateClearButtonState();
  });

  // Event listeners - Chevron
  chevron?.addEventListener('mousedown', (e) => {
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

  // Event listeners - Input
  input.addEventListener('focus', () => {
    openDropdown();
    if (selectedValue) input.value = ''; // Clear to allow filtering
    filterOptions();
    updateClearButtonState();
  });

  input.addEventListener('input', () => {
    filterOptions();
    updateClearButtonState();
  });

  // Event listeners - Options
  list.addEventListener('mousedown', (e) => {
    const clickedOption = (e.target as HTMLElement).closest<HTMLElement>(
      '.tl-dropdown__option:not(.tl-dropdown__option--no-result):not(.tl-dropdown__option--disabled)',
    );
    if (clickedOption) {
      e.preventDefault();
      selectOption(clickedOption);
    }
  });

  // Event listeners - Focus management
  root?.addEventListener('focusout', (e: FocusEvent) => {
    setTimeout(() => {
      const newFocus = (e.relatedTarget as Node) || document.activeElement;
      if (!root.contains(newFocus)) {
        closeDropdown();
        if (selectedValue) input.value = selectedValue; // Restore selected value
        updateClearButtonState();
      }
    }, 20);
  });

  // Initialize
  filterOptions();
}

// ============================================================================
// Multi-select filter dropdown
// Note: Requires additional SCSS for styling (tl-checkbox)
// ============================================================================
export function tlDropdownFilterMultiScript(listId: string, inputId: string): void {
  const list = document.getElementById(listId) as HTMLElement | null;
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  if (!list || !input) return;

  const root = list.closest('.tl-dropdown') as HTMLElement | null;
  const chevron = input.parentElement?.querySelector('.tl-dropdown__chevron') as HTMLElement | null;
  const clearButton = input.parentElement?.querySelector(
    '.tl-dropdown__input-clear',
  ) as HTMLElement | null;
  const options = Array.from(list.querySelectorAll<HTMLElement>('.tl-dropdown__option'));

  const openDropdown = () => input.setAttribute('aria-expanded', 'true');
  const closeDropdown = () => input.setAttribute('aria-expanded', 'false');

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

  const updateClearButtonState = () => {
    const hasContent = input.value.trim() || getSelectedValues();
    const isVisible = clearButton?.offsetParent !== null;
    clearButton?.setAttribute('tabindex', isVisible && hasContent ? '0' : '-1');
  };

  const filterOptions = () => {
    const searchQuery = input.value.toLowerCase().trim();
    options.forEach((option) => {
      const optionText = option.textContent?.trim() || '';
      const isVisible = !searchQuery || optionText.toLowerCase().includes(searchQuery);
      option.classList.toggle('tl-dropdown__option--visible', isVisible);
    });
  };

  const updateDisplay = () => {
    input.value = getSelectedValues();
    updateClearButtonState();
  };

  clearButton?.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    list.querySelectorAll<HTMLInputElement>('.tl-checkbox__input:checked').forEach((cb) => {
      cb.checked = false;
      cb.closest('.tl-dropdown__option')?.classList.remove('tl-dropdown__option--selected');
    });
    input.value = '';
    input.focus();
    filterOptions();
    updateClearButtonState();
  });

  chevron?.addEventListener('mousedown', (e) => {
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
    updateClearButtonState();
  });

  input.addEventListener('input', () => {
    filterOptions();
    updateClearButtonState();
  });

  list.addEventListener('mousedown', (e) => {
    const clickedOption = (e.target as HTMLElement).closest<HTMLElement>(
      '.tl-dropdown__option:not(.tl-dropdown__option--disabled)',
    );
    const checkbox = clickedOption?.querySelector<HTMLInputElement>('.tl-checkbox__input');

    if (checkbox) {
      e.preventDefault();
      checkbox.checked = !checkbox.checked;
      clickedOption.classList.toggle('tl-dropdown__option--selected', checkbox.checked);
      updateDisplay();
    }
  });

  list.addEventListener('click', (e) => {
    const checkbox = (e.target as HTMLElement).closest<HTMLInputElement>('.tl-checkbox__input');
    if (checkbox) {
      e.stopPropagation();
      updateDisplay();
    }
  });

  root?.addEventListener('focusout', (e: FocusEvent) => {
    setTimeout(() => {
      const newFocus = (e.relatedTarget as Node) || document.activeElement;
      if (!root.contains(newFocus)) {
        closeDropdown();
        input.value = getSelectedValues();
        updateClearButtonState();
      }
    }, 20);
  });

  filterOptions();
}
