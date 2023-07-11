import { Component, Host, h, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { Method } from '@stencil/core/internal';
import { generateUniqueId, hasSlot } from '../../utils/utils';

/**
 * @slot header - Slot for the Toast header.
 * @slot subheader - Slot for the Toast subheader.
 * @slot bottom - Slot for the Toast bottom section, used for links.
 */
@Component({
  tag: 'tds-toast',
  styleUrl: 'toast.scss',
  shadow: true,
})
export class TdsToast {
  @Element() host: HTMLElement;

  /** ID for the Toast. Randomly generated if not specified. */
  @Prop() toastId: string = generateUniqueId();

  /** Header text for the component. */
  @Prop() header: string;

  /** Subheader text for the component. */
  @Prop() subheader: string;

  /** Type of Toast. */
  @Prop() type: 'information' | 'error' | 'warning' | 'success' = 'information';

  /** Hides the Toast. */
  @Prop({ reflect: true }) hidden: boolean = false;

  /** ARIA role for the Toast. */
  @Prop() toastRole: 'alert' | 'log' | 'status' = 'alert';

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
  tdsClose: EventEmitter<{
    toastId: string;
  }>;

  getIconName = () => {
    switch (this.type) {
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

  render() {
    const usesHeaderSlot = hasSlot('header', this.host);
    const usesSubheaderSlot = hasSlot('subheader', this.host);
    const usesBottomSlot = hasSlot('bottom', this.host);
    return (
      <Host
        toastRole={this.toastRole}
        aria-describedby={this.host.getAttribute('aria-describedby')}
        class={`${this.hidden ? 'hide' : 'show'}`}
      >
        <div
          class={`
            wrapper
            ${this.type}`}
        >
          <tds-icon name={this.getIconName()} size="20px"></tds-icon>
          <div class={`content`}>
            <div class="header-subheader">
              {this.header && <div class="header">{this.header}</div>}
              {usesHeaderSlot && <slot name="header"></slot>}
              {this.subheader && <div class="subheader">{this.subheader}</div>}
              {usesSubheaderSlot && <slot name="subheader"></slot>}
            </div>
            {usesBottomSlot && (
              <div
                class={`toast-bottom ${
                  usesSubheaderSlot || this.subheader ? 'subheader' : 'no-subheader'
                }`}
              >
                <slot name="bottom"></slot>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              this.handleClose();
            }}
            class={`close`}
          >
            <tds-icon name="cross" size="20px"></tds-icon>
          </button>
        </div>
      </Host>
    );
  }
}
