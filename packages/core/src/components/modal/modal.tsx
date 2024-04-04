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
import hasSlot from '../../utils/hasSlot';

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

  /** Changes the position behaviour of the actions slot.  */
  @Prop() actionsPosition: 'sticky' | 'static' = 'static';

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
    if (this.show !== undefined) {
      this.isShown = this.show;
    }
    this.initializeModal();

    if (this.header && hasSlot('header', this.host)) {
      console.warn(
        "Tegel Modal component: Using both header prop and header slot might break modal's design. Please use just one of them. ",
      );
    }
  }

  componentWillLoad() {
    this.initializeModal();
  }

  disconnectedCallback() {
    this.cleanupModal();
  }

  /** Initializes or re-initializes the modal, setting up event listeners. */
  @Method()
  async initializeModal() {
    this.setDismissButtons();
    this.setShowButton();
  }

  /** Cleans up event listeners and other resources. */
  @Method()
  async cleanupModal() {
    if (this.selector || this.referenceEl) {
      const referenceEl = this.referenceEl ?? document.querySelector(this.selector);
      if (referenceEl) {
        referenceEl.removeEventListener('click', this.handleReferenceElementClick);
      }
    }

    this.host.querySelectorAll('[data-dismiss-modal]').forEach((dismissButton) => {
      dismissButton.removeEventListener('click', this.handleClose);
    });
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
  handleOverlayClick = (event: PointerEvent) => {
    const targetList = event.composedPath();
    const target = targetList[0] as HTMLElement;
    if (
      target.classList[0] === 'tds-modal-close' ||
      (target.classList[0] === 'tds-modal-backdrop' && this.prevent === false)
    ) {
      this.handleClose(event);
    }
  };

  handleReferenceElementClick = (event) => {
    if (this.isShown) {
      this.handleClose(event);
    } else {
      this.handleShow();
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

  /** Adds an event listener to the reference element that shows/closes the Modal. */
  initializeReferenceElement = (referenceEl: HTMLElement) => {
    if (referenceEl) {
      referenceEl.addEventListener('click', this.handleReferenceElementClick);
    }
  };

  /** Adds an event listener to the dismiss buttons that closes the Modal. */
  setDismissButtons() {
    this.host.querySelectorAll('[data-dismiss-modal]').forEach((dismissButton) => {
      dismissButton.addEventListener('click', this.handleClose);
    });
  }

  render() {
    const usesHeaderSlot = hasSlot('header', this.host);
    const usesActionsSlot = hasSlot('actions', this.host);

    return (
      <Host
        class={`${this.isShown ? 'show' : 'hide'}`}
        onClick={(event) => this.handleOverlayClick(event)}
      >
        <div class="tds-modal-backdrop" />
        <div class={`tds-modal tds-modal__actions-${this.actionsPosition} tds-modal-${this.size}`}>
          <div class="header">
            {this.header && <div class="header-text">{this.header}</div>}
            {usesHeaderSlot && <slot name="header" />}
            <button
              class="tds-modal-close"
              aria-label="close"
              onClick={(event) => this.handleClose(event)}
            >
              <tds-icon name="cross" size="20px" />
            </button>
          </div>

          <div class="body">
            <slot name="body" />
          </div>

          {usesActionsSlot && <slot name="actions" />}
        </div>
      </Host>
    );
  }
}
