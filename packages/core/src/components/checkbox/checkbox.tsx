import { Component, h, Prop, Event, EventEmitter, Method, Element } from '@stencil/core';
import generateUniqueId from '../../utils/generateUniqueId';

/**
 * @slot label - Slot for the label text.
 */
@Component({
  tag: 'tds-checkbox',
  styleUrl: 'checkbox.scss',
  shadow: false,
  scoped: true,
})
export class TdsCheckbox {
  @Element() host: HTMLElement;

  /** Name for the Checkbox's input element. */
  @Prop() name: string;

  /** ID for the Checkbox's input element. Randomly generated if not specified. */
  @Prop() checkboxId: string = generateUniqueId();

  /** Sets the Checkbox in a disabled state */
  @Prop() disabled: boolean = false;

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
      checkboxId: this.checkboxId,
      checked: this.checked,
    };
  }

  /** Sends unique Checkbox identifier and checked status when it is checked/unchecked. */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsChange: EventEmitter<{
    checkboxId: string;
    checked: boolean;
    value?: string;
  }>;

  handleChange = () => {
    this.checked = !this.checked;
    this.tdsChange.emit({
      checkboxId: this.checkboxId,
      checked: this.checked,
      value: this.value,
    });
  };

  /** Focus event for the Checkbox */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus: EventEmitter<FocusEvent>;

  /** Set the input as focus when clicking the component */
  handleFocus(event): void {
    this.tdsFocus.emit(event);
  }

  /** Blur event for the Checkbox */
  @Event({
    eventName: 'tdsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsBlur: EventEmitter<FocusEvent>;

  /** Set the input as blur when clicking outside the component */
  handleBlur(event): void {
    this.tdsBlur.emit(event);
  }

  render() {
    return (
      <div class="tds-checkbox">
        <input
          aria-checked={this.checked}
          aria-required={this.required}
          aria-describedby={this.host.getAttribute('aria-describedby')}
          aria-labelledby={this.host.getAttribute('aria-labelledby')}
          required={this.required}
          type="checkbox"
          name={this.name}
          value={this.value}
          id={this.checkboxId}
          checked={this.checked}
          disabled={this.disabled}
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
