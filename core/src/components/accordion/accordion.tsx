import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sdds-accordion',
  styleUrl: 'accordion.scss',
  shadow: true,
})
export class Accordion {
  /** Set the variant of the the accordion. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  render() {
    return (
      <Host
        class={`sdds-accordion ${this.modeVariant !== null ? `sdds-mode-variant-${this.modeVariant}`: ''}`}
      >
        <slot></slot>
      </Host>
    );
  }
}
