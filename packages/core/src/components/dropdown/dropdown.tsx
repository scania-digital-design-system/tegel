import {
  Component,
  Host,
  h,
  Element,
  State,
  Event,
  Listen,
  Method,
  Prop,
  Watch,
  EventEmitter,
} from '@stencil/core';
import findNextFocusableElement from '../../utils/findNextFocusableElement';
import findPreviousFocusableElement from '../../utils/findPreviousFocusableElement';
import appendHiddenInput from '../../utils/appendHiddenInput';
import { convertToString, convertArrayToStrings } from '../../utils/convertToString';
import generateUniqueId from '../../utils/generateUniqueId';

function hasValueChanged(newValue: string[], currentValue: string[]): boolean {
  if (newValue.length !== currentValue.length) return true;
  return newValue.some((val) => !currentValue.includes(val));
}

/**
 * @slot <default> - <b>Unnamed slot.</b> For dropdown option elements.
 */
@Component({
  tag: 'tds-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true,
})
export class TdsDropdown {
  @Element() host!: HTMLElement;

  /** Name for the Dropdowns input element. */
  @Prop() name?: string;

  /** Sets the Dropdown in a disabled state */
  @Prop() disabled: boolean = false;

  /** Helper text for the Dropdown. */
  @Prop() helper?: string;

  /** Label text for the Dropdown. */
  @Prop() label?: string;

  /** Label text position */
  @Prop() labelPosition?: 'inside' | 'outside';

  /** Mode variant of the component, based on current mode. */
  @Prop() modeVariant: 'primary' | 'secondary' | null = null;

  /** The direction the Dropdown should open, auto if not specified. */
  @Prop() openDirection: 'up' | 'down' | 'auto' = 'auto';

  /** Placeholder text for the Dropdown. */
  @Prop() placeholder?: string;

  /** The size of the Dropdown. */
  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  @Prop() animation: 'none' | 'slide' = 'slide';

  /** Sets the Dropdown in an error state */
  @Prop() error: boolean = false;

  /** Enables multiselect in the Dropdown. */
  @Prop() multiselect: boolean = false;

  /** Enables filtration in the Dropdown. */
  @Prop() filter: boolean = false;

  /** Normalizes input text for fuzzier search */
  @Prop() normalizeText: boolean = true;

  /** Text that is displayed if filter is used and there are no options that matches the search.
   * Setting it to an empty string disables message from showing up. */
  @Prop() noResultText?: string = 'No result';

  /** Default value selected in the Dropdown. */
  @Prop() defaultValue?: string | number;

  /** Value of the dropdown. For multiselect, provide array of strings/numbers. For single select, provide a string/number. */
  @Prop({ mutable: true }) value: string | number | (string | number)[] | null = null;

  /** Defines aria-label attribute for input */
  @Prop() tdsAriaLabel?: string;

  @State() open: boolean = false;

  @State() internalValue: string = '';

  @State() filterResult: number | null = null;

  @State() filterFocus: boolean = false;

  @State() internalDefaultValue: string = '';

  @State() private selectedOptions: string[] = [];

  @State() filterQuery: string = '';

  @State() isFilteringMode: boolean = false;

  private dropdownList!: HTMLDivElement;

  private inputElement!: HTMLInputElement;

  private hasFocus: boolean = false;

  @Watch('value')
  handleValueChange(newValue: string | number | (string | number)[]) {
    /** Normalize to array */
    const normalizedValue = this.normalizeValue(newValue);

    /** Only update if actually changed */
    if (hasValueChanged(normalizedValue, this.selectedOptions)) {
      this.updateDropdownStateFromUser(normalizedValue);
    }
  }

