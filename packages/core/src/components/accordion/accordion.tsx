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

  /** Removes the bottom border of the last Accordion item. */
  @Prop() noLastBorder: boolean = false;

  render() {
    return (
      <Host
        class={{
          'tds-accordion': true,
          [`tds-mode-variant-${this.modeVariant || ''}`]: Boolean(this.modeVariant),
          'tds-accordion-no-last-border': this.noLastBorder,
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}
