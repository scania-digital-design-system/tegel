import { Component, h, Prop, Event, EventEmitter, Element } from '@stencil/core';

/**
 * @slot label - Slot for the label text.
 */
@Component({
  tag: 'tds-radio-button',
  styleUrl: 'radio-button.scss',
  shadow: false,
  scoped: true,
})
export class TdsRadioButton {
  @Element() host: HTMLElement;

  /** Name of Radio Button, used for reference. */
  @Prop() name: string;

  /** Value of input. */
  @Prop() value: string;

  /** Unique Radio Button identifier. */
  @Prop() radioId: string = crypto.randomUUID();

  /** Decides if the Radio Button is checked or not. */
  @Prop({ reflect: true }) checked: boolean = false;

  /** Decides if the Radio Button is required or not. */
  @Prop() required: boolean = false;

  /** Decides if the Radio Button is disabled or not. */
  @Prop() disabled: boolean = false;

  /** Sends unique Radio Button identifier and status when it is checked.
   * If no ID is specified, a random one will be generated.
   * To use this listener, don't use the randomized ID, use a specific one of your choosing. */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsChange: EventEmitter<{
    radioId: string;
    value: string;
  }>;

  handleChange = () => {
    this.tdsChange.emit({
      radioId: this.radioId,
      value: this.value,
    });
  };

  render() {
    return (
      <div class="tds-radio-button">
        <input
          class="tds-form-input"
          type="radio"
          name={this.name}
          id={this.radioId}
          value={this.value}
          checked={this.checked}
          aria-checked={this.checked}
          required={this.required}
          disabled={this.disabled}
          onChange={() => this.handleChange()}
        />
        <label htmlFor={this.radioId}>
          <slot name="label"></slot>
        </label>
      </div>
    );
  }
}
