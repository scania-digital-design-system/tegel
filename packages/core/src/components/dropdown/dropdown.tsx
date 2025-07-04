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

/**
 * @slot <default> - <b>Unnamed slot.</b> For dropdown option elements.
 */
@Component({
  tag: 'tds-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true,
})
export class TdsDropdown {
  @Element() host: HTMLElement;

  /** Name for the Dropdowns input element. */
  @Prop() name: string;

  /** Sets the Dropdown in a disabled state */
  @Prop() disabled: boolean = false;

  /** Helper text for the Dropdown. */
  @Prop() helper: string;

  /** Label text for the Dropdown. */
  @Prop() label: string;

  /** Label text position */
  @Prop() labelPosition: 'inside' | 'outside';

  /** Mode variant of the component, based on current mode. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** The direction the Dropdown should open, auto if not specified. */
  @Prop() openDirection: 'up' | 'down' | 'auto' = 'auto';

  /** Placeholder text for the Dropdown. */
  @Prop() placeholder: string;

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
  @Prop() defaultValue: string | number;

  /** Value of the dropdown. For multiselect, provide array of strings/numbers. For single select, provide a string/number. */
  @Prop({ mutable: true }) value: string | number | (string | number)[] = null;

  /** Defines aria-label attribute for input */
  @Prop() tdsAriaLabel: string;

  @State() open: boolean = false;

  @State() internalValue: string;

  @State() filterResult: number;

  @State() filterFocus: boolean;

  @State() internalDefaultValue: string;

  @State() private selectedOptions: string[] = [];

  private dropdownList: HTMLDivElement;

  private inputElement: HTMLInputElement;

  @Watch('value')
  handleValueChange(newValue: string | number | (string | number)[]) {
    // Normalize to array
    const normalizedValue = this.normalizeValue(newValue);

    // Only update if actually changed
    if (this.hasValueChanged(normalizedValue, this.selectedOptions)) {
      this.updateDropdownStateFromUser(normalizedValue);
    }
  }

  private normalizeValue(value: string | number | (string | number)[] | null): string[] {
    if (value === null || value === undefined || value === '') return [];

    // For single select, ensure we handle both string and array inputs
    if (!this.multiselect) {
      // If array is passed to single select, take first value
      if (Array.isArray(value)) {
        return [convertToString(value[0])];
      }
      return [convertToString(value)];
    }

    // For multiselect
    if (Array.isArray(value)) {
      return convertArrayToStrings(value);
    }

    // Handle comma-separated string for multiselect
    return value
      .toString()
      .split(',')
      .filter((v) => v !== '');
  }

  private hasValueChanged(newValue: string[], currentValue: string[]): boolean {
    if (newValue.length !== currentValue.length) return true;
    return newValue.some((val) => !currentValue.includes(val));
  }

  private updateDropdownStateInternal(values: string[]) {
    this.updateDropdownState(values, false);
  }

  private updateDropdownStateFromUser(values: string[]) {
    this.updateDropdownState(values, true);
  }

  private updateDropdownState(values: string[], emitChange: boolean = true) {
    // Validate the values first
    const validValues = this.validateValues(values);

    // Update internal state
    this.selectedOptions = [...validValues];

    // Update the value prop
    this.value = this.multiselect ? this.selectedOptions : this.selectedOptions[0] || null;

    // Update internal value for display
    this.internalValue = this.getValue();

    // Update DOM
    this.updateOptionElements();

    // Update display value
    this.updateDisplayValue();

    // Emit change event only if value has changed by user
    if (emitChange) this.emitChange();

    // Update value attribute
    this.setValueAttribute();
  }

