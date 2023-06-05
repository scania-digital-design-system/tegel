import { Component, h, Prop, Event, EventEmitter, Method, Element } from '@stencil/core';

@Component({
  tag: 'sdds-checkbox',
  styleUrl: 'sdds-checkbox.scss',
  shadow: false,
  scoped: true,
})
export class SddsCheckbox {
  @Element() host: HTMLElement;

  /** Name for the checkbox's input element. */
  @Prop() name: string;

  /** ID for the checkbox's input element. Randomly generated if not specified. */
  @Prop() checkboxId: string = crypto.randomUUID();

  /** Sets the Checkbox in a disabled state */
  @Prop() disabled: boolean = false;

  /** Sets the Checkbox in a indeterminate state */
  @Prop() indeterminate: boolean = false;

  /** Make the Checkbox required */
  @Prop() required: boolean = false;

  /** Sets the Checkbox as checked */
  @Prop({ reflect: true }) checked: boolean = false;

  /** Value for the Checkbox */
  @Prop() value: string;

  /** Toggles the checked value of the component. */
  @Method()
  async toggleCheckbox() {
    this.checked = !this.checked;
    return {
      indeterminate: this.indeterminate,
      checkboxId: this.checkboxId,
      checked: this.checked,
    };
  }

  /** Sends unique Checkbox identifier and checked status when it is checked/unchecked. */
  @Event({
    eventName: 'sddsChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  sddsChange: EventEmitter<{
    checkboxId: string;
    checked: boolean;
    indeterminate: boolean;
    value?: string;
  }>;

  handleChange = () => {
    this.checked = !this.checked;
    this.sddsChange.emit({
      checkboxId: this.checkboxId,
      checked: this.checked,
      indeterminate: this.indeterminate,
      value: this.value,
    });
  };

  /** Focus event for the Checkbox */
  @Event({
    eventName: 'sddsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  sddsFocus: EventEmitter<FocusEvent>;

  /** Set the input as focus when clicking the whole textfield with suffix/prefix */
  handleFocus(event): void {
    this.sddsFocus.emit(event);
  }

  /** Blur event for the Checkbox */
  @Event({
    eventName: 'sddsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  sddsBlur: EventEmitter<FocusEvent>;

  /** Set the input as focus when clicking the whole textfield with suffix/prefix */
  handleBlur(event): void {
    this.sddsBlur.emit(event);
  }

  render() {
    return (
      <div class="sdds-checkbox-webcomponent">
        <input
          aria-checked={this.checked}
          aria-required={this.required}
          aria-indeterminate={this.indeterminate}
          aria-describedby={this.host.getAttribute('aria-describedby')}
          aria-labelledby={this.host.getAttribute('aria-labelledby')}
          required={this.required}
          type="checkbox"
          name={this.name}
          value={this.value}
          id={this.checkboxId}
          checked={this.checked}
          disabled={this.disabled}
          indeterminate={this.indeterminate}
          onFocus={(event) => this.handleFocus(event)}
          onBlur={(event) => this.handleBlur(event)}
          onChange={() => {
            this.handleChange();
          }}
        />
        <label htmlFor={this.checkboxId}>
          <slot name="label"></slot>
        </label>
      </div>
    );
  }
}
