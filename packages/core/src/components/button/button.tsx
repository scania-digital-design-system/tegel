import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import hasSlot from '../../utils/hasSlot';

/**
 * @slot label - Slot for the text injection. Serves as alternative to text prop.
 * @slot icon - Slot used to display an Icon in the Button.
 */
@Component({
  tag: 'tds-button',
  styleUrl: 'button.scss',
  shadow: false,
  scoped: true,
})
export class TdsButton {
  @Element() host: HTMLElement;

  /** Text displayed inside the Button */
  @Prop() text: string;

  /** Button's type */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /** Variation of Button's design */
  @Prop() variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';

  /** Size of a Button */
  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  /** Control for disabled state of a component */
  @Prop() disabled: boolean = false;

  /** When enabled, the Button takes 100% width */
  @Prop() fullbleed: boolean = false;

  /** Set the mode variant of the Button. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  @State() onlyIcon: boolean = false;

  render() {
    const hasLabelSlot = hasSlot('label', this.host);
    const hasIconSlot = hasSlot('icon', this.host);
    if (!this.text && !hasLabelSlot) {
      this.onlyIcon = true;
    }
    return (
      <Host
        class={`${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''} `}
        disabled={this.disabled}
      >
        <button
          type={this.type}
          disabled={this.disabled}
          class={{
            'primary': this.variant === 'primary',
            'secondary': this.variant === 'secondary',
            'ghost': this.variant === 'ghost',
            'danger': this.variant === 'danger',
            'lg': this.size === 'lg',
            'md': this.size === 'md',
            'sm': this.size === 'sm',
            'xs': this.size === 'xs',
            'disabled': this.disabled,
            'fullbleed': this.fullbleed,
            'icon': hasIconSlot,
            'only-icon': this.onlyIcon,
          }}
        >
          {this.text}
          {hasLabelSlot && !this.onlyIcon && <slot name="label" />}
          {hasIconSlot && <slot name="icon" />}
        </button>
      </Host>
    );
  }
}
