import { Component, h, Host, Prop } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For accordion items.
 */
@Component({
  tag: 'tds-accordion',
  styleUrl: 'accordion.scss',
  shadow: true,
})
export class TdsAccordion {
  /** Set the variant of the Accordion. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  render() {
    return (
      <Host
        class={`tds-accordion ${
          this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''
        }`}
      >
        <slot></slot>
      </Host>
    );
  }
}
