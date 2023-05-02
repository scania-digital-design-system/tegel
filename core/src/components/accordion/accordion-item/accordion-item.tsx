import { Component, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';

@Component({
  tag: 'sdds-accordion-item',
  styleUrl: 'accordion-item.scss',
  shadow: true,
})
export class AccordionItem {
  /** The header gives users the context about the additional information available inside the panel */
  @Prop() header: string = '';

  /** Changes where the expand icon is placed. */
  @Prop() expandIconPosition: 'start' | 'end' = 'end';

  /** Disabled option in `boolean`. */
  @Prop() disabled: boolean = false;

  /** Set to true to expand panel open */
  @Prop() expanded: boolean = false;

  /** When true 16px on right padding instead of 64px */
  @Prop() paddingReset: boolean = false;

  /** Method for toggeling the expanded state of the accordion item. */
  @Method()
  async toggleAccordionItem() {
    // This is negated in order to emit the value the accordion item will have after it has expanded/redacted.
    const event = this.sddsToggle.emit({
      expanded: !this.expanded,
    });
    if (!event.defaultPrevented) {
      this.expanded = !this.expanded;
    }
  }

  /** Fires when the accordion item is clicked but before the it is closed or opened. */
  @Event({
    eventName: 'sddsToggle',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  sddsToggle: EventEmitter<{
    expanded: boolean;
  }>;

  render() {
    return (
      <Host>
        <div
          class={`sdds-accordion-item
        ${this.disabled ? 'disabled' : ''}
        ${this.expanded ? 'expanded' : ''}
        `}
        >
          <button
            type="button"
            aria-expanded={this.expanded}
            class={`sdds-accordion-header-icon-${this.expandIconPosition}`}
            onClick={() => this.toggleAccordionItem()}
            disabled={this.disabled}
          >
            <div class="sdds-accordion-title">
              {this.header}
              <slot name="accordion-item-header"></slot>
            </div>
            <div class="sdds-accordion-icon">
              <sdds-icon name="chevron_down" size="16px"></sdds-icon>
            </div>
          </button>
          <div
            class={`sdds-accordion-panel
            ${this.paddingReset ? 'sdds-accordion-panel--padding-reset ' : ''}
            `}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
