import { Component, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';

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

  /**
   * Animation variant for the accordion item.
   * Inherits from tds-accordion if not set explicitly.
   */
  @Prop() animation: 'none' | 'slide' = 'slide';

  /**
   * Private boolean to track if this is the initial load.
   * If true, we skip triggering the animation classes on first render.
   */
  @State() private hasRenderedOnce = false;

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
    // If initialLoad is true, we do NOT attach the animation classes
    // so it won't animate on the very first render.
    const shouldAnimate = this.animation !== 'none' && this.hasRenderedOnce;

    // Build up dynamic classes
    const classes = {
      'tds-accordion-item': true,
      'disabled': this.disabled,
      'expanded': this.expanded,
      [`tds-accordion-item-animation-open-${this.animation}`]: shouldAnimate && this.expanded,
      [`tds-accordion-item-animation-close-${this.animation}`]: shouldAnimate && !this.expanded,
    };

    this.hasRenderedOnce = true;

    return (
      <Host>
        <div
          class={Object.keys(classes)
            .filter((c) => classes[c])
            .join(' ')}
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
              <slot name="header"></slot>
            </div>
            <div class="tds-accordion-icon">
              <tds-icon name="chevron_down" size="16px"></tds-icon>
            </div>
          </button>
          <div
            class={`tds-accordion-panel ${
              this.paddingReset ? 'tds-accordion-panel--padding-reset' : ''
            }`}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
