import {
  Component,
  h,
  Host,
  Prop,
  Element,
  Method,
  State,
  Event,
  EventEmitter,
} from '@stencil/core';
import { hasSlot } from '../../utils/utils';

/**
 * @slot header - Slot for header text
 * @slot body - Slot for main content of modal
 * @slot actions - Slot for extra buttons
 * */
@Component({
  tag: 'tds-modal',
  styleUrl: 'modal.scss',
  shadow: true,
})
export class TdsModal {
  @Element() host: HTMLElement;

  /** Sets the header of the Modal. */
  @Prop() header: string;

  /** Disables closing Modal on clicking on overlay area. */
  @Prop() prevent: boolean = false;

  /** Size of Modal  */
  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  /** Sticky or Static Actions  */
  @Prop() actions: 'sticky' | 'static' = 'static';

  /** CSS selector for the element that will show the Modal. */
  @Prop() selector: string;

  /** Element that will show the Modal (takes priority over selector) */
  @Prop() referenceEl?: HTMLElement | null;

  /** Controls whether the Modal is shown or not. If this is set hiding and showing
   * will be decided by this prop and will need to be controlled from the outside. */
  @Prop() show: boolean;

  // State that keeps track of show/closed state for the Modal.
  @State() isShown: boolean = false;

  /** Shows the Modal.  */
  @Method()
  async showModal() {
    this.isShown = true;
  }

  /** Closes the Modal. */
  @Method()
  async closeModal() {
    this.isShown = false;
  }

  /** Emits when the Modal is closed. */
  @Event({
    eventName: 'tdsClose',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsClose: EventEmitter<any>;

  connectedCallback() {
    if (this.show !== null) {
      this.isShown = this.show;
    }
    this.setDismissButtons();
    this.setShowButton();

    if (this.header && hasSlot('header', this.host)) {
      console.warn(
        "Tegel Modal component: Using both header prop and header slot might break modal's design. Please use just one of them. ",
      );
    }
  }

  handleClose = (event) => {
    const closeEvent = this.tdsClose.emit(event);
    if (!closeEvent.defaultPrevented) {
      this.isShown = false;
    }
  };

  handleShow = () => {
    this.isShown = true;
  };

  /** Checks if click on Modal is on overlay, if so it closes the Modal if prevent is not true. */
  handleOverlayClick(event) {
    const targetList = event.composedPath();
    const target = targetList[0];
    if (
      target.classList[0] === 'tds-modal-close' ||
      (target.classList[0] === 'tds-modal-backdrop' && this.prevent === false)
    ) {
      this.handleClose(event);
    }
  }

  /** Adds an event listener to the reference element that shows/closes the Modal. */
  initializeReferenceElement = (referenceEl) => {
    if (referenceEl) {
      referenceEl.addEventListener('click', (event) => {
        if (this.isShown) {
          this.handleClose(event);
        } else {
          this.handleShow();
        }
      });
    }
  };

  /** Check if there is a referenceElement or selector and adds event listener to them if so. */
  setShowButton = () => {
    if (this.selector || this.referenceEl) {
      const referenceEl = this.referenceEl ?? document.querySelector(this.selector);
      if (referenceEl) {
        this.initializeReferenceElement(referenceEl);
      }
    }
  };

  /** Adds an event listener to the dismiss buttons that closes the Modal. */
  setDismissButtons() {
    this.host.querySelectorAll('[data-dismiss-modal]').forEach((dismissButton) => {
      dismissButton.addEventListener('click', (event) => {
        this.handleClose(event);
      });
    });
  }

  render() {
    const usesHeaderSlot = hasSlot('header', this.host);
    const usesActionsSlot = hasSlot('actions', this.host);
    return (
      <Host
        onClick={(event) => {
          this.handleOverlayClick(event);
        }}
        class={`tds-modal-backdrop ${this.isShown ? 'show' : 'hide'}`}
      >
        <div
          class={`tds-modal ${this.actions ? `tds-modal__actions-${this.actions}` : ''} ${
            this.size ? `tds-modal-${this.size}` : ''
          } `}
        >
          <div class="header">
            {this.header && <div class="header">{this.header}</div>}
            {usesHeaderSlot && <slot name="header"></slot>}
            <button
              class="tds-modal-close"
              aria-label="close"
              onClick={(event) => {
                this.handleClose(event);
              }}
            >
              <tds-icon name="cross" size="20px"></tds-icon>
            </button>
          </div>

          <div class="body">
            <slot name="body"></slot>
          </div>

          {usesActionsSlot && <slot name="actions"></slot>}
        </div>
      </Host>
    );
  }
}
