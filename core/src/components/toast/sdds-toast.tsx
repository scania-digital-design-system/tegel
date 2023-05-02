import { Component, Host, h, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { HostElement, Method, State } from '@stencil/core/internal';

@Component({
  tag: 'sdds-toast',
  styleUrl: 'sdds-toast.scss',
  shadow: true,
})
export class SddsToast {
  /** ID for the toast. Randomly generated if not specified. */
  @Prop() toastId: string = crypto.randomUUID();

  /** Header text for the component. */
  @Prop() header: string;

  /** Subheader text for the component. */
  @Prop() subheader: string;

  /** Type of toast. */
  @Prop() type: 'information' | 'error' | 'warning' | 'success' = 'information';

  /** Hides the toast. */
  @Prop() hidden: boolean = false;

  /** ARIA role for the toast. */
  @Prop() toastRole: 'alert' | 'log' | 'status' = 'alert';

  @Element() host: HostElement;

  @State() hasSubheader: boolean;

  @State() hasLink: boolean;

  /** Hides the toast. */
  @Method()
  async hideToast() {
    this.handleClose();
  }

  /** Shows the toast. */
  @Method()
  async showToast() {
    this.handleShow();
  }

  /** Sends unique toast identifier component is closed. */
  @Event({
    eventName: 'sddsClose',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  sddsClose: EventEmitter<{
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
    const sddsCloseEvent = this.sddsClose.emit({
      toastId: this.toastId,
    });
    if (!sddsCloseEvent.defaultPrevented) {
      this.hidden = true;
    }
  };

  handleShow = () => {
    const sddsCloseEvent = this.sddsClose.emit({
      toastId: this.toastId,
    });
    if (!sddsCloseEvent.defaultPrevented) {
      this.hidden = false;
    }
  };

  connectedCallback() {
    const children = Array.from(this.host.children);
    this.hasSubheader = children.some((childElement) => childElement.slot === 'toast-subheader');
    this.hasLink = children.some((childElement) => childElement.slot === 'toast-link');
  }

  getHeaderClasses = () => {
    if (!this.hasSubheader && !this.hasLink) {
      return 'only-header';
    }
    if (!this.hasSubheader) {
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
          <sdds-icon name={this.getIconName()} size="20px"></sdds-icon>
          <div class={`toast-content`}>
            <div
              class={`toast-header
              ${this.getHeaderClasses()}
              `}
            >
              {this.header}
            </div>
            <div class={`toast-subheader ${this.hasLink ? '' : 'no-link'}`}>
              <slot name="toast-subheader"></slot>
            </div>
            <slot name="toast-link"></slot>
          </div>
          <button
            onClick={() => {
              this.handleClose();
            }}
            class={`toast-close`}
          >
            <sdds-icon name="cross" size="20px"></sdds-icon>
          </button>
        </div>
      </Host>
    );
  }
}
