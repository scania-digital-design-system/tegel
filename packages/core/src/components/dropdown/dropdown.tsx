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

  /** Value of the dropdown. For multiselect, provide array of strings. For single select, provide a string. */
  @Prop({ mutable: true }) value: string | string[] = null;

  @State() open: boolean = false;

  @State() internalValue: string;

  @State() filterResult: number;

  @State() filterFocus: boolean;

  @State() internalDefaultValue: string;

  @State() private selectedOptions: string[] = [];

  private dropdownList: HTMLDivElement;

  private inputElement: HTMLInputElement;

  @Watch('value')
  handleValueChange(newValue: string | string[]) {
    // Normalize to array
    const normalizedValue = this.normalizeValue(newValue);

    // Only update if actually changed
    if (this.hasValueChanged(normalizedValue, this.selectedOptions)) {
      this.updateDropdownState(normalizedValue);
    }
  }

  private normalizeValue(value: string | string[] | null): string[] {
    if (!value || value === '') return []; // Handle both null and empty string
    // For multiselect, keep array. For single select, wrap in array
    if (this.multiselect) {
      return Array.isArray(value) ? value : value.split(',').filter((v) => v !== '');
    }
    return Array.isArray(value) ? value : [value];
  }

  private hasValueChanged(newValue: string[], currentValue: string[]): boolean {
    if (newValue.length !== currentValue.length) return true;
    return newValue.some((val) => !currentValue.includes(val));
  }

  private updateDropdownState(values: string[]) {
    // Update internal state
    this.selectedOptions = [...this.validateValues(values)]; // Force new array reference

    // Then update the value prop to match
    this.value = this.multiselect ? this.selectedOptions : this.selectedOptions[0] || null;

    // Force update of internal value
    this.internalValue = this.getValue();

    // Update DOM
    this.updateOptionElements();

    // Update display value
    this.updateDisplayValue();

    // Emit change event
    this.emitChange();

    // Update value attribute
    this.setValueAttribute();
  }

  private validateValues(values: string[]): string[] {
    return values.filter((val) => {
      const isValid = this.getChildren()?.some((element) => element.value === val);
      if (!isValid) {
        console.warn(`Option with value "${val}" does not exist`);
      }
      return isValid;
    });
  }

  private updateOptionElements() {
    this.getChildren()?.forEach((element) => {
      element.setSelected(this.selectedOptions.includes(element.value));
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
  async setValue(value: string | string[]) {
    const normalizedValue = this.normalizeValue(value);
    this.updateDropdownState(normalizedValue);
    return this.getSelectedChildren().map((element: HTMLTdsDropdownOptionElement) => ({
      value: element.value,
      label: element.textContent.trim(),
    }));
  }

  @Method()
  async reset() {
    this.updateDropdownState([]);
  }

  @Method()
  async removeValue(oldValue: string) {
    const newValues = this.selectedOptions.filter((v) => v !== oldValue);
    this.updateDropdownState(newValues);
  }

  /** Method that forces focus on the input element. */
  @Method()
  async focusElement() {
    this.focusInputElement();
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
  async setValue(value: string | string[] | number | number[]) {
    let nextValue: string[];
    if (Array.isArray(value)) {
      nextValue = convertArrayToStrings(value);
    } else {
      nextValue = [convertToString(value)];
    }

    if (!this.multiselect && nextValue.length > 1) {
      console.warn('Tried to select multiple items, but multiselect is not enabled.');
      nextValue = [nextValue[0]];
    }

    nextValue = [...new Set(nextValue)];

    this.internalReset();

    for (let i = 0; i < nextValue.length; i++) {
      const optionExist = this.getChildren().some(
        (element: HTMLTdsDropdownOptionElement) => element.value === nextValue[i],
      );
      if (!optionExist) {
        nextValue.splice(i, 1);
      }
    }

    this.value = nextValue;
    this.setValueAttribute();
    this.selectChildrenAsSelectedBasedOnSelectionProp();
    this.handleChange();

    /* This returns an array of object with a value and label pair. This is ONLY to not break the API. Should be removed for 2.0. */
    /* https://tegel.atlassian.net/browse/CDEP-2703 */
    const selection = this.getSelectedChildren().map((element: HTMLTdsDropdownOptionElement) => ({
      value: element.value,
      label: element.textContent.trim(),
    }));

    // Update inputElement value and placeholder text
    if (this.filter) {
      this.inputElement.value = this.getValue();
    }
    return selection;
  }

  /**
   * @internal
   */
  @Method()
  async appendValue(value: string) {
    if (this.multiselect && this.value) {
      this.setValue([...this.value, value]);
    } else {
      this.setValue(value);
    }
  }

  /** Method for removing a selected value in the Dropdown. */
  @Method()
  async removeValue(oldValue: string) {
    let label: string;
    if (this.multiselect) {
      this.getChildren()?.forEach((element: HTMLTdsDropdownOptionElement) => {
        if (element.value === oldValue) {
          this.value = this.value?.filter((value) => value !== element.value);
          label = element.textContent.trim();
          element.setSelected(false);
        }
        return element;
      });
    } else {
      this.reset();
    }
    this.handleChange();
    this.setValueAttribute();
    /* This returns an array of object with a value and label pair. This is ONLY to not break the API. Should be removed for 2.0. */
    /* https://tegel.atlassian.net/browse/CDEP-2703 */
    return this.value?.map((value) => ({ value, label }));
  }

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

  /** Value change event for the Dropdown. */
  @Event({
    eventName: 'tdsValueChange',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsValueChange: EventEmitter<{
    name: string;
    value: string;
  }>;

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
  }

  @Watch('defaultValue')
  handleDefaultValueChange(newValue: string | number) {
    if (newValue !== undefined && newValue !== null) {
      this.internalDefaultValue = convertToString(newValue);
      this.setDefaultOption();
    }
  }

  componentWillLoad() {
    if (this.defaultValue && !this.value) {
      const initialValue = this.multiselect ? this.defaultValue.split(',') : [this.defaultValue];
      this.updateDropdownState(initialValue);
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
      const children = Array.from(this.host.children).filter(
        (element) => element.tagName === 'TDS-DROPDOWN-OPTION',
      ) as HTMLTdsDropdownOptionElement[];

      if (children.length === 0) {
        console.warn('TDS DROPDOWN: No options found. Disregard if loading data asynchronously.');
        return;
      }

      const defaultValues = this.multiselect
        ? new Set(this.internalDefaultValue.split(','))
        : [this.internalDefaultValue];

      const childrenMap = new Map(children.map((element) => [element.value, element]));

      const matchedValues = Array.from(defaultValues).filter((value) => {
        const element = childrenMap.get(value);
        if (element) {
          element.setSelected(true);
          return true;
        }
        return false;
      });

      if (matchedValues.length > 0) {
        this.value = [...new Set(this.value ? [...this.value, ...matchedValues] : matchedValues)];
        this.setValueAttribute();
      } else {
        console.warn(
          `TDS DROPDOWN: No matching option found for defaultValue "${this.internalDefaultValue}"`,
        );
      }
    }
  };

  private getChildren = () => {
    const tdsDropdownOptions = Array.from(this.host.children).filter(
      (element) => element.tagName === 'TDS-DROPDOWN-OPTION',
    ) as Array<HTMLTdsDropdownOptionElement>;
    if (tdsDropdownOptions.length === 0) {
      console.warn('TDS DROPDOWN: Data missing. Disregard if loading data asynchronously.');
    } else return tdsDropdownOptions;
  };

  private getSelectedChildren = () => {
    if (this.selectedOptions.length === 0) return [];

    return this.selectedOptions
      .map((stringValue) => {
        const matchingElement = this.getChildren()?.find(
          (element: HTMLTdsDropdownOptionElement) => element.value === stringValue,
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

  getOpenDirection = () => {
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
        this.focusInputElement();
      }
    }
  };

  private focusInputElement = () => {
    if (this.inputElement) this.inputElement.focus();
  };

  getOpenDirection = () => {
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
        this.focusInputElement();
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
    if (this.multiselect) {
      this.inputElement.value = '';
    }
    this.tdsFocus.emit(event);
    this.handleFilter({ target: { value: '' } });
  };

  private handleBlur = (event) => {
    this.tdsBlur.emit(event);
  };

  @Method()
  async appendValue(value: string) {
    if (this.multiselect) {
      this.updateDropdownState([...this.selectedOptions, value]);
    } else {
      this.updateDropdownState([value]);
    }
  }
  private handleChange = () => {
    this.tdsChange.emit({
      name: this.name,
      value: this.value ? convertArrayToStrings(this.value).join(',') : null,
    });
  };

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
  }

  disconnectedCallback() {
    const form = this.host.closest('form');
    if (form) {
      form.removeEventListener('reset', this.resetInput);
    }
  }

  render() {
    appendHiddenInput(this.host, this.name, this.selectedOptions.join(','), this.disabled);
    return (
      <Host
        role="select"
        class={{
          [`tds-mode-variant-${this.modeVariant}`]: Boolean(this.modeVariant),
        }}
      >
        {this.label && this.labelPosition === 'outside' && (
          <div class={`label-outside ${this.disabled ? 'disabled' : ''}`}>{this.label}</div>
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
                  <div class={`label-inside ${this.size}`}>{this.label}</div>
                )}
                {this.label && this.labelPosition === 'inside' && !this.placeholder && (
                  <div
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
                tabIndex={0}
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
                  <div class={`label-inside ${this.size}`}>{this.label}</div>
                )}
                {this.label && this.labelPosition === 'inside' && !this.placeholder && (
                  <div
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