  private validateValues(values: string[]): string[] {
    // Make sure we have children before validation
    const children = this.getChildren();
    if (!children || children.length === 0) {
      console.warn('No dropdown options found');
      return values; // Return original values if no children yet
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
      // Convert element.value to string for comparison
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

  @Method()
  async setValue(value: string | number | string[] | number[]) {
    let normalizedValue: string[];
    if (Array.isArray(value)) {
      normalizedValue = convertArrayToStrings(value);
    } else {
      normalizedValue = [convertToString(value)];
    }
    this.updateDropdownStateFromUser(normalizedValue);
    return this.getSelectedChildren().map((element: HTMLTdsDropdownOptionElement) => ({
      value: element.value,
      label: element.textContent.trim(),
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
    if (this.filter) {
      // For filter mode, focus the input element
      this.focusInputElement();
    } else {
      // For non-filter mode, focus the button element
      const button = this.host.shadowRoot.querySelector('button');
      if (button) {
        button.focus();
      }
    }
    // Always trigger the focus event to open the dropdown
    this.handleFocus({});
  }

  /** Method for setting the value of the Dropdown.
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
  //  The label is optional here ONLY to not break the API. Should be removed for 2.0.
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

  /** Method for closing the Dropdown. */
  @Method()
  async close() {
    this.open = false;
  }

  /** Change event for the Dropdown. */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsChange: EventEmitter<{
    name: string;
    value: string;
  }>;

  /** Focus event for the Dropdown. */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus: EventEmitter<FocusEvent>;

  /** Blur event for the Dropdown. */
  @Event({
    eventName: 'tdsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsBlur: EventEmitter<FocusEvent>;

  /** Input event for the Dropdown. */
  @Event({
    eventName: 'tdsInput',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsInput: EventEmitter<InputEvent>;

  @Listen('mousedown', { target: 'window' })
  onAnyClick(event: MouseEvent) {
    if (this.open) {
      // Source: https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component/
      const isClickOutside = !event.composedPath().includes(this.host as any);
      if (isClickOutside) {
        this.open = false;
      }
    }
  }

  @Listen('keydown')
  async onKeyDown(event: KeyboardEvent) {
    // Get the active element
    const { activeElement } = document;
    if (!activeElement) {
      return;
    }

    const children = this.getChildren();
    if (event.key === 'ArrowDown') {
      /* Get the index of the current focus index, if there is no
      nextElementSibling return the index for the first child in our Dropdown.  */

      const startingIndex = activeElement.nextElementSibling
        ? children.findIndex((element) => element === activeElement.nextElementSibling)
        : 0;

      const elementIndex = findNextFocusableElement(children, startingIndex);
      children[elementIndex].focus();
    } else if (event.key === 'ArrowUp') {
      /* Get the index of the current focus index, if there is no
      previousElementSibling return the index for the first last in our Dropdown.  */
      const startingIndex = activeElement.nextElementSibling
        ? this.getChildren().findIndex(
            (element) => element === activeElement.previousElementSibling,
          )
        : 0;

      const elementIndex = findPreviousFocusableElement(children, startingIndex);
      children[elementIndex].focus();
    } else if (event.key === 'Escape') {
      this.open = false;
      // Return focus to input/button when Escape key is used
      if (this.filter) {
        this.inputElement?.focus();
      } else {
        const button = this.host.shadowRoot.querySelector('button');
        button?.focus();
      }
    }
  }

  // If the Dropdown gets closed,
  // this sets the value of the dropdown to the current selection labels or null if no selection is made.
  @Watch('open')
  handleOpenState() {
    if (this.filter && this.multiselect) {
      if (!this.open) {
        this.inputElement.value = this.selectedOptions.length ? this.getValue() : '';
      }
    }

    // Update the inert state of dropdown list when open state changes
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
    // First handle the value prop if it exists
    if (this.value !== null && this.value !== undefined) {
      const normalizedValue = this.normalizeValue(this.value);
      this.updateDropdownStateInternal(normalizedValue);
      return; // Exit early if we handled the value prop
    }

    // Only use defaultValue if no value prop was provided
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
      // Convert the internal default value to an array if it's not already
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
      element.textContent.trim(),
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
          const button = this.host.shadowRoot.querySelector('button');
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

  private handleFilter = (event) => {
    this.tdsInput.emit(event);
    const query = event.target.value.toLowerCase();
    /* Check if the query is empty, and if so, show all options */
    const children = this.getChildren();

    if (query === '') {
      children.forEach((element) => {
        element.removeAttribute('hidden');
        return element;
      });
      this.filterResult = null;
      /* Hide the options that do not match the query */
    } else {
      this.filterResult = children.filter((element) => {
        if (
          !this.normalizeString(element.textContent)
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
    this.reset();
    this.inputElement.value = '';
    this.handleFilter({ target: { value: '' } });
    this.inputElement.focus();
    // Add this line to ensure internal value is cleared
    this.internalValue = '';
  };

  private handleFocus = (event) => {
    this.open = true;
    this.filterFocus = true;
    if (this.multiselect && this.inputElement) {
      this.inputElement.value = '';
    }
    this.tdsFocus.emit(event);
    if (this.filter) {
      this.handleFilter({ target: { value: '' } });
    }
  };

  private handleBlur = (event) => {
    this.tdsBlur.emit(event);
  };

  /**
   * @internal
   */
  @Method()
  async appendValue(value: string) {
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

    // Initialize inert state after rendering
    this.updateDropdownListInertState();
  }

  disconnectedCallback() {
    const form = this.host.closest('form');
    if (form) {
      form.removeEventListener('reset', this.resetInput);
    }
  }

  connectedCallback() {
    if (!this.tdsAriaLabel) {
      console.warn('Tegel Dropdown component: tdsAriaLabel prop is missing');
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

    // Generate unique IDs for associating labels and helpers with the input/button
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
          }}
        >
          {this.filter ? (
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
                  value={this.multiselect && this.filterFocus ? '' : this.getValue()}
                  disabled={this.disabled}
                  onInput={(event) => this.handleFilter(event)}
                  onBlur={(event) => {
                    this.filterFocus = false;
                    if (this.multiselect) {
                      this.inputElement.value = this.getValue();
                    }
                    this.handleBlur(event);
                  }}
                  onFocus={(event) => this.handleFocus(event)}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      this.open = false;
                    }
                  }}
                />
              </div>
              <tds-icon
                tabIndex={0}
                role="button"
                aria-label="Clear filter"
                svgTitle="Clear filter"
                onClick={this.handleFilterReset}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    this.handleFilterReset();
                  }
                }}
                class={{
                  'clear-icon': true,
                  'hide': !(this.open && this.inputElement.value !== ''),
                }}
                name="cross"
                size="16px"
              ></tds-icon>
              <tds-icon
                tdsAriaHidden
                role="button"
                aria-label="Open/Close dropdown"
                svgTitle="Open/Close dropdown"
                onClick={this.handleToggleOpen}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    this.handleToggleOpen();
                  }
                }}
                class={`menu-icon ${this.open ? 'open' : 'closed'}`}
                name="chevron_down"
                size="16px"
              ></tds-icon>
            </div>
          ) : (
            <button
              aria-label={this.tdsAriaLabel}
              aria-labelledby={labelId}
              aria-describedby={helperId}
              aria-disabled={this.disabled}
              onClick={() => this.handleToggleOpen()}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  this.open = false;
                }
              }}
              class={`
                ${this.selectedOptions.length ? 'value' : 'placeholder'}
                ${this.open ? 'open' : 'closed'}
                ${this.error ? 'error' : ''}
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
                <tds-icon
                  aria-label="Open/Close dropdown"
                  svgTitle="Open/Close dropdown"
                  class={`menu-icon ${this.open ? 'open' : 'closed'}`}
                  name="chevron_down"
                  size="16px"
                ></tds-icon>
              </div>
            </button>
          )}
        </div>
        {/* DROPDOWN LIST */}
        <div
          role="listbox"
          aria-label={this.tdsAriaLabel}
          aria-hidden={this.open ? 'false' : 'true'}
          inert={!this.open}
          aria-orientation="vertical"
          aria-multiselectable={this.multiselect}
          ref={(element) => {
            this.dropdownList = element;
          }}
          class={{
            'dropdown-list': true,
            [this.size]: true,
            [this.getOpenDirection()]: true,
            'label-outside': this.label && this.labelPosition === 'outside',
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
