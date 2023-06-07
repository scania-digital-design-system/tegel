import { Component, Host, h, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { Method, State } from '@stencil/core/internal';
import { hasSlot } from '../../utils/utils';

@Component({
  tag: 'tds-toast',
  styleUrl: 'toast.scss',
  shadow: true,
})
export class TdsToast {
  @Element() host: HTMLElement;

  /** ID for the Toast. Randomly generated if not specified. */
  @Prop() toastId: string = crypto.randomUUID();

  /** Header text for the Toast. */
  @Prop() header: string;

  /** Subheader text for the component. */
  @Prop() subheader: string;

  /** Type of Toast. */
  @Prop() type: 'information' | 'error' | 'warning' | 'success' = 'information';

  /** Hides the Toast. */
  @Prop({ reflect: true }) hidden: boolean = false;

  /** ARIA role for the Toast. */
  @Prop() toastRole: 'alert' | 'log' | 'status' = 'alert';

  @State() hasSubheaderSlot: boolean;

  @State() hasLink: boolean;

  /** Hides the Toast. */
  @Method()
  async hideToast() {
    this.handleClose();
  }

  /** Shows the Toast. */
  @Method()
  async showToast() {
    this.handleShow();
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

  connectedCallback() {
    this.hasSubheaderSlot = hasSlot('toast-subheader', this.host);
    this.hasLink = hasSlot('toast-link', this.host);
  }

  getHeaderClasses = () => {
    if (!this.hasSubheaderSlot && !this.hasLink) {
      return 'only-header';
    }
    if (!this.hasSubheaderSlot && !this.subheader) {
      return 'no-subheader';
    }
    return '';
  };

  render() {
    return (
      <Host
        toastRole={this.toastRole}
        aria-describedby={this.host.getAttribute('aria-describedby')}
        class={`${this.hidden ? 'hide' : 'show'}`}
      >
        <div
          class={`
            toast-wrapper
            ${this.type}
            `}
        >
          <tds-icon name={this.getIconName()} size="20px"></tds-icon>
          <div class={`toast-content`}>
            <div
              class={`toast-header
              ${this.getHeaderClasses()}`}
            >
              {this.header}
            </div>
            {(this.hasSubheaderSlot || this.subheader) && (
              <div class={`toast-subheader ${this.hasLink ? '' : 'no-link'}`}>
                <slot name="toast-subheader"></slot>
                {this.subheader}
              </div>
            )}
            <slot name="toast-link"></slot>
          </div>
          <button
            onClick={() => {
              this.handleClose();
            }}
            class={`toast-close`}
          >
            <tds-icon name="cross" size="20px"></tds-icon>
          </button>
        </div>
      </Host>
    );
  }
}
