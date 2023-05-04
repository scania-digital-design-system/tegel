import { Component, Host, h, Element, State } from '@stencil/core';
import { Event, EventEmitter, Listen, Method, Prop, Watch } from '@stencil/core/internal';
import {
  appendChildElement,
  appendHiddenInput,
  findNextFocusableItem,
  findPreviousFocusableItem,
} from '../../utils/utils';

@Component({
  tag: 'sdds-dropdown-v2',
  styleUrl: 'dropdown-v2.scss',
  shadow: true,
})
export class SddsDropdownV2 {
  @Element() host: HTMLElement;

  /** Name for the dropdowns input element. */
  @Prop() name: string;

  /** Sets the dropdown in a disabled state */
  @Prop() disabled: boolean = false;

  /** Helper text for the dropdown. */
  @Prop() helper: string;

  /** Label text for the dropdown. */
  @Prop() label: string;

  /** Label text position */
  @Prop() labelPosition: 'inside' | 'outside';

  /** Mode variant of the component, based on current mode. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** The direction the dropdown should open, auto if not specified. */
  @Prop() openDirection: 'up' | 'down' | 'auto' = 'auto';

  /** Placeholder text for the dropdown. */
  @Prop() placeholder: string;

  /** The size of the dropdown. */
  @Prop() size: 'sm' | 'md' | 'lg' = 'lg';

  /** Sets the dropdown in an error state */
  @Prop() error: boolean = false;

  /** Enables multiselect in the dropdown. */
  @Prop() multiselect: boolean = false;

  /** Enables filtration in the dropdown. */
  @Prop() filter: boolean = false;

  /** Text that is displayed if filter is used and there are no options that matches the search. */
  @Prop() noResultText: string = 'No result';

  /** Default value selected in the dropdown. */
  @Prop() defaultValue: string;

  /** Populate the dropdown via a JSON array */
  @Prop() options: Array<{ value: string; label: string; disabled: boolean }>;

  @State() open: boolean = false;

  @State() selection: Array<{ value: string; label: string }>;

  @State() filterResult: number;

  @State() filterFocus: boolean;

  private dropdownList: HTMLDivElement;

  private inputElement: HTMLInputElement;

  private children: Array<HTMLSddsDropdownOptionV2Element>;

  /** Method that resets the dropdown. */
  @Method()
  async reset() {
    this.children.forEach((element) => element.setSelected(false));
    this.selection = null;
    this.handleChange();
  }

  /** Method for setting the value of the dropdown. */
  @Method()
  async setValue(newValue: string, newValueLabel: string) {
    if (this.multiselect) {
      this.selection = this.selection
        ? [...this.selection, { value: newValue, label: newValueLabel }]
        : [{ value: newValue, label: newValueLabel }];
    } else {
      this.selection = [{ value: newValue, label: newValueLabel }];
      this.children = this.children.map((element: HTMLSddsDropdownOptionV2Element) => {
        if (element.value !== newValue) {
          element.setSelected(false);
        }
        return element;
      });
    }
    this.handleChange();
    return this.selection;
  }

  /** Method for removing a selected value in the dropdown. */
  @Method()
  async removeValue(oldValue: string) {
    if (this.multiselect) {
      this.children.forEach((element) => {
        if (element.value === oldValue) {
          this.selection = this.selection.filter((item) => item.value !== element.value);
          element.setSelected(false);
        }
      });
    } else {
      this.reset();
    }
    this.handleChange();
    return this.selection;
  }

  /** Method for closing the dropdown. */
  @Method()
  async close() {
    this.open = false;
  }

