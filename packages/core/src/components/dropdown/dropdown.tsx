import {
  Component,
  Host,
  h,
  Element,
  State,
  Event,
  EventEmitter,
  Listen,
  Method,
  Prop,
  Watch,
} from '@stencil/core';
import findNextFocusableElement from '../../utils/findNextFocusableElement';
import findPreviousFocusableElement from '../../utils/findPreviousFocusableElement';
import appendHiddenInput from '../../utils/appendHiddenInput';

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
  @Prop() size: 'sm' | 'md' | 'lg' = 'lg';

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
  @Prop() defaultValue: string;

  @State() open: boolean = false;

  @State() value: string[];

  @State() filterResult: number;

  @State() filterFocus: boolean;

  private dropdownList: HTMLDivElement;

  private inputElement: HTMLInputElement;

  /** Method that resets the Dropdown, marks all children as non-selected and resets the value to null. */
  @Method()
  async reset() {
    this.internalReset();
    this.handleChange();
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
  async setValue(value: string | string[], label?: string) {
    let nextValue: string[];
    if (typeof value === 'string') nextValue = [value];
    else nextValue = value;

    if (!this.multiselect && nextValue.length > 1) {
      console.warn('Tried to select multiple items, but multiselect is not enabled.');
      nextValue = [nextValue[0]];
    }

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
        this.inputElement.value = this.getValue();
      }
    }
  }

  componentWillLoad() {
    if (this.defaultValue) {
      this.setDefaultOption();
    }
  }

  /** Method to check if we should normalize text */
  private normalizeString(text: string): string {
    return this.normalizeText ? text.normalize('NFD').replace(/\p{Diacritic}/gu, '') : text;
  }

  /** Method that resets the dropdown without emitting an event. */
  private internalReset() {
    this.getChildren().forEach((element: HTMLTdsDropdownOptionElement) => {
      element.setSelected(false);
      return element;
    });
    this.value = null;
    this.setValueAttribute();
  }

  private setDefaultOption = () => {
    Array.from(this.host.children)
      .filter((element) => element.tagName === 'TDS-DROPDOWN-OPTION')
      .forEach((element: HTMLTdsDropdownOptionElement) => {
        if (this.multiselect) {
          this.defaultValue.split(',').forEach((value) => {
            if (value === element.value) {
              element.setSelected(true);
              this.value = this.value ? [...this.value, element.value] : [element.value];
            }
          });
        } else {
          if (this.defaultValue === element.value) {
            element.setSelected(true);
            this.value = [element.value];
          } else {
            element.setSelected(false);
          }
        }
        this.setValueAttribute();
        return element;
      });
  };

  private selectChildrenAsSelectedBasedOnSelectionProp() {
    this.getChildren().forEach((element: HTMLTdsDropdownOptionElement) => {
      this.value.forEach((selection) => {
        if (element.value !== selection) {
          // If not multiselect, we need to unselect all other options.
          if (!this.multiselect) {
            element.setSelected(false);
          }
        } else {
          element.setSelected(true);
        }
      });
    });
  }

  /* Returns a list of all children that are tds-dropdown-option elements */
  private getChildren = () => {
    const tdsDropdownOptions = Array.from(this.host.children).filter(
      (element) => element.tagName === 'TDS-DROPDOWN-OPTION',
    ) as Array<HTMLTdsDropdownOptionElement>;
    if (tdsDropdownOptions.length === 0) {
      console.warn('TDS DROPDOWN: Data missing. Disregard if loading data asynchronously.');
    } else return tdsDropdownOptions;
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

  /* Toggles the open state of the Dropdown and sets focus to the input element */
  private handleToggleOpen = () => {
    if (!this.disabled) {
      this.open = !this.open;
      if (this.open) {
        this.focusInputElement();
      }
    }
  };

  /* Focuses the input element in the Dropdown, if the reference is present. */
  private focusInputElement = () => {
    if (this.inputElement) this.inputElement.focus();
  };

  private getSelectedChildren = () =>
    this.value
      ?.map((stringValue) => {
        const matchingElement = this.getChildren().find(
          (element: HTMLTdsDropdownOptionElement) => element.value === stringValue,
        );
        return matchingElement;
      })
      .filter(Boolean);

  private getSelectedChildrenLabels = () =>
    this.getSelectedChildren()?.map((element: HTMLTdsDropdownOptionElement) =>
      element.textContent.trim(),
    );

  private getValue = () => {
    const labels = this.getSelectedChildrenLabels();
    if (!labels) {
      return '';
    }
    return this.filter ? labels?.join(', ') : labels?.toString();
  };

  private setValueAttribute = () => {
    if (this.value?.toString() === '') this.value = null;
    this.host.setAttribute('value', this.value?.map((val) => val).toString() ?? null);
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
    this.handleFilter({ target: { value: this.inputElement.value } });
    this.inputElement.focus();
  };

  private handleFocus = (event) => {
    this.tdsFocus.emit(event);
  };

  private handleBlur = (event) => {
    this.tdsBlur.emit(event);
  };

  private handleChange = () => {
    this.tdsChange.emit({
      name: this.name,
      value: this.value?.map((value) => value).toString() ?? null,
    });
  };

  render() {
    appendHiddenInput(
      this.host,
      this.name,
      this.value?.map((value) => value).toString(),
      this.disabled,
    );
    return (
      <Host
        role="select"
        class={`${this.modeVariant ? `tds-mode-variant-${this.modeVariant}` : ''}`}
      >
        {this.label && this.labelPosition === 'outside' && (
          <div class={`label-outside ${this.disabled ? 'disabled' : ''}`}>{this.label}</div>
        )}
        <div class={`dropdown-select ${this.size} ${this.disabled ? 'disabled' : ''}`}>
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
                    ${this.value?.length ? 'selected' : ''}
                    `}
                  >
                    {this.label}
                  </div>
                )}
                <input
                  // eslint-disable-next-line no-return-assign
                  ref={(inputEl) => (this.inputElement = inputEl as HTMLInputElement)}
                  class={`${this.labelPosition === 'inside' ? 'placeholder' : ''}`}
                  type="text"
                  placeholder={this.placeholder}
                  value={this.getValue()}
                  disabled={this.disabled}
                  onInput={(event) => this.handleFilter(event)}
                  onBlur={(event) => {
                    this.filterFocus = false;
                    this.handleBlur(event);
                  }}
                  onFocus={(event) => {
                    this.open = true;
                    this.filterFocus = true;
                    this.handleFocus(event);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      this.open = false;
                    }
                  }}
                />
              </div>
              <tds-icon
                onClick={this.handleFilterReset}
                class={`${this.open && this.inputElement.value !== '' ? '' : 'hide'}`}
                /*
                class={{
                  hide: !this.open,
                }}
                */
                name="cross"
                size="16px"
              ></tds-icon>
              <tds-icon
                onClick={this.handleToggleOpen}
                class={`${this.open ? 'open' : 'closed'}`}
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
                ${this.value ? 'value' : 'placeholder'}
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
                    ${this.value?.length ? 'selected' : ''}
                    `}
                  >
                    {this.label}
                  </div>
                )}
                <div class={`placeholder ${this.size}`}>
                  {this.value?.length ? this.getValue() : this.placeholder}
                </div>
                <tds-icon
                  class={`${this.open ? 'open' : 'closed'}`}
                  name="chevron_down"
                  size="16px"
                ></tds-icon>
              </div>
            </button>
          )}
        </div>
        {/* DROPDOWN LIST */}
        <div
          ref={(element) => (this.dropdownList = element)}
          class={`dropdown-list
            ${this.size}
            ${this.open ? 'open' : 'closed'}
            ${this.getOpenDirection()}
            ${this.label && this.labelPosition === 'outside' ? 'label-outside' : ''}`}
        >
          <slot></slot>
          {this.filterResult === 0 && this.noResultText !== '' && (
            <div class={`no-result ${this.size}`}>{this.noResultText}</div>
          )}
        </div>
        {/* DROPDOWN LIST */}
        {this.helper && (
          <div class={`helper ${this.error ? 'error' : ''} ${this.disabled ? 'disabled' : ''}`}>
            {this.error && <tds-icon name="error" size="16px"></tds-icon>}
            {this.helper}
          </div>
        )}
      </Host>
    );
  }
}
