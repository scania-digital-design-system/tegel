import { Component, h, Prop, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'sdds-radio-button',
  styleUrl: 'radio-button-component.scss',
  shadow: false,
  scoped: true,
})
export class RadioButton {
  @Element() host: HTMLElement;

  /** Name of radio button, used for reference. */
  @Prop() name: string;

  /** Value of input. */
  @Prop() value: string;

  /** REMEMBER TO ENABLE ARIA PROPS ONCE ALIGNMET HAS BEEN MADE! */

  /** Label mainly used for accesibility tools. */
  // @Prop() ariaLabelledBy: string;

  /** Label mainly used for accesibility tools. */
  // @Prop() ariaDescribedBy: string;

  /** Unique radio button identifier. */
  @Prop() radioId: string = crypto.randomUUID();

  /** Decides if the radio button is checked or not. */
  @Prop({ reflect: true }) checked: boolean = false;

  /** Decides if the radio button is required or not. */
  @Prop() required: boolean = false;

  /** Decides if the radio button is disabled or not. */
  @Prop() disabled: boolean = false;

  /** Sends unique radio button identifier and status when it is checked. If no ID is specified a random one will be generated. To use this listener don't use the randomized ID, use a specific one of your choosing. */
  @Event({
    eventName: 'sddsChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  sddsChange: EventEmitter<{
    radioId: string;
    value: string;
  }>;

  handleChange = () => {
    this.sddsChange.emit({
      radioId: this.radioId,
      value: this.value,
    });
  };

  render() {
    return (
      <div class="sdds-radio-button">
        <input
          class="sdds-form-input"
          type="radio"
          name={this.name}
          id={this.radioId}
          value={this.value}
          checked={this.checked}
          aria-checked={this.checked}
          // REMEMBER TO ENABLE ARIA PROPS ONCE ALIGNMENT HAS BEEN MADE!
          // aria-labelledby={this.ariaLabelledBy}
          // aria-describedby={this.host.getAttribute('aria-describedby')}
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
