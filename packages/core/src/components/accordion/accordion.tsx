import { Component, h, Host, Prop, State, Listen, Element } from '@stencil/core';

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
  @Prop() hideLastBorder: boolean = false;

  /** Possibility to auto close other accordion items when opening a new one */
  @Prop() autoClose: boolean = false;

  /** State to track which item is currently expanded */
  @State() expandedItem: string | null = null;

  /** Reference to the component element */
  @Element() el: HTMLElement;

  @Listen('tdsToggle')
  handleToggle(event: CustomEvent<{ expanded: boolean; header: string }>) {
    const { expanded, header } = event.detail;

    if (this.autoClose && expanded) {
      // Set the clicked item as expanded
      this.expandedItem = header;

      // Get all accordion items
      const accordionItems = Array.from(this.el.querySelectorAll('tds-accordion-item'));

      // Loop through each item
      accordionItems.forEach((item: any) => {
        // If the item is not the clicked item, collapse it
        if (item.header !== header) {
          item.setExpanded(false);
        } else {
          item.setExpanded(true);
        }
      });
    } else if (!expanded && this.expandedItem === header) {
      // If the same item is clicked again, collapse all
      this.expandedItem = null;
    } else if (!expanded) {
      // Update the state to null if nothing is expanded
      this.expandedItem = null;
    }
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
