import { Component, Host, h, Prop, Element, Event, EventEmitter, Method } from '@stencil/core';
import generateUniqueId from '../../utils/generateUniqueId';
import hasSlot from '../../utils/hasSlot';

/**
 * @slot header - Slot for the Toast header.
 * @slot subheader - Slot for the Toast subheader.
 * @slot actions - Slot for the Toast bottom section, used for links.
 */
@Component({
  tag: 'tds-toast',
  styleUrl: 'toast.scss',
  shadow: true,
})
export class TdsToast {
  @Element() host!: HTMLElement;

  /** ID for the Toast. Randomly generated if not specified. */
  @Prop() toastId: string = generateUniqueId();

  /** Header text for the component. */
  @Prop() header?: string;

  /** Subheader text for the component. */
  @Prop() subheader?: string;

  /** Type of Toast. */
  @Prop() variant: 'information' | 'error' | 'warning' | 'success' = 'information';

  /** Hides the Toast. */
  @Prop({ reflect: true }) hidden: boolean = false;

  /** Enables the close button. */
  @Prop() closable: boolean = true;

  /** ARIA role for the Toast. */
  @Prop() toastRole: 'alert' | 'log' | 'status' = 'alert';

  /** Provides an accessible name for the components close button */
  @Prop() tdsCloseAriaLabel?: string;

  /** ARIA live for the Toast. */
  @Prop() tdsAriaLive: 'polite' | 'assertive' = 'polite';

  /** Hides the Toast. */
  @Method()
  async hideToast() {
    this.hidden = true;
  }

  /** Shows the Toast. */
  @Method()
  async showToast() {
    this.hidden = false;
  }

  /** Sends unique Toast identifier when component is closed. */
  @Event({
    eventName: 'tdsClose',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsClose!: EventEmitter<{
    toastId: string;
  }>;

  getIconName = () => {
    switch (this.variant) {
      case 'information':
        return 'info';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'success':
        return 'tick';
      default:
        return 'info';
    }
  };

  handleClose = () => {
    const tdsCloseEvent = this.tdsClose.emit({
      toastId: this.toastId,
    });
    if (!tdsCloseEvent.defaultPrevented) {
      this.hidden = true;
    }
  };

  handleShow = () => {
    const tdsCloseEvent = this.tdsClose.emit({
      toastId: this.toastId,
    });
    if (!tdsCloseEvent.defaultPrevented) {
      this.hidden = false;
    }
  };

  connectedCallback() {
    if (!this.tdsCloseAriaLabel) {
      console.warn('tds-toast: tdsCloseAriaLabel is required');
    }
  }

  render() {
    const usesHeaderSlot = hasSlot('header', this.host);
    const usesSubheaderSlot = hasSlot('subheader', this.host);
    const usesActionsSlot = hasSlot('actions', this.host);
    return (
      <Host
        aria-live={this.tdsAriaLive}
        toastRole={this.toastRole}
        aria-describedby={this.host.getAttribute('aria-describedby')}
        class={{
          hide: this.hidden,
          show: !this.hidden,
        }}
      >
        <div
          class={`
            wrapper
            ${this.variant}`}
        >
          <tds-icon name={this.getIconName()} size="20px" svgTitle={this.getIconName()}></tds-icon>
          <div class={`content`}>
            <div class="header-subheader">
              {this.header && <div class="header">{this.header}</div>}
              {usesHeaderSlot && <slot name="header"></slot>}
              {this.subheader && <div class="subheader">{this.subheader}</div>}
              {usesSubheaderSlot && <slot name="subheader"></slot>}
            </div>
            {usesActionsSlot && (
              <div
                class={`toast-bottom ${
                  usesSubheaderSlot || this.subheader ? 'subheader' : 'no-subheader'
                }`}
              >
                <slot name="actions"></slot>
              </div>
            )}
          </div>

          {this.closable && (
            <button
              id="my-button"
              aria-label={this.tdsCloseAriaLabel}
              onClick={this.handleClose}
              class="close"
            >
              <tds-icon name="cross" size="20px" svgTitle="cross"></tds-icon>
            </button>
          )}
        </div>
      </Host>
    );
  }
}
