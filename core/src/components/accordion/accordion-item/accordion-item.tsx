import { Component, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';

@Component({
  tag: 'tds-accordion-item',
  styleUrl: 'accordion-item.scss',
  shadow: true,
})
export class TdsAccordionItem {
  /** The header gives users the context about the additional information available inside the panel */
  @Prop() header: string = '';

  /** Changes position where of expand icon. */
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
    return (
      <Host>
        <div
          class={`tds-accordion-item
        ${this.disabled ? 'disabled' : ''}
        ${this.expanded ? 'expanded' : ''}
        `}
        >
          <button
            type="button"
            aria-expanded={this.expanded}
            class={`tds-accordion-header-icon-${this.expandIconPosition}`}
            onClick={() => this.toggleAccordionItem()}
            disabled={this.disabled}
          >
            <div class="tds-accordion-title">
              {this.header}
              <slot name="accordion-item-header"></slot>
            </div>
            <div class="tds-accordion-icon">
              <tds-icon name="chevron_down" size="16px"></tds-icon>
            </div>
          </button>
          <div
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
