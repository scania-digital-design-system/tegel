import { Component, h, Host, Prop, Element } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For accordion items.
 */
@Component({
  tag: 'tds-accordion',
  styleUrl: 'accordion.scss',
  shadow: true,
})
export class TdsAccordion {
  @Element() host: HTMLElement;

  /** Set the variant of the Accordion. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Removes the bottom border of the last Accordion item. */
  @Prop() hideLastBorder: boolean = false;

  @Prop() animation: 'none' | 'slide' = 'slide';

  componentDidLoad() {
    // After the component has rendered, find all child <tds-accordion-item> elements
    const items = this.host.querySelectorAll('tds-accordion-item');
    items.forEach((item: HTMLElement & { animation?: string }) => {
      // Set the animation prop on each Accordion Item
      item.animation = this.animation;
    });
  }

  render() {
    return (
      <Host
        class={{
          'tds-accordion': true,
          [`tds-mode-variant-${this.modeVariant || ''}`]: Boolean(this.modeVariant),
          'hide-last-border': this.hideLastBorder,
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}
