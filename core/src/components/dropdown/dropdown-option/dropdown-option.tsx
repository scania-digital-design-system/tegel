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
  tag: 'tds-dropdown-option',
  styleUrl: './../dropdown.scss',
  shadow: true,
})
export class TdsDropdownOption {
  @Element() host: HTMLElement;

  // Used as a fallback if value prop is not recognized to match handleClick
  @State() innerValue: string;

  /** Set to true if selected */
  @Prop() selected: boolean = false;

  /** Sets option to disabled state if true */
  @Prop() disabled: boolean = false;

  /** Value is a unique string that will be used for application logic */
  @Prop({ reflect: true }) value: string;

  /** @internal Fires on click on one of the Dropdown items */
  @Event({
    eventName: 'internalTdsSelect',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsSelect: EventEmitter<{
    value: string | number;
    label: string | number;
    parent: HTMLTdsDropdownElement;
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
      .closest('tds-dropdown')
      .classList.contains('tds-dropdown-multiselect');
  }

  handleClick(value) {
    if (!this.disabled) {
      const listOptions = value.parent.childNodes;
      this.internalTdsSelect.emit(value);
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
          'tds-dropdown-option-disabled': this.disabled,
        }}
        tabindex="-1"
        aria-disabled={this.disabled}
      >
        {this.isMultiSelectOption && (
          <div class="tds-checkbox-item tds-option-checkbox">
            <tds-checkbox checked={this.selected} disabled={this.disabled}></tds-checkbox>
          </div>
        )}
        <span class="tds-option-label">
          <slot />
        </span>
        {!this.isMultiSelectOption && (
          <span class="tds-option-checkmark">
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
