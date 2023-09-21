import { Component, Host, h, Element, State } from '@stencil/core';
import { Event, EventEmitter, Listen, Method, Prop, Watch } from '@stencil/core/internal';
import {
  appendHiddenInput,
  findNextFocusableItem,
  findPreviousFocusableItem,
} from '../../utils/utils';

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

  /** Text that is displayed if filter is used and there are no options that matches the search. */
  @Prop() noResultText: string = 'No result';

  /** Default value selected in the Dropdown. */
  @Prop() defaultValue: string;

  @State() open: boolean = false;

  @State() selection: Array<{ value: string; label: string }>;

  @State() filterResult: number;

  @State() filterFocus: boolean;

  private dropdownList: HTMLDivElement;

  private inputElement: HTMLInputElement;

  private children: Array<HTMLTdsDropdownOptionElement>;

  /** Method that resets the Dropdown, marks all children as non-selected and resets the value to null. */
  @Method()
  async reset() {
    this.children = this.getChildren().map((element: HTMLTdsDropdownOptionElement) => {
      element.setSelected(false);
      return element;
    });
    this.selection = null;
    this.host.setAttribute('value', null);
    this.handleChange();
  }

  /** Method for setting the value of the Dropdown. */
  @Method()
  async setValue(newValue: string, newValueLabel: string) {
    // Check if any of the dropdown options has the value that is passed to the method.
    if (
      this.getChildren().some((element: HTMLTdsDropdownOptionElement) => element.value === newValue)
    ) {
      if (this.multiselect) {
        this.selection = this.selection
          ? [...this.selection, { value: newValue, label: newValueLabel }]
          : [{ value: newValue, label: newValueLabel }];
      } else {
        this.selection = [{ value: newValue, label: newValueLabel }];
      }
      this.host.setAttribute(
        'value',
        this.selection.map((selection) => selection.value).toString(),
      );
      this.selectChildrenAsSelectedBasedOnSelectionProp();
      this.handleChange();
    }
    return this.selection;
  }

  /** Method for removing a selected value in the Dropdown. */
  @Method()
  async removeValue(oldValue: string) {
    if (this.multiselect) {
      this.children = this.getChildren().map((element: HTMLTdsDropdownOptionElement) => {
        if (element.value === oldValue) {
          this.selection = this.selection.filter((item) => item.value !== element.value);
          element.setSelected(false);
        }
        return element;
      });
    } else {
      this.reset();
    }
    this.handleChange();
    return this.selection;
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

    if (event.key === 'ArrowDown') {
      /* Get the index of the current focus index, if there is no
      nextElementSibling return the index for the first child in our Dropdown.  */

      const startingIndex = activeElement.nextElementSibling
        ? this.children.findIndex((element) => element === activeElement.nextElementSibling)
        : 0;

      const elementIndex = findNextFocusableItem(this.children, startingIndex);
      this.children[elementIndex].focus();
    } else if (event.key === 'ArrowUp') {
      /* Get the index of the current focus index, if there is no
      previousElementSibling return the index for the first last in our Dropdown.  */
      const startingIndex = activeElement.nextElementSibling
        ? this.children.findIndex((element) => element === activeElement.previousElementSibling)
        : 0;

      const elementIndex = findPreviousFocusableItem(this.children, startingIndex);
      this.children[elementIndex].focus();
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
        this.inputElement.value = this.selection?.map((item) => item.label).toString() ?? null;
      }
    }
  }

  componentDidLoad() {
    if (this.defaultValue) {
      this.setDefaultOption();
    }
  }

  setDefaultOption = () => {
    this.children = Array.from(this.host.children)
      .filter((element) => element.tagName === 'TDS-DROPDOWN-OPTION')
      .map((element: HTMLTdsDropdownOptionElement) => {
        if (this.multiselect) {
          this.defaultValue.split(',').forEach((value) => {
            if (value === element.value) {
              element.setSelected(true);
              this.selection = this.selection
                ? [...this.selection, { value: element.value, label: element.textContent }]
                : [{ value: element.value, label: element.textContent }];
            }
          });
        } else {
          if (this.defaultValue === element.value) {
            element.setSelected(true);
            this.selection = [{ value: element.value, label: element.textContent }];
          } else {
            element.setSelected(false);
          }
        }
        return element;
      });
  };

  selectChildrenAsSelectedBasedOnSelectionProp() {
    this.children = this.getChildren().map((element: HTMLTdsDropdownOptionElement) => {
      this.selection.forEach((selection) => {
        if (element.value !== selection.value) {
          element.setSelected(false);
        } else {
          element.setSelected(true);
        }
      });
      return element;
    });
  }

  /* Returns a list of all children that are are tds-dropdown-option elements */
  private getChildren = () =>
    Array.from(this.host.children).filter((element) => element.tagName === 'TDS-DROPDOWN-OPTION');

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

  getValue = () => {
    if (this.filter) {
      return this.selection?.map((item) => item.label).toString();
    }
    return this.selection?.map((item) => item.label).join(', ');
  };

  handleFilter = (event) => {
    this.tdsInput.emit(event);
    const query = event.target.value.toLowerCase();
    /* Check if the query is empty, and if so, show all options */
    if (query === '') {
      this.children = this.children.map((element) => {
        element.removeAttribute('hidden');
        return element;
      });
      this.filterResult = null;
      /* Hide the options that do not match the query */
    } else {
      this.filterResult = this.children.filter((element) => {
        if (!element.textContent.toLowerCase().includes(query.toLowerCase())) {
          element.setAttribute('hidden', '');
        } else {
          element.removeAttribute('hidden');
        }
        return !element.hasAttribute('hidden');
      }).length;
    }
  };

  handleFocus = (event) => {
    this.tdsFocus.emit(event);
  };

  handleBlur = (event) => {
    this.tdsBlur.emit(event);
  };

  handleChange = () => {
    this.tdsChange.emit({
      name: this.name,
      value: this.selection?.map((item) => item.value).toString() ?? null,
    });
  };

  render() {
    appendHiddenInput(
      this.host,
      this.name,
      this.selection?.map((item) => item.value).toString(),
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
              class={`filter ${this.filterFocus ? 'focus' : ''}
            ${this.disabled ? 'disabled' : ''}`}
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
                    ${this.selection?.length ? 'selected' : ''}
                    `}
                  >
                    {this.label}
                  </div>
                )}
                <input
                  // eslint-disable-next-line no-return-assign
                  ref={(element) => (this.inputElement = element)}
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
                onClick={() => {
                  this.open = !this.open;
                }}
                class={`${this.open ? 'open' : 'closed'}`}
                name="chevron_down"
                size="16px"
              ></tds-icon>
            </div>
          ) : (
            <button
              onClick={() => {
                this.open = !this.open;
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  this.open = false;
                }
              }}
              class={`
                ${this.selection ? 'value' : 'placeholder'}
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
                    ${this.selection?.length ? 'selected' : ''}
                    `}
                  >
                    {this.label}
                  </div>
                )}
                <div class={`placeholder ${this.size}`}>
                  {this.selection?.length ? this.getValue() : this.placeholder}
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
          {this.filterResult === 0 && (
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
