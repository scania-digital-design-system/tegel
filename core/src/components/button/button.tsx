import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { hasSlot } from '../../utils/utils';

/**
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
  @Prop() buttonType: 'button' | 'submit' | 'reset' = 'button';

  /** Type of Button's design */
  @Prop() type: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';

  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  /** Control for disabled state of a component */
  @Prop() disabled: boolean = false;

  /** When enabled, the Button takes 100% width */
  @Prop() fullbleed: boolean = false;

  /** Set the mode variant of the Button. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  @State() onlyIcon: boolean = false;

  connectedCallback() {
    if (!this.text) {
      this.onlyIcon = true;
      this.host.setAttribute('only-icon', '');
    }
  }

  render() {
    const usesIconSlot = hasSlot('icon', this.host);
    return (
      <Host class={`${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}`}>
        <button
          type={this.buttonType}
          disabled={this.disabled}
          class={{
            'primary': this.type === 'primary',
            'secondary': this.type === 'secondary',
            'ghost': this.type === 'ghost',
            'danger': this.type === 'danger',
            'lg': this.size === 'lg',
            'md': this.size === 'md',
            'sm': this.size === 'sm',
            'xs': this.size === 'xs',
            'disabled': this.disabled,
            'fullbleed': this.fullbleed,
            'icon': usesIconSlot,
            'only-icon': this.onlyIcon,
          }}
        >
          {this.text}
          <slot name="icon" />
        </button>
      </Host>
    );
  }
}
