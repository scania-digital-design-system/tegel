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
    const openTrigger = document.querySelector(
      '.tl-dropdown__button[aria-expanded="true"], .tl-dropdown__input[aria-expanded="true"]',
    );
    if (!openTrigger) return;

    const root = openTrigger.closest('.tl-dropdown');
    const openList = root?.querySelector('.tl-dropdown__list');
    if (!openList) return;
    const isDropUp = root?.classList.contains('tl-dropdown--dropup');
    const isMultiSelect = openList.getAttribute('aria-multiselectable') === 'true';
    const isFilterDropdown = !!root?.querySelector('.tl-dropdown__input');

    const options = Array.from(openList.querySelectorAll('.tl-dropdown__option')).filter(
      (option) => {
        const el = option as HTMLElement;
        return (
          !el.classList.contains('tl-dropdown__option--disabled') &&
          !el.classList.contains('tl-dropdown__option--no-result') &&
          el.style.display !== 'none'
        );
      },
    );

    if (!options.length) return;

    const { activeElement } = document;
    const currentIndex = options.findIndex((option) => option === activeElement);

    const focusOption = (index: number) => {
      if (index < 0 || index >= options.length) return;
      (options[index] as HTMLElement).focus();
    };

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();

      if (isFilterDropdown && activeElement === openTrigger) {
        const isArrowDown = e.key === 'ArrowDown';
        const firstIndex = isArrowDown
          ? isDropUp
            ? options.length - 1
            : 0
          : isDropUp
          ? 0
          : options.length - 1;
        focusOption(firstIndex);
        return;
      }

      const direction = e.key === 'ArrowDown' ? 1 : -1;
      let nextIndex = currentIndex;

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
        nextIndex = currentIndex + (isDropUp ? -direction : direction);
      }

      if (nextIndex >= options.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = options.length - 1;

      focusOption(nextIndex);
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      const focusedOption = options[currentIndex];
      if (!focusedOption) return;

      if (isMultiSelect) return;

      e.preventDefault();
      (focusedOption as HTMLElement).click();
      if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');

      if (!isFilterDropdown) {
        (openTrigger as HTMLElement | null)?.focus();
      }
      return;
    }

    if (e.key === 'Tab') {
      if (isFilterDropdown) {
        const inputWrapper = openTrigger.parentElement;
        const clearButton = inputWrapper?.querySelector(
          '.tl-dropdown__input-clear',
        ) as HTMLButtonElement | null;
        const clearButtonTabindex = clearButton?.getAttribute('tabindex');
        const canFocusClearButton = clearButton && clearButtonTabindex === '0';

        if (currentIndex >= 0) {
          if (!e.shiftKey && canFocusClearButton) {
            e.preventDefault();
            clearButton?.focus();
            return;
          }
          return;
        }
        return;
      }

      e.preventDefault();
      const movingForward = isDropUp ? e.shiftKey : !e.shiftKey;
      const nextIndex = movingForward ? currentIndex + 1 : currentIndex - 1;

      if (nextIndex >= options.length || nextIndex < 0) {
        if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');
        (openTrigger as HTMLElement | null)?.focus();
        return;
      }

      focusOption(nextIndex);
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');
      (openTrigger as HTMLElement | null)?.focus();
    }
  };

  const handleTriggerKeydown = (e: KeyboardEvent) => {
    const trigger = (e.target as Element | null)?.closest(
      '.tl-dropdown__button, .tl-dropdown__input',
    );
    if (!trigger) return;

    const root = trigger.closest('.tl-dropdown');
    const list = root?.querySelector('.tl-dropdown__list');
    if (!list) return;

    const isDropUp = root?.classList.contains('tl-dropdown--dropup');
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    const options = Array.from(list.querySelectorAll('.tl-dropdown__option')).filter((option) => {
      const el = option as HTMLElement;
      return !el.classList.contains('tl-dropdown__option--disabled') && el.style.display !== 'none';
    });

    if (!options.length) return;

    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !isOpen) {
      e.preventDefault();
      (trigger as HTMLElement).setAttribute('aria-expanded', 'true');
      const firstIndex = isDropUp ? options.length - 1 : 0;
      (options[firstIndex] as HTMLElement).focus();
    }
  };

  const handleClearButtonKeydown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('tl-dropdown__input-clear')) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      target.click();
    }

    if (e.key === 'Tab' && e.shiftKey) {
      const root = target.closest('.tl-dropdown');
      const list = root?.querySelector('.tl-dropdown__list');

      if (list) {
        const options = Array.from(list.querySelectorAll('.tl-dropdown__option')).filter(
          (option) => {
            const el = option as HTMLElement;
            return (
              !el.classList.contains('tl-dropdown__option--disabled') &&
              !el.classList.contains('tl-dropdown__option--no-result') &&
              el.style.display !== 'none'
            );
          },
        );

        if (options.length > 0) {
          e.preventDefault();
          (options[options.length - 1] as HTMLElement).focus();
        }
      }
    }
  };

  const handleClearButtonFocus = (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('tl-dropdown__input-clear')) return;

    const input = target
      .closest('.tl-dropdown__input-wrapper')
      ?.querySelector('.tl-dropdown__input') as HTMLInputElement;
    if (input) {
      input.setAttribute('aria-expanded', 'true');
    }
  };

  document.addEventListener('keydown', handleOpenListKeydown);
  document.addEventListener('keydown', handleTriggerKeydown);
  document.addEventListener('keydown', handleClearButtonKeydown);
  document.addEventListener('focus', handleClearButtonFocus, true);
}
