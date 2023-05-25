import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { disableClickOnElement } from '../../utils/utils';

@Component({
  tag: 'tds-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class TdsButton {
  @Element() host: HTMLElement;

  /** Text displayed inside the Button */
  @Prop() text: string;

  /** Type of Button */
  @Prop() type: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';

  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  /** Control for disabled state of a component */
  @Prop() disabled: boolean = false;

  /** When enabled, the Button takes 100% width */
  @Prop() fullbleed: boolean = false;

  /** Set the mode variant of the Button. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  @State() onlyIcon: boolean = false;

  @State() slotElement: Element;

  connectedCallback() {
    this.slotElement = this.host.children ? this.host.children[0] : null;
    if (this.disabled) {
      disableClickOnElement(this.host);
      if (this.slotElement?.slot === 'icon') {
        disableClickOnElement(this.slotElement);
      }
    }

    if (!this.text) {
      this.onlyIcon = true;
      this.host.setAttribute('only-icon', '');
    }
  }

  render() {
    return (
      <Host class={`${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}`}>
        <button
          disabled={this.disabled}
          class={`${this.type}
            ${this.size}
            ${this.disabled ? 'disabled' : ''}
            ${this.fullbleed ? 'fullbleed' : ''}
            ${this.onlyIcon ? 'only-icon' : ''}
            `}
        >
          {this.text}
          <slot name="icon" />
        </button>
      </Host>
    );
  }
}
