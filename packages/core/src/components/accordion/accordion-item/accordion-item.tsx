import { Component, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import generateUniqueId from '../../../utils/generateUniqueId';

/**
 * @slot <default> - <b>Unnamed slot.</b> For content of an expanded accordion.
 * @slot header - Slot for the Accordion Item header.
 */

@Component({
  tag: 'tds-accordion-item',
  styleUrl: 'accordion-item.scss',
  shadow: true,
})
export class TdsAccordionItem {
  /** The header gives users the context about the additional information available inside the panel */
  @Prop() header: string = '';

  /** Changes position of the expand icon. */
  @Prop() expandIconPosition: 'start' | 'end' = 'end';

  /** Disabled option in `boolean`. */
  @Prop() disabled: boolean = false;

  /** Set to true to expand panel open */
  @Prop() expanded: boolean = false;

  /** When true, 16px on right padding instead of 64px */
  @Prop() paddingReset: boolean = false;

  /** Method for toggling the expanded state of the Accordion Item. */
  @Method()
  async toggleAccordionItem() {
    // This is negated in order to emit the value the Accordion Item will have after it has expanded/redacted.
    const event = this.tdsToggle.emit({
      expanded: !this.expanded,
    });
    if (!event.defaultPrevented) {
      this.expanded = !this.expanded;
    }
  }

  /** Fires when the Accordion Item is clicked, but before it is closed or opened. */
  @Event({
    eventName: 'tdsToggle',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsToggle: EventEmitter<{
    expanded: boolean;
  }>;

  render() {
    const primaryElementId = generateUniqueId();
    const secondaryElementId = generateUniqueId();
    return (
      <Host>
        <div
          class={`tds-accordion-item
        ${this.disabled ? 'disabled' : ''}
        ${this.expanded ? 'expanded' : ''}
        `}
        >
          <div role="heading" aria-level="6">
            <button
              id={secondaryElementId}
              aria-controls={primaryElementId}
              type="button"
              aria-expanded={this.expanded ? 'true' : 'false'}
              aria-disabled={this.disabled}
              class={`tds-accordion-header-icon-${this.expandIconPosition}`}
              onClick={() => this.toggleAccordionItem()}
              disabled={this.disabled}
            >
              <div class="tds-accordion-title">
                {this.header}
                <slot name="header"></slot>
              </div>
              <div class="tds-accordion-icon">
                <tds-icon svgTitle="Chevron Down" name="chevron_down" size="16px"></tds-icon>
              </div>
            </button>
          </div>
          <div
            role="region"
            aria-live="polite"
            aria-labelledby={secondaryElementId}
            id={primaryElementId}
            class={`tds-accordion-panel
            ${this.paddingReset ? 'tds-accordion-panel--padding-reset ' : ''}
            `}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
