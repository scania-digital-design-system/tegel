import { Component, Host, h, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'sdds-chip',
  styleUrl: 'sdds-chip.scss',
  shadow: false,
  scoped: true,
})
export class SddsChip {
  /** Type of chip, depends on usage */
  @Prop() type: 'button' | 'radio' | 'checkbox' = 'button';

  /** Size of the chip component */
  @Prop() size: 'sm' | 'lg' = 'lg';

  /** ID used for internal chip functionality and events, must be unique.
   *
   * **NOTE**: If you're listening for input events you need to set this ID yourself to identify the input, as the default ID is random and will be different every time.
   */
  @Prop() chipId: string = crypto.randomUUID();

  /** Setting it to true set component state to checked. Valid only for type checkbox and radio. */
  @Prop() checked: boolean = false;

  /** Name for the checkbox or radio input element. Also creates a reference between label and input. Valid only for type checkbox and radio. */
  @Prop() name: string;

  /** Value of input. Valid only for type checkbox and radio. */
  @Prop() value: string;

  /** Sends unique chip identifier and value when it is changed (checked/unchecked). Valid only for type checkbox and radio. If no ID is specified a random one will be generated. To use this listener don't use the randomized ID, use a specific one of your choosing. */
  @Event({
    eventName: 'sddsChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  sddsChange: EventEmitter<{
    chipId: string;
    value: string;
  }>;

  private handleChange = () => {
    this.sddsChange.emit({
      chipId: this.chipId,
      value: this.value,
    });
  };

  /** Sends unique chip identifier when chip is clicked. Valid only for type button. If no ID is specified a random one will be generated. To use this listener don't use the randomized ID, use a specific one of your choosing. */
  @Event({
    eventName: 'sddsClick',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  sddsClick: EventEmitter<{
    chipId: string;
  }>;

  private handleClick = () => {
    this.sddsClick.emit({
      chipId: this.chipId,
    });
  };

  private renderInputAttributes() {
    if (this.type !== 'button') {
      return {
        value: this.value,
        checked: this.checked,
        name: this.name,
        onChange: () => this.handleChange(),
      };
    }
    return {
      onClick: () => this.handleClick(),
    };
  }

  render() {
    const inputAttributes = this.renderInputAttributes();

    return (
      <Host>
        <div class="component">
          <div class={`sdds-chip-component ${this.size}`}>
            <input type={this.type} id={this.chipId} {...inputAttributes}></input>
            <label htmlFor={this.chipId}>
              <slot name="label" />
            </label>
          </div>
        </div>
      </Host>
    );
  }
}
