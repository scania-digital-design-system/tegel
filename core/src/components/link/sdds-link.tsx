import { Component, h, Prop, Element } from '@stencil/core';
import { HostElement } from '@stencil/core/internal';

@Component({
  tag: 'sdds-link',
  styleUrl: 'sdds-link.scss',
  shadow: false,
})
export class SddsLink {
  /** Disables the link */
  @Prop() disabled: boolean = false;

  /** Displays the link with an underline. */
  @Prop() underline: boolean = true;

  @Element() host: HostElement;

  connectedCallback() {
    this.host.children[0].classList.add('sdds-link-component');
  }

  render() {
    return (
      <div
        class={`
          ${this.disabled ? 'disabled' : ''}
          ${!this.underline ? 'no-underline' : ''}
          `}
      >
        <slot></slot>
      </div>
    );
  }
}
