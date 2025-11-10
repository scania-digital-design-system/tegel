// ============================================================================
// Dropdown Keyboard Navigation
// Handles arrow keys, Enter, Space, Tab, and Escape for all dropdown variants
// ============================================================================

let initialized = false;

export function initDropdownKeyboard() {
  if (initialized) return;
  initialized = true;

  // ============================================================================
  // Handler for when dropdown list is open
  // ============================================================================
  const handleOpenListKeydown = (e: KeyboardEvent) => {
    const openList = document.querySelector('.tl-dropdown__list--open');
    if (!openList) return;

    // Get context
    const root = openList.closest('.tl-dropdown');
    const trigger =
      root?.querySelector('[data-dropdown-toggle]') || root?.querySelector('.tl-dropdown__input');
    const isDropUp = root?.classList.contains('tl-dropdown--dropup');
    const isMultiSelect = openList.getAttribute('aria-multiselectable') === 'true';
    const isFilterDropdown = !!root?.querySelector('.tl-dropdown__input');

    // Get all visible, enabled options
    const options = Array.from(
      openList.querySelectorAll('.tl-dropdown__option.tl-dropdown__option--visible'),
    ).filter(
      (option) => !(option as HTMLElement).classList.contains('tl-dropdown__option--disabled'),
    );

    if (!options.length) return;

    const { activeElement } = document;
    const currentIndex = options.findIndex((option) => option === activeElement);

    // Helper to focus a specific option
    const focusOption = (index: number) => {
      if (index < 0 || index >= options.length) return;

      options.forEach((option, i) => {
        (option as HTMLElement).setAttribute('tabindex', i === index ? '0' : '-1');
      });
      (options[index] as HTMLElement).focus();
    };

    // Arrow Up/Down - Navigate between options
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();

      const direction = e.key === 'ArrowDown' ? 1 : -1;
      let nextIndex = currentIndex;

      // If no option focused, start at first or last
      if (currentIndex === -1) {
        const isArrowDown = e.key === 'ArrowDown';
        nextIndex = isArrowDown
          ? isDropUp
            ? options.length - 1
            : 0
          : isDropUp
          ? 0
          : options.length - 1;
      } else {
        // Move in direction (reverse for dropup)
        nextIndex = currentIndex + (isDropUp ? -direction : direction);
      }

      // Wrap around
      if (nextIndex >= options.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = options.length - 1;

      focusOption(nextIndex);
      return;
    }

    // Enter or Space - Select/toggle option
    if (e.key === 'Enter' || e.key === ' ') {
      const focusedOption = options[currentIndex];
      if (!focusedOption) return;

      e.preventDefault();

      if (isMultiSelect) {
        // Toggle checkbox
        const checkbox = focusedOption.querySelector(
          '.tl-checkbox__input',
        ) as HTMLInputElement | null;
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          focusedOption.classList.toggle('tl-dropdown__option--selected', checkbox.checked);
          checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
      } else {
        // Select and close
        (focusedOption as HTMLElement).click();
        openList.classList.remove('tl-dropdown__list--open');
        (trigger as HTMLElement | null)?.focus();
      }
      return;
    }

    // Tab - Move to next focusable element
    if (e.key === 'Tab') {
      if (isFilterDropdown) {
        // Filter dropdowns: close and let Tab work naturally
        openList.classList.remove('tl-dropdown__list--open');
        return; // Don't prevent default
      }

      // Button dropdowns: navigate within dropdown or close
      e.preventDefault();

      const movingForward = isDropUp ? e.shiftKey : !e.shiftKey;
      const nextIndex = movingForward ? currentIndex + 1 : currentIndex - 1;

      if (nextIndex >= options.length || nextIndex < 0) {
        // Exit dropdown
        openList.classList.remove('tl-dropdown__list--open');
        (trigger as HTMLElement | null)?.focus();
        return;
      }

      focusOption(nextIndex);
      return;
    }

    // Escape - Close dropdown
    if (e.key === 'Escape') {
      e.preventDefault();
      openList.classList.remove('tl-dropdown__list--open');
      (trigger as HTMLElement | null)?.focus();
    }
  };

  // ============================================================================
  // Handler for when trigger is focused (button or input)
  // ============================================================================
  const handleTriggerKeydown = (e: KeyboardEvent) => {
    const trigger = (e.target as Element | null)?.closest(
      '.tl-dropdown__button, .tl-dropdown__input',
    );
    if (!trigger) return;

    const root = trigger.closest('.tl-dropdown');
    const list = root?.querySelector('.tl-dropdown__list');
    if (!list) return;

    const isDropUp = root?.classList.contains('tl-dropdown--dropup');
    const isOpen = list.classList.contains('tl-dropdown__list--open');

    // Get all visible, enabled options
    const options = Array.from(
      list.querySelectorAll('.tl-dropdown__option.tl-dropdown__option--visible'),
    ).filter((option) => !option.classList.contains('tl-dropdown__option--disabled'));

    if (!options.length) return;

    // Arrow Up/Down - Open dropdown and focus first option
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !isOpen) {
      e.preventDefault();
      list.classList.add('tl-dropdown__list--open');

      // Focus first option (last if dropup)
      const firstIndex = isDropUp ? options.length - 1 : 0;

      options.forEach((option, i) => {
        (option as HTMLElement).setAttribute('tabindex', i === firstIndex ? '0' : '-1');
      });
      (options[firstIndex] as HTMLElement).focus();
    }
  };

  // ============================================================================
  // Handler for clear button keyboard interaction
  // ============================================================================
  const handleClearButtonKeydown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;

    // Only handle if target is the clear button
    if (!target.classList.contains('tl-dropdown__input-clear')) return;

    // Enter or Space - Clear the input
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();

      // Trigger click to reuse existing clear logic
      target.click();
    }
  };

  // ============================================================================
  // Handler for clear button focus - opens dropdown
  // ============================================================================
  const handleClearButtonFocus = (e: FocusEvent) => {
    const target = e.target as HTMLElement;

    // Only handle if target is the clear button
    if (!target.classList.contains('tl-dropdown__input-clear')) return;

    // Find the input and open dropdown
    const input = target
      .closest('.tl-dropdown__input-wrapper')
      ?.querySelector('.tl-dropdown__input') as HTMLInputElement;
    if (input) {
      input.setAttribute('aria-expanded', 'true');
    }
  };

  // Register event listeners
  document.addEventListener('keydown', handleOpenListKeydown);
  document.addEventListener('keydown', handleTriggerKeydown);
  document.addEventListener('keydown', handleClearButtonKeydown);
  document.addEventListener('focus', handleClearButtonFocus, true);
}
