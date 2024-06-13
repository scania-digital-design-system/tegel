import { Component, Host, h, Event, EventEmitter, Prop, Element } from '@stencil/core';
import generateUniqueId from '../../utils/generateUniqueId';
import hasSlot from '../../utils/hasSlot';

/**
 * @slot prefix - Slot for the prefix icon.
 * @slot label - Slot for the label text.
 * @slot suffix - Slot for the suffix icon.
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
  @Prop({ reflect: true, mutable: true }) checked: boolean = false;

  /** Name for the checkbox or radio input element. Also creates a reference between label and input. Valid only for type checkbox and radio. */
  @Prop() name: string;

  /** Value of input. Valid only for type checkbox and radio. */
  @Prop() value: string;

  /** Sets the Chip in a disabled state */
  @Prop() disabled: boolean = false;

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
    checked?: boolean;
  }>;

  private handleChange = () => {
    if (!this.disabled) {
      // Only proceed if not disabled
      if (this.type === 'checkbox') {
        this.checked = !this.checked;
      } else if (this.type === 'radio') {
        this.checked = true;
      } else {
        console.error('Unsupported type in Chip component!');
      }

      this.tdsChange.emit({
        chipId: this.chipId,
        checked: this.checked,
        value: this.value,
      });
    }
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
    if (!this.disabled) {
      // Only proceed if not disabled
      this.tdsClick.emit({
        chipId: this.chipId,
      });
    }
  };

  private renderInputAttributes() {
    const commonAttributes = {
      disabled: this.disabled,
    };

    if (this.type !== 'button') {
      return {
        ...commonAttributes,
        value: this.value,
        checked: this.checked,
        name: this.name,
        onChange: () => this.handleChange(),
      };
    }
    return {
      ...commonAttributes,
      onClick: () => this.handleClick(),
    };
  }

  render() {
    const inputAttributes = this.renderInputAttributes();
    const hasPrefixSlot = hasSlot('prefix', this.host);
    const hasLabelSlot = hasSlot('label', this.host);
    const hasSuffixSlot = hasSlot('suffix', this.host);

    const chipClasses = {
      'tds-chip-component': true,
      'sm': this.size === 'sm',
      'lg': this.size === 'lg',
      'prefix': hasPrefixSlot,
      'suffix': hasSuffixSlot,
      'disabled': this.disabled,
    };

    return (
      <Host>
        <div class="component">
          <div class={chipClasses}>
            <input type={this.type} id={this.chipId} {...inputAttributes}></input>
            <label onClick={(event) => event.stopPropagation()} htmlFor={this.chipId}>
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
