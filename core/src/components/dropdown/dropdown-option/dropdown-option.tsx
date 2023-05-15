import {
  Component,
  h,
  Prop,
  State,
  Element,
  Host,
  Event,
  EventEmitter,
  Listen,
} from '@stencil/core';

@Component({
  tag: 'sdds-dropdown-option',
  styleUrl: './../dropdown.scss',
  shadow: true,
})
export class DropdownOption {
  @Element() host: HTMLElement;

  // Used as a fallback if value prop is not recognized to match handleClick
  @State() innerValue: string;

  /** Selected set to true if selected */
  @Prop() selected: boolean = false;

  /** Sets option to disabled state if true */
  @Prop() disabled: boolean = false;

  /** Value is a unique string that will be used for application logic */
  @Prop({ reflect: true }) value: string;

  /** @internal Fires on click on one of the Dropdown items */
  @Event({
    eventName: 'internalSddsSelect',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalSddsSelect: EventEmitter<{
    value: string | number;
    label: string | number;
    parent: HTMLSddsDropdownElement;
  }>;

  isMultiSelectOption: boolean;

  @Listen('mouseover')
  changeFocusHandler() {
    this.host.focus();
  }

  @Listen('mouseout')
  removeFocusHandler() {
    this.host.blur();
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.handleClick({
        value: this.value,
        label: this.host.innerText,
        parent: this.host.parentNode,
      });
    }
  }

  componentWillLoad() {
    this.innerValue = this.value;
    this.isMultiSelectOption = this.host
      .closest('sdds-dropdown')
      .classList.contains('sdds-dropdown-multiselect');
  }

  handleClick(value) {
    if (!this.disabled) {
      const listOptions = value.parent.childNodes;
      this.internalSddsSelect.emit(value);
      if (!this.isMultiSelectOption) {
        listOptions.forEach((optionEl) => {
          optionEl.selected = false;
        });
      }
      const optionCheckbox = this.host.shadowRoot.querySelector('input');

      if (this.selected) {
        this.selected = false;
        if (optionCheckbox) {
          optionCheckbox.checked = false;
        }
      } else {
        this.selected = true;
        if (optionCheckbox) {
          optionCheckbox.checked = true;
        }
      }
    }
  }

  render() {
    return (
      <Host
        onClick={(event) => {
          if (this.isMultiSelectOption) {
            event.stopPropagation();
          }
          return this.handleClick({
            value: this.value,
            label: this.host.innerText,
            parent: event.target.parentNode,
          });
        }}
        class={{
          'selected': this.selected,
          'sdds-dropdown-option-disabled': this.disabled,
        }}
        tabindex="-1"
        aria-disabled={this.disabled}
      >
        {this.isMultiSelectOption && (
          <div class="sdds-checkbox-item sdds-option-checkbox">
            <sdds-checkbox checked={this.selected} disabled={this.disabled}></sdds-checkbox>
          </div>
        )}
        <span class="sdds-option-label">
          <slot />
        </span>
        {!this.isMultiSelectOption && (
          <span class="sdds-option-checkmark">
            <svg
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 3L4 6L9 1"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        )}
      </Host>
    );
  }
}
