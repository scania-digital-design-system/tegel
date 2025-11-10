let initialized = false;

export function initDropdownKeyboard() {
  if (initialized) return;
  initialized = true;

  const handleOpenListKeydown = (e: KeyboardEvent) => {
    const openList = document.querySelector('.tl-dropdown__list--open');
    if (!openList) return;

    const root = openList.closest('.tl-dropdown');
    const trigger =
      root?.querySelector('[data-dropdown-toggle]') || root?.querySelector('.tl-dropdown__input');

    const isDropUp = root?.classList.contains('tl-dropdown--dropup');
    const isMulti = openList.getAttribute('aria-multiselectable') === 'true';

    const options = Array.from(
      openList.querySelectorAll('.tl-dropdown__option.tl-dropdown__option--visible'),
    ).filter((li) => !(li as HTMLElement).classList.contains('tl-dropdown__option--disabled'));

    if (!options.length) return;
    const active = document.activeElement;
    const currentIdx = options.findIndex((o) => o === active);

    const focusOption = (idx: number) => {
      if (idx < 0 || idx >= options.length) return;
      options.forEach((opt, i) => {
        (opt as HTMLElement).setAttribute('tabindex', i === idx ? '0' : '-1');
      });
      (options[idx] as HTMLElement).focus();
    };

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();

      const direction = e.key === 'ArrowDown' ? 1 : -1;
      let nextIdx = currentIdx;

      if (currentIdx === -1) {
        if (e.key === 'ArrowDown') {
          nextIdx = isDropUp ? options.length - 1 : 0;
        } else {
          nextIdx = isDropUp ? 0 : options.length - 1;
        }
      } else {
        nextIdx = currentIdx + (isDropUp ? -direction : direction);
      }

      if (nextIdx >= options.length) nextIdx = 0;
      if (nextIdx < 0) nextIdx = options.length - 1;

      focusOption(nextIdx);
      return;
    }

    /* Enter or Space = select/toggle */
    if (e.key === 'Enter' || e.key === ' ') {
      const option = options[currentIdx];
      if (!option) return;

      e.preventDefault();

      if (isMulti) {
        const checkbox = option.querySelector('.tl-checkbox__input') as HTMLInputElement | null;
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          option.classList.toggle('tl-dropdown__option--selected', checkbox.checked);
          checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
      } else {
        (option as HTMLElement).click();
        openList.classList.remove('tl-dropdown__list--open');
        (trigger as HTMLElement | null)?.focus();
      }
      return;
    }

    /* Tab / Shift+Tab */
    if (e.key === 'Tab') {
      e.preventDefault();

      const forward = isDropUp ? e.shiftKey : !e.shiftKey;
      const nextIdx = forward ? currentIdx + 1 : currentIdx - 1;

      if (nextIdx >= options.length) {
        openList.classList.remove('tl-dropdown__list--open');
        (trigger as HTMLElement | null)?.focus();
        return;
      }
      if (nextIdx < 0) {
        (trigger as HTMLElement | null)?.focus();
        return;
      }
      focusOption(nextIdx);
      return;
    }

    /* Escape = close */
    if (e.key === 'Escape') {
      e.preventDefault();
      openList.classList.remove('tl-dropdown__list--open');
      (trigger as HTMLElement | null)?.focus();
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

    const options = Array.from(
      list.querySelectorAll('.tl-dropdown__option.tl-dropdown__option--visible'),
    ).filter((li) => !li.classList.contains('tl-dropdown__option--disabled'));

    if (!options.length) return;

    if (
      (e.key === 'ArrowDown' || e.key === 'ArrowUp') &&
      !list.classList.contains('tl-dropdown__list--open')
    ) {
      e.preventDefault();
      list.classList.add('tl-dropdown__list--open');

      let firstIdx = 0;
      if (isDropUp) {
        firstIdx = options.length - 1;
      }

      options.forEach((opt, i) => {
        (opt as HTMLElement).setAttribute('tabindex', i === firstIdx ? '0' : '-1');
      });
      (options[firstIdx] as HTMLElement).focus();
    }
  };

  document.addEventListener('keydown', handleOpenListKeydown);
  document.addEventListener('keydown', handleTriggerKeydown);
}