  private normalizeValue(value: string | number | (string | number)[] | null): string[] {
    if (value === null || value === undefined || value === '') return [];

    /** For single select, ensure we handle both string and array inputs */
    if (!this.multiselect) {
      /** If array is passed to single select, take first value */
      if (Array.isArray(value)) {
        return [convertToString(value[0])];
      }
      return [convertToString(value)];
    }

    /** For multiselect */
    if (Array.isArray(value)) {
      return convertArrayToStrings(value);
    }

    /** Handle comma-separated string for multiselect */
    return value
      .toString()
      .split(',')
      .filter((v) => v !== '');
  }

  private updateDropdownStateInternal(values: string[]) {
    this.updateDropdownState(values, false);
  }

  private updateDropdownStateFromUser(values: string[]) {
    this.updateDropdownState(values, true);
  }

  private updateDropdownState(values: string[], emitChange: boolean = true) {
    /** Validate the values first */
    const validValues = this.validateValues(values);

    /** Update internal state */
    this.selectedOptions = [...validValues];

    /** Update the value prop */
    this.value = this.multiselect ? this.selectedOptions : this.selectedOptions[0] || null;

    /** Update internal value for display */
    this.internalValue = this.getValue();

    /** Update DOM */
    this.updateOptionElements();

    /** Update display value */
    this.updateDisplayValue();

    /** Emit change event only if value has changed by user */
    if (emitChange) this.emitChange();

    /** Update value attribute */
    this.setValueAttribute();
  }

  private validateValues(values: string[]): string[] {
    /** Make sure we have children before validation */
    const children = this.getChildren();
    if (!children || children.length === 0) {
      console.warn('No dropdown options found');
      return values; /** Return original values if no children yet */
    }

    return values.filter((val) => {
      const isValid = children.some(
        (element) => convertToString(element.value) === convertToString(val),
      );
      if (!isValid) {
        console.warn(`Option with value "${val}" does not exist`);
      }
      return isValid;
    });
  }

  private updateOptionElements() {
    this.getChildren()?.forEach((element) => {
      /** Convert element.value to string for comparison */
      element.setSelected(this.selectedOptions.includes(convertToString(element.value)));
    });
  }

  private updateDisplayValue() {
    this.internalValue = this.getSelectedChildrenLabels().join(', ');

    if (this.filter && this.inputElement) {
      this.inputElement.value = this.internalValue;
    }
  }

  private emitChange() {
    const value = this.multiselect
      ? this.selectedOptions.join(',')
      : this.selectedOptions[0] || null;

    this.tdsChange.emit({
      name: this.name,
      value: value ?? null,
    });
  }

  /** Method for setting the selected value of the Dropdown.
   *
   * Single selection example:
   *
   * <code>
   *  dropdown.setValue('option-1', 'Option 1');
   * </code>
   *
   * Multiselect example:
   *
   * <code>
   *  dropdown.setValue(['option-1', 'option-2']);
   * </code>
   */
  @Method()
  // @ts-expect-error for label: the label is optional here ONLY to not break the API. Should be removed for 2.0.
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async setValue(value: string | number | string[] | number[], label?: string) {
    let normalizedValue: string[];
    if (Array.isArray(value)) {
      normalizedValue = convertArrayToStrings(value);
    } else {
      normalizedValue = [convertToString(value)];
    }
    this.updateDropdownStateFromUser(normalizedValue);
    return this.getSelectedChildren().map((element: HTMLTdsDropdownOptionElement) => ({
      value: element.value,
      label: element.textContent?.trim(),
    }));
  }

  @Method()
  async reset() {
    this.updateDropdownStateFromUser([]);
  }

  @Method()
  async removeValue(oldValue: string) {
    const newValues = this.selectedOptions.filter((v) => v !== oldValue);
    this.updateDropdownStateFromUser(newValues);
  }

  /** Method that forces focus on the input element. */
  @Method()
  async focusElement() {
    if (this.filter || this.multiselect) {
      /** For filter mode, focus the input element */
      this.focusInputElement();
    } else {
      /** For non-filter mode, focus the button element */
      const button = this.host.shadowRoot?.querySelector<HTMLButtonElement>('.toggle-button');
      if (button) {
        button.focus();
      }
    }
    /** Always trigger the focus event to open the dropdown */
    this.handleFocus();
  }