  /** Change event for the dropdown. */
  @Event({
    eventName: 'sddsChange',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  sddsChange: EventEmitter<{
    name: string;
    value: string;
  }>;

  /** Focus event for the dropdown. */
  @Event({
    eventName: 'sddsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  sddsFocus: EventEmitter<FocusEvent>;

  /** Blur event for the dropdown. */
  @Event({
    eventName: 'sddsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  sddsBlur: EventEmitter<FocusEvent>;

  /** Input event for the dropdown. */
  @Event({
    eventName: 'sddsInput',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  sddsInput: EventEmitter<InputEvent>;

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
      /* Get the index of the currently focus index, if there is no 
      nextElementSibling return the index for the first child in our dropdown.  */

      const startingIndex = activeElement.nextElementSibling
        ? this.children.findIndex((element) => element === activeElement.nextElementSibling)
        : 0;

      const elementIndex = findNextFocusableItem(this.children, startingIndex);
      this.children[elementIndex].focus();
    } else if (event.key === 'ArrowUp') {
      /* Get the index of the currently focus index, if there is no 
      previousElementSibling return the index for the first last in our dropdown.  */
      const startingIndex = activeElement.nextElementSibling
        ? this.children.findIndex((element) => element === activeElement.previousElementSibling)
        : 0;

      const elementIndex = findPreviousFocusableItem(this.children, startingIndex);
      this.children[elementIndex].focus();
    } else if (event.key === 'Escape') {
      this.open = false;
    }
  }

  // If the dropdown gets closed this sets the value of the drodpown to the current selection labels or null if no selection is made.
  @Watch('open')
  handleOpenState() {
    if (this.filter && this.multiselect) {
      if (!this.open) {
        this.inputElement.value = this.selection?.map((item) => item.label).toString() ?? null;
      }
    }
  }

  connectedCallback = () => {
    if (!this.options) {
      this.children = Array.from(this.host.children) as Array<HTMLSddsDropdownOptionV2Element>;
    }
  };

  componentDidLoad() {
    if (this.defaultValue) {
      this.setDefaultOption();
    }
    if (this.openDirection === 'auto') {
      this.getOpenDirection();
    }
  }

  setDefaultOption = () => {
    this.children = this.children.map((element: HTMLSddsDropdownOptionV2Element) => {
      if (this.multiselect) {
        this.defaultValue.split(',').forEach((defaultValue) => {
          if (defaultValue === element.value) {
            element.setSelected(true);
            this.selection = this.selection
              ? [...this.selection, { value: element.value, label: element.textContent }]
              : [{ value: element.value, label: element.textContent }];
          }
        });
      } else {
        if (this.defaultValue === element.value) {
          this.reset();
          element.setSelected(true);
          this.selection = [{ value: element.value, label: element.textContent }];
        }
      }
      return element;
    });
    this.handleChange();
  };

  getOpenDirection = () => {
    const dropdownMenuHeight = this.dropdownList.offsetHeight;
    const distanceToBottom = this.host.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;
    if (distanceToBottom + dropdownMenuHeight + 57 > viewportHeight) {
      this.openDirection = 'up';
    } else {
      this.openDirection = 'down';
    }
  };

  getValue = () => {
    if (this.filter) {
      return this.selection?.map((item) => item.label).toString();
    }
    return this.selection?.map((item) => item.label).join(', ');
  };

  handleFilter = (event) => {
    this.sddsInput.emit(event);
    const query = event.target.value.toLowerCase();
    /* Check if the query is empty, and if so show all options */
    if (query === '') {
      this.children = this.children.map((element) => {
        element.removeAttribute('hidden');
        return element;
      });
      this.filterResult = null;
      /* Hide the options that does not match the query */
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
    this.sddsFocus.emit(event);
  };

  handleBlur = (event) => {
    this.sddsBlur.emit(event);
  };

  handleChange = () => {
    this.sddsChange.emit({
      name: this.name,
      value: this.selection?.map((item) => item.value).toString() ?? null,
    });
  };

  render() {
    if (this.options) {
      let id = 0;
      this.options.forEach((option) => {
        appendChildElement(
          this.host,
          'sdds-dropdown-option-v2',
          [
            { key: 'value', value: option.value },
            { key: 'disabled', value: option.disabled.toString() },
          ],
          option.label,
          `id${id++}`,
        );
      });
      this.children = Array.from(this.host.children).filter(
        (element) => element.tagName === 'SDDS-DROPDOWN-OPTION-V2',
      ) as HTMLSddsDropdownOptionV2Element[];
    }

    appendHiddenInput(
      this.host,
      this.name,
      this.selection?.map((item) => item.value).toString(),
      this.disabled,
    );
    return (
      <Host
        role="select"
        class={`${this.modeVariant ? `sdds-mode-variant-${this.modeVariant}` : ''}`}
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
              <sdds-icon
                onClick={() => {
                  this.open = !this.open;
                }}
                class={`${this.open ? 'open' : 'closed'}`}
                name="chevron_down"
                size="16px"
              ></sdds-icon>
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
                <sdds-icon
                  class={`${this.open ? 'open' : 'closed'}`}
                  name="chevron_down"
                  size="16px"
                ></sdds-icon>
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
            ${this.openDirection}
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
            {this.error && <sdds-icon name="error" size="16px"></sdds-icon>}
            {this.helper}
          </div>
        )}
      </Host>
    );
  }
}
