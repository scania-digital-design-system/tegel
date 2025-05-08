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
  Listen,
} from '@stencil/core';
import hasSlot from '../../utils/hasSlot';
import generateUniqueId from '../../utils/generateUniqueId';

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

  /** Shows or hides the close [X] button. */
  @Prop() closable: boolean = true;

  /** Role of the modal component. Can be either 'alertdialog' for important messages that require immediate attention, or 'dialog' for regular messages. */
  @Prop() tdsAlertDialog: 'alertdialog' | 'dialog' = 'dialog';

  // State that keeps track of show/closed state for the Modal.
  @State() isShown: boolean = false;

  // Focus state index in focusable Elements
  @State() activeElementIndex = 0;

  /** Shows the Modal.  */
  @Method()
  async showModal() {
    this.isShown = true;

    // Set focus on first element when opened
    requestAnimationFrame(() => {
      const focusableElements = this.getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
        this.activeElementIndex = 0;
      }
    });
  }

  /** Closes the Modal. */
  @Method()
  async closeModal() {
    this.isShown = false;
    this.returnFocusOnClose();
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
    if (this.closable === undefined) {
      this.closable = true;
    }

    if (this.show !== undefined) {
      this.isShown = this.show;
    }
    this.initializeModal();

    if (this.header && hasSlot('header', this.host)) {
      console.warn(
        "Tegel Modal component: Using both header prop and header slot might break modal's design. Please use just one of them. ",
      );
    }

    if (!this.selector && !this.referenceEl) {
      console.warn(
        'Tegel Modal: Missing focus origin. Please provide either a "referenceEl" or a "selector" to ensure focus returns to the element that opened the modal. If the modal is opened programmatically, this message can be ignored.',
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

  private returnFocusOnClose() {
    let referenceElement = this.referenceEl ?? document.querySelector(this.selector);

    if (!referenceElement) {
      return; // no element to return focus to
    }

    const potentialReferenceElements = ['BUTTON', 'A', 'INPUT'];
    const isNativeFocusable = potentialReferenceElements.includes(referenceElement.tagName);

    if (isNativeFocusable) {
      referenceElement.focus();
    } else {
      // If referenced element is a custom element eg: tds-button we find the interactive element inside:
      const interactiveElement = referenceElement.querySelector<HTMLElement>(
        potentialReferenceElements.join(','),
      );

      if (interactiveElement) {
        interactiveElement.focus();
      }
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const focusableInShadowRoot = Array.from(
      this.host.shadowRoot.querySelectorAll<HTMLElement>(focusableSelectors),
    );
    const focusableInSlots = Array.from(
      this.host.querySelectorAll<HTMLElement>(focusableSelectors),
    );

    /** Focusable elements */
    return [...focusableInShadowRoot, ...focusableInSlots];
  }

  @Listen('keydown', { target: 'window', capture: true })
  handleFocusTrap(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isShown && !this.prevent) {
      this.handleClose(event);
      return;
    }

    // Only trap focus if the modal is open
    if (!this.isShown) return;

    // We care only about the Tab key
    if (event.key !== 'Tab') return;

    const focusableElements = this.getFocusableElements();

    // If there are no focusable elements
    if (focusableElements.length === 0) return;

    event.preventDefault();
    // Going backwards (Shift + Tab) on the first element => move to last
    if (event.shiftKey) {
      this.activeElementIndex -= 1;
      if (this.activeElementIndex === -1) {
        this.activeElementIndex = focusableElements.length - 1;
      }
    }

    // // Going forwards (Tab) on the last element => move to first
    if (!event.shiftKey) {
      this.activeElementIndex += 1;
      if (this.activeElementIndex === focusableElements.length) {
        this.activeElementIndex = 0;
      }
    }

    const nextElement = focusableElements[this.activeElementIndex];
    nextElement.focus();
  }

  handleClose = (event) => {
    const closeEvent = this.tdsClose.emit(event);
    this.returnFocusOnClose();

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

    const headerId = this.header ? `tds-modal-header-${generateUniqueId()}` : undefined;
    const bodyId = `tds-modal-body-${generateUniqueId()}`;

    return (
      <Host
        role={this.tdsAlertDialog}
        aria-modal="true"
        aria-describedby={bodyId}
        aria-labelledby={headerId}
        class={{
          show: this.isShown,
          hide: !this.isShown,
        }}
        onClick={(event: PointerEvent) => this.handleOverlayClick(event)}
      >
        <div class="tds-modal-backdrop" />
        <div class={`tds-modal tds-modal__actions-${this.actionsPosition} tds-modal-${this.size}`}>
          <div id={headerId} class="header">
            {this.header && <div class="header-text">{this.header}</div>}
            {usesHeaderSlot && <slot name="header" />}

            {this.closable && (
              <button
                class="tds-modal-close"
                aria-label="close"
                onClick={(event) => this.handleClose(event)}
              >
                <tds-icon name="cross" size="20px" />
              </button>
            )}
          </div>

          <div id={bodyId} class="body">
            <slot name="body" />
          </div>

          {usesActionsSlot && <slot name="actions" />}
        </div>
      </Host>
    );
  }
}
