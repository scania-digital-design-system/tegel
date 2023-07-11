import { Component, Host, h, Event, EventEmitter, Prop, Element } from '@stencil/core';
import { generateUniqueId, hasSlot  } from '../../utils/utils';

/**
 * @slot prefix - Slot for the prefix icon.
 * @slot label - Slot for the label text.
 * @slot suffix- Slot for the suffix icon.
 */
@Component({
  tag: 'tds-chip',
  styleUrl: 'chip.scss',
  shadow: false,
  scoped: true,
})
export class TdsChip {
  @Element() host: HTMLElement;

  /** Type of Chip, depends on usage */
  @Prop() type: 'button' | 'radio' | 'checkbox' = 'button';

  /** Size of the Chip component */
  @Prop() size: 'sm' | 'lg' = 'lg';

  /** ID used for internal Chip functionality and events, must be unique.
   *
   * **NOTE**: If you're listening for input events, you need to set this ID yourself to identify the input,
   * as the default ID is random and will be different every time.
   */
  @Prop() chipId: string = generateUniqueId();

  /** Controls component's checked attribute. Valid only for type checkbox and radio. */
  @Prop() checked: boolean = false;

  /** Name for the checkbox or radio input element. Also creates a reference between label and input. Valid only for type checkbox and radio. */
  @Prop() name: string;

  /** Value of input. Valid only for type checkbox and radio. */
  @Prop() value: string;

  /** Sends unique Chip identifier and value when it is changed (checked/unchecked).
   * Valid only for type checkbox and radio.
   * If no ID is specified, a random one will be generated.
   * To use this listener, don't use the randomized ID, use a specific one of your choosing. */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsChange: EventEmitter<{
    chipId: string;
    value: string;
  }>;

  private handleChange = () => {
    this.tdsChange.emit({
      chipId: this.chipId,
      value: this.value,
    });
  };

  /** Sends unique Chip identifier when Chip is clicked.
   * Valid only for type button.
   * If no ID is specified, a random one will be generated.
   * To use this listener, don't use the randomized ID, use a specific one of your choosing. */
  @Event({
    eventName: 'tdsClick',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsClick: EventEmitter<{
    chipId: string;
  }>;

  private handleClick = () => {
    this.tdsClick.emit({
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
    const hasPrefixSlot = hasSlot('prefix', this.host);
    const hasLabelSlot = hasSlot('label', this.host);
    const hasSuffixSlot = hasSlot('suffix', this.host);

    return (
      <Host>
        <div class="component">
          <div
            class={`tds-chip-component ${this.size}  ${hasPrefixSlot && 'prefix'} ${
              hasSuffixSlot && 'suffix'
            }`}
          >
            <input type={this.type} id={this.chipId} {...inputAttributes}></input>
            <label htmlFor={this.chipId}>
              {hasPrefixSlot && <slot name="prefix" />}
              {hasLabelSlot && <slot name="label" />}
              {hasSuffixSlot && <slot name="suffix" />}
            </label>
          </div>
        </div>
      </Host>
    );
  }
}