  /** Method for closing the Dropdown. */
  @Method()
  async close() {
    this.open = false;
  }

  /** Method to force update the dropdown display value.
   * Use this method when you programmatically change the text content of dropdown options
   * to ensure the selected value display updates immediately.
   */
  @Method()
  async updateDisplay() {
    this.updateDisplayValue();
  }

  /** Change event for the Dropdown. */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsChange!: EventEmitter<{
    name: string | undefined;
    value: string | null;
  }>;

  /** Focus event for the Dropdown. */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus!: EventEmitter<FocusEvent>;

  /** Blur event for the Dropdown. */
  @Event({
    eventName: 'tdsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsBlur!: EventEmitter<FocusEvent>;

  /** Input event for the Dropdown. */
  @Event({
    eventName: 'tdsInput',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsInput!: EventEmitter<InputEvent>;

  /** Clear event for the Dropdown. */
  @Event({
    eventName: 'tdsClear',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsClear!: EventEmitter<{ clearedValue: string }>;

  @Listen('mousedown', { target: 'window' })
  onAnyClick(event: MouseEvent) {
    if (this.open) {
      /** Source: https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component/ */

      const isClickOutside = !event.composedPath().includes(this.host as EventTarget);

      if (isClickOutside) {
        /** Emit clear event if there's a filter query when clicking outside */
        if (this.filter && this.filterQuery) {
          this.tdsClear.emit({ clearedValue: this.filterQuery });
        }
        this.open = false;
      }
    }
  }

  @Listen('focusin')
  onFocusIn(event: FocusEvent) {
    /** Check if the focus is within this dropdown component */
    if (this.host.contains(event.target as Node)) {
      if (!this.hasFocus) {
        this.hasFocus = true;
        this.tdsFocus.emit(event);
      }
    }
  }

  @Listen('focusout')
  onFocusOut(event: FocusEvent) {
    /** Only emit blur if focus is actually leaving the entire dropdown component */
    const relatedTarget = event.relatedTarget as Node;

    /** If relatedTarget is null (focus going to body/window) or outside the component, emit blur */
    if (this.hasFocus && (!relatedTarget || !this.host.contains(relatedTarget))) {
      this.hasFocus = false;
      this.handleBlur();
      this.tdsBlur.emit(event);
    }
  }

  @Listen('keydown')
  async onKeyDown(event: KeyboardEvent) {
    /** Get the active element */
    const { activeElement } = document;
    if (!activeElement) {
      return;
    }

    const children = this.getChildren();
    if (event.key === 'ArrowDown') {
      /** Get the index of the current focus index, if there is no
      nextElementSibling return the index for the first child in our Dropdown.  */

      const startingIndex = activeElement.nextElementSibling
        ? children.findIndex((element) => element === activeElement.nextElementSibling)
        : 0;

      if (children.length > 0) {
        const elementIndex = findNextFocusableElement(children, startingIndex);
        const target = typeof elementIndex === 'number' ? children[elementIndex] : children[0];
        target?.focus();
      }
    } else if (event.key === 'ArrowUp') {
      /** Get the index of the current focus index, if there is no
      previousElementSibling return the index for the first last in our Dropdown.  */
      const startingIndex = activeElement.nextElementSibling
        ? this.getChildren().findIndex(
            (element) => element === activeElement.previousElementSibling,
          )
        : 0;

      if (children.length > 0) {
        const elementIndex = findPreviousFocusableElement(children, startingIndex);
        const target =
          typeof elementIndex === 'number' ? children[elementIndex] : children[children.length - 1];
        target?.focus();
      }
    } else if (event.key === 'Escape') {
      this.open = false;
      /** Return focus to input/button when Escape key is used */
      if (this.filter) {
        this.inputElement?.focus();
      } else {
        const button = this.host.shadowRoot?.querySelector('button');
        button?.focus();
      }
    }
  }

  /** If the Dropdown gets closed,
  this sets the value of the dropdown to the current selection labels or null if no selection is made. */
  @Watch('open')
  handleOpenState() {
    if (this.filter && this.multiselect) {
      if (!this.open) {
        this.isFilteringMode = false;
        this.inputElement.value = this.selectedOptions.length ? this.getValue() : '';
      }
    } else if (this.filter && !this.multiselect) {
      if (!this.open && this.inputElement) {
        /** Restore selected value in input when dropdown closes (e.g. on Escape) */
        this.inputElement.value = this.getValue();
        this.filterQuery = '';
      }
    }

    /** Update the inert state of dropdown list when open state changes */
    this.updateDropdownListInertState();
  }

  @Watch('defaultValue')
  handleDefaultValueChange(newValue: string | number) {
    if (newValue !== undefined && newValue !== null) {
      this.internalDefaultValue = convertToString(newValue);
      this.setDefaultOption();
    }
  }

  componentWillLoad() {
    /** First handle the value prop if it exists */
    if (this.value !== null && this.value !== undefined) {
      const normalizedValue = this.normalizeValue(this.value);
      this.updateDropdownStateInternal(normalizedValue);
      return; /** Exit early if we handled the value prop */
    }

    /** Only use defaultValue if no value prop was provided */
    if (this.defaultValue !== null && this.defaultValue !== undefined) {
      const defaultValueStr = convertToString(this.defaultValue);
      const initialValue = this.multiselect
        ? defaultValueStr.split(',').map(convertToString)
        : [defaultValueStr];
      this.updateDropdownStateInternal(initialValue);
    }
  }

  /** Method to handle slot changes */
  private handleSlotChange() {
    this.setDefaultOption();
  }

  /** Method to check if we should normalize text */
  private normalizeString(text: string): string {
    return this.normalizeText ? text.normalize('NFD').replace(/\p{Diacritic}/gu, '') : text;
  }

  private setDefaultOption = () => {
    if (this.internalDefaultValue) {
      /** Convert the internal default value to an array if it's not already */
      const defaultValues = this.multiselect
        ? this.internalDefaultValue.split(',')
        : [this.internalDefaultValue];

      this.updateDropdownStateInternal(defaultValues);
    }
  };

  private getChildren = () => {
    const tdsDropdownOptions = Array.from(this.host.children).filter(
      (element) => element.tagName === 'TDS-DROPDOWN-OPTION',
    ) as Array<HTMLTdsDropdownOptionElement>;

    if (tdsDropdownOptions.length === 0) {
      console.warn('TDS DROPDOWN: No options found. Disregard if loading data asynchronously.');
    }

    return tdsDropdownOptions;
  };

  private getSelectedChildren = () => {
    if (this.selectedOptions.length === 0) return [];

    return this.selectedOptions
      .map((stringValue) => {
        const matchingElement = this.getChildren()?.find(
          (element: HTMLTdsDropdownOptionElement) =>
            convertToString(element.value) === convertToString(stringValue),
        );
        return matchingElement;
      })
      .filter(Boolean);
  };

  private getSelectedChildrenLabels = () =>
    this.getSelectedChildren()?.map((element: HTMLTdsDropdownOptionElement) =>
      element.textContent?.trim(),
    );

  private getValue = () => {
    const labels = this.getSelectedChildrenLabels();
    if (!labels) {
      return '';
    }
    return labels?.join(', ');
  };

  private setValueAttribute = () => {
    if (this.selectedOptions.length === 0) {
      this.host.removeAttribute('value');
    } else {
      this.host.setAttribute('value', this.selectedOptions.join(','));
    }
  };

  private getOpenDirection = () => {
    if (this.openDirection === 'auto' || !this.openDirection) {
      const dropdownMenuHeight = this.dropdownList?.offsetHeight ?? 0;
      const distanceToBottom = this.host.getBoundingClientRect?.().top ?? 0;
      const viewportHeight = window.innerHeight;
      if (distanceToBottom + dropdownMenuHeight + 57 > viewportHeight) {
        return 'up';
      }
      return 'down';
    }
    return this.openDirection;
  };

  private handleToggleOpen = () => {
    if (!this.disabled) {
      this.open = !this.open;
      if (this.open) {
        if (this.filter) {
          this.focusInputElement();
        } else {
          const button = this.host.shadowRoot?.querySelector('button');
          if (button) {
            button.focus();
          }
        }
      }
    }
  };

  private focusInputElement = () => {
    if (this.inputElement) this.inputElement.focus();
  };

  private handleBeforeInput = (event: InputEvent) => {
    /** For multiselect with filter: if showing selected values and user starts typing,
     * enter filtering mode and set filterQuery to just what was typed */
    if (
      this.multiselect &&
      !this.isFilteringMode &&
      event.data &&
      event.inputType === 'insertText'
    ) {
      event.preventDefault();
      this.isFilteringMode = true;
      this.filterQuery = event.data.toLowerCase();
      /** Manually trigger filtering since preventDefault() cancels the input event */
      this.handleFilter({ target: { value: this.filterQuery } });
    }
  };

  private handleFilter = (event) => {
    this.tdsInput.emit(event);
    const query = event.target.value.toLowerCase();
    this.filterQuery = query;
    /** Check if the query is empty, and if so, show all options */
    const children = this.getChildren();

    if (query === '') {
      children.forEach((element) => {
        element.removeAttribute('hidden');
        return element;
      });
      this.filterResult = null;
      /** Hide the options that do not match the query */
    } else {
      this.filterResult = children.filter((element) => {
        if (
          !this.normalizeString(element?.textContent ?? '')
            .toLowerCase()
            .includes(this.normalizeString(query).toLowerCase())
        ) {
          element.setAttribute('hidden', '');
        } else {
          element.removeAttribute('hidden');
        }
        return !element.hasAttribute('hidden');
      }).length;
    }
  };

  private handleFilterReset = () => {
    /** If a filter is present, clear only the filter text */
    if (this.filterQuery.length > 0) {
      const clearedValue = this.filterQuery;
      this.filterQuery = '';
      this.inputElement.value = '';
      this.handleFilter({ target: { value: '' } });
      this.inputElement.focus();
      this.tdsClear.emit({ clearedValue });
    } else if (this.selectedOptions.length > 0) {
      /** If no filter but selections exist, clear all selected values */
      const clearedValue = this.selectedOptions.join(',');
      this.updateDropdownStateFromUser([]);
      if (this.inputElement) {
        this.inputElement.value = '';
        this.inputElement.focus();
      }
      this.tdsClear.emit({ clearedValue });
    }
  };

  private handleInputMouseDown = () => {
    /** Only clear the input if user clicks on
     * the input while the dropdown is already open. */
    if (this.filter && this.multiselect && this.open && this.selectedOptions.length > 0) {
      this.isFilteringMode = true;
      this.filterQuery = '';
    }
  };

  private handleFocus = () => {
    this.open = true;
    this.filterFocus = true;
    /** Focus event is now handled by focusin listener */
    if (this.filter) {
      if (!this.multiselect && this.inputElement) {
        /** For filter-only (no multiselect), clear input on focus so user can type immediately */
        this.inputElement.value = '';
        this.filterQuery = '';
      }
      this.handleFilter({ target: { value: '' } });
    }
  };

  private handleBlur = () => {
    /** Handle internal state changes when component loses focus */
    this.filterFocus = false;
    this.isFilteringMode = false;
    if (this.filter && !this.multiselect) {
      this.filterQuery = '';
    }
    if (this.inputElement) {
      this.inputElement.value = this.getValue();
    }
  };

  /**
   * @internal
   */
  @Method()
  async appendValue(value: string) {
    /** Clear filter query when an option is selected */
    if (this.filter && this.filterQuery.length > 0) {
      this.filterQuery = '';
      if (this.inputElement) {
        this.inputElement.value = '';
      }
      /** Reset filter to show all options */
      this.handleFilter({ target: { value: '' } });
    }

    /** Exit filtering mode so input shows all selected labels */
    this.isFilteringMode = false;

    if (this.multiselect) {
      this.updateDropdownStateFromUser([...this.selectedOptions, value]);
    } else {
      this.updateDropdownStateFromUser([value]);
    }
  }

  private resetInput = () => {
    const inputEl = this.host.querySelector('input');
    if (inputEl) {
      this.reset();
    }
  };

  componentDidRender() {
    const form = this.host.closest('form');
    if (form) {
      form.addEventListener('reset', this.resetInput);
    }

    /** Initialize inert state after rendering */
    this.updateDropdownListInertState();

    /** Add beforeinput listener for multiselect filter to auto-clear selected labels */
    if (this.filter && this.multiselect && this.inputElement) {
      this.inputElement.removeEventListener('beforeinput', this.handleBeforeInput as EventListener);
      this.inputElement.addEventListener('beforeinput', this.handleBeforeInput as EventListener);
    }
  }

  disconnectedCallback() {
    const form = this.host.closest('form');
    if (form) {
      form.removeEventListener('reset', this.resetInput);
    }

    /** Clean up beforeinput listener */
    if (this.inputElement) {
      this.inputElement.removeEventListener('beforeinput', this.handleBeforeInput as EventListener);
    }
  }

  private updateDropdownListInertState() {
    if (this.dropdownList) {
      if (this.open) {
        this.dropdownList.removeAttribute('inert');
      } else {
        this.dropdownList.setAttribute('inert', '');
      }
    }
  }

  render() {
    appendHiddenInput(this.host, this.name, this.selectedOptions.join(','), this.disabled);

    const usesInputLayout = this.filter || this.multiselect;
    const showClearButton =
      !this.disabled && (this.filterQuery.length > 0 || this.selectedOptions.length > 0);
    const clearLabel = this.filterQuery.length > 0 ? 'Clear filter' : 'Clear selection';

    /** Generate unique IDs for associating labels and helpers with the input/button */
    const labelId = this.label ? `dropdown-label-${this.name || generateUniqueId()}` : undefined;
    const helperId = this.helper ? `dropdown-helper-${this.name || generateUniqueId()}` : undefined;

    return (
      <Host
        class={{
          [`tds-mode-variant-${this.modeVariant}`]: Boolean(this.modeVariant),
        }}
      >
        {this.label && this.labelPosition === 'outside' && (
          <div id={labelId} class={`label-outside ${this.disabled ? 'disabled' : ''}`}>
            {this.label}
          </div>
        )}
        <div
          class={{
            'dropdown-select': true,
            [this.size]: true,
            'disabled': this.disabled,
            'open': this.open,
          }}
        >
          {usesInputLayout ? (
            <div
              class={{
                filter: true,
                focus: this.filterFocus,
                disabled: this.disabled,
                error: this.error,
              }}
            >
              <div class="value-wrapper">
                {this.label && this.labelPosition === 'inside' && this.placeholder && (
                  <div id={labelId} class={`label-inside ${this.size}`}>
                    {this.label}
                  </div>
                )}
                {this.label && this.labelPosition === 'inside' && !this.placeholder && (
                  <div
                    id={labelId}
                    class={`
                    label-inside-as-placeholder
                    ${this.size}
                    ${this.selectedOptions.length ? 'selected' : ''}
                    `}
                  >
                    {this.label}
                  </div>
                )}
                <input
                  aria-label={this.tdsAriaLabel}
                  aria-labelledby={labelId}
                  aria-describedby={helperId}
                  aria-disabled={this.disabled}
                  // eslint-disable-next-line no-return-assign
                  ref={(inputEl) => (this.inputElement = inputEl as HTMLInputElement)}
                  class={{
                    placeholder: this.labelPosition === 'inside',
                  }}
                  type="text"
                  placeholder={this.filterFocus ? '' : this.placeholder}
                  value={
                    this.multiselect && this.isFilteringMode ? this.filterQuery : this.getValue()
                  }
                  disabled={this.disabled}
                  readOnly={!this.filter}
                  onMouseDown={() => this.handleInputMouseDown()}
                  onInput={(event) => {
                    if (this.filter) this.handleFilter(event);
                  }}
                  onFocus={() => this.handleFocus()}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      this.open = false;
                    }
                  }}
                />
              </div>
              <button
                type="button"
                aria-label={clearLabel}
                disabled={this.disabled}
                onClick={this.handleFilterReset}
                class={{
                  'clear-button': true,
                  'hide': !showClearButton,
                }}
              >
                <tds-icon tdsAriaHidden name="cross" size="16px" />
              </button>
              <button
                type="button"
                aria-label="Open/Close dropdown"
                aria-expanded={this.open ? 'true' : 'false'}
                disabled={this.disabled}
                onClick={this.handleToggleOpen}
                class={`icon-button menu-icon toggle-button ${this.open ? 'open' : 'closed'}`}
              >
                <tds-icon tdsAriaHidden name="chevron_down" size="16px"></tds-icon>
              </button>
            </div>
          ) : (
            <button
              aria-label="Open/Close dropdown"
              aria-labelledby={labelId}
              aria-expanded={this.open ? 'true' : 'false'}
              aria-describedby={helperId}
              onClick={() => this.handleToggleOpen()}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  this.open = false;
                }
              }}
              class={`
                ${this.selectedOptions.length ? 'value' : 'placeholder'}
                ${this.error ? 'error' : ''}
                menu-icon
                ${this.open ? 'open' : ''}
              `}
              disabled={this.disabled}
            >
              <div class={`value-wrapper ${this.size}`}>
                {this.label && this.labelPosition === 'inside' && this.placeholder && (
                  <div id={labelId} class={`label-inside ${this.size}`}>
                    {this.label}
                  </div>
                )}
                {this.label && this.labelPosition === 'inside' && !this.placeholder && (
                  <div
                    id={labelId}
                    class={`
                    label-inside-as-placeholder
                    ${this.size}
                    ${this.selectedOptions.length ? 'selected' : ''}
                    `}
                  >
                    {this.label}
                  </div>
                )}
                <div class={`placeholder ${this.size}`}>
                  {this.selectedOptions.length ? this.getValue() : this.placeholder}
                </div>
                <tds-icon tdsAriaHidden name="chevron_down" size="16px"></tds-icon>
              </div>
            </button>
          )}
        </div>
        {/* DROPDOWN LIST */}
        <div
          role="listbox"
          aria-label={this.tdsAriaLabel}
          inert={!this.open}
          aria-orientation="vertical"
          aria-multiselectable={this.multiselect}
          ref={(element) => {
            if (element) this.dropdownList = element;
          }}
          class={{
            'dropdown-list': true,
            [this.size]: true,
            [this.getOpenDirection()]: true,
            'label-outside': !!(this.label && this.labelPosition === 'outside'),
            'open': this.open,
            'closed': !this.open,
            [`animation-enter-${this.animation}`]: this.animation !== 'none' && this.open,
            [`animation-exit-${this.animation}`]: this.animation !== 'none' && !this.open,
          }}
        >
          <slot onSlotchange={() => this.handleSlotChange()}></slot>
          {this.filterResult === 0 && this.noResultText !== '' && (
            <div class={`no-result ${this.size}`}>{this.noResultText}</div>
          )}
        </div>
        {/* DROPDOWN LIST */}
        {this.helper && (
          <div
            id={helperId}
            class={{
              helper: true,
              error: this.error,
              disabled: this.disabled,
            }}
          >
            {this.error && <tds-icon name="error" size="16px"></tds-icon>}
            {this.helper}
          </div>
        )}
      </Host>
    );
  }
}
