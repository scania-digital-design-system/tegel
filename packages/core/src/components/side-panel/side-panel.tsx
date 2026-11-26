import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
// import hasSlot from '../../utils/hasSlot';
import generateUniqueId from '../../utils/generateUniqueId';

/**
 * @slot content - Slot for main content of Side Panel
 * */
@Component({
  tag: 'tds-side-panel',
  styleUrl: 'side-panel.scss',
  shadow: true,
})
export class TdsSidePanel {
  @Element() host!: HTMLElement;

  /** Only affects when overlay is true, to prevent clicking outside from closing the Side Panel  */
  @Prop({ reflect: true }) prevent: boolean = false;

  /** Controls whether the Side Panel is collapsed or not */
  @Prop({ reflect: true }) collapsed: boolean = false;

  /** Controls whether the Side Panel has an overlay or not. Only applied when top and bottom positions are not in use. */
  @Prop({ reflect: true }) overlay: boolean = false;

  /** Sets the header of the Side Panel. */
  @Prop({ reflect: true }) header: string = '';

  /** Sets the subheader of the Side Panel. */
  @Prop({ reflect: true }) subheader: string = '';

  /** CSS selector for the element that will show the Side Panel. */
  @Prop({ reflect: true }) selector?: string;

  /** Top position in pixels from where the Side Panel will start. */
  @Prop({ reflect: true }) top?: number;

  /** Top position in pixels to where the Side Panel will end. */
  @Prop({ reflect: true }) bottom?: number;

  @State() isCollapsed: boolean = false;

  @State() hasOverlay: boolean = false;

  @State() topPosition: number = 0;

  @State() bottomPosition: number = 0;

  // private overlayRef: HTMLDivElement | undefined;

  private headerId = `tds-side-panel-header-${generateUniqueId()}`;
  private subheaderId = `tds-side-panel-subheader-${generateUniqueId()}`;

  /** Emits when the Side Panel is closed. */
  @Event({
    eventName: 'tdsClose',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsClose!: EventEmitter<globalThis.Event>;

  /** Emits just before Side Panel is opened. */
  @Event({
    eventName: 'tdsOpen',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsOpen!: EventEmitter<void>;

  /** Shows the Modal.  */
  @Method()
  async openSidePanel() {
    this.isCollapsed = false;
    this.focusOnCollapseButton();
  }

  /** Closes the Modal. */
  @Method()
  async closeSidePanel() {
    this.isCollapsed = true;
  }

  @Watch('collapsed')
  collapsedChanged(newValue: boolean) {
    this.isCollapsed = newValue;
  }

  @Watch('top')
  topChanged(newValue: number) {
    this.topPosition = newValue;
  }

  @Watch('bottom')
  bottomChanged(newValue: number) {
    this.bottomPosition = newValue;
  }

  private handleClose = (event: Event) => {
    const closeEvent = this.tdsClose.emit(event);
    if (closeEvent.defaultPrevented) return;

    this.isCollapsed = true;
  };

  private handleOpen = () => {
    const showEvent = this.tdsOpen.emit();
    if (showEvent.defaultPrevented) return;

    this.isCollapsed = false;
    this.focusOnCollapseButton();
  };

  private focusOnCollapseButton() {
    const focusableCollapseButton = this.host.shadowRoot?.querySelector<HTMLElement>(
      'button.tds-side-panel__collapse-button',
    );

    if (focusableCollapseButton) focusableCollapseButton.focus();
  }

  private handleReferenceElementClick = (event: PointerEvent | KeyboardEvent) => {
    if (!this.isCollapsed) {
      this.handleClose(event);
    } else {
      this.handleOpen();
    }
  };

  /** Check if there is a referenceElement or selector and adds event listener to them if so. */
  private setSelectorButton = () => {
    if (this.selector) {
      const referenceEl = document.querySelector<HTMLElement>(this.selector);
      if (referenceEl) {
        this.initializeReferenceElement(referenceEl);
      }
    }
  };

  /** Adds an event listener to the reference element that shows/closes the Side Panel. */
  private initializeReferenceElement = (referenceEl: HTMLElement) => {
    if (referenceEl) {
      referenceEl.addEventListener('click', this.handleReferenceElementClick);
    }
  };

  /** Checks if click on Side Panel is on overlay, if so it closes the Side Panel if prevent is not true. */
  private handleOverlayClick = (event: PointerEvent) => {
    if (this.hasOverlay && !this.isCollapsed && this.prevent === false) {
      const targetList = event.composedPath();
      const target = targetList[0] as HTMLElement;
      if (target.classList[0] === 'tds-side-panel__overlay') {
        this.handleClose(event);
      }
    }
  };

  componentWillLoad() {
    if (this.collapsed !== undefined) {
      this.isCollapsed = this.collapsed;
    }

    if (this.top || this.bottom) {
      this.hasOverlay = false;
    } else {
      this.hasOverlay = this.overlay;
    }

    if (this.top) {
      this.topPosition = this.top;
    }

    if (this.bottom) {
      if (this.topPosition >= this.bottom) {
        console.warn('Tegel Side Panel component: Top should be less than bottom.');
        this.bottomPosition = 0;
      } else {
        this.bottomPosition = this.bottom;
      }
    }

    this.setSelectorButton();
  }

  componentDidRender() {
    this.host.style.top = `${this.topPosition}px`;

    if (this.bottomPosition === 0) {
      this.host.style.bottom = '0';
    } else {
      this.host.style.height = `calc(${this.bottomPosition}px - ${this.topPosition}px)`;
    }
  }

  render() {
    return (
      <Host onClick={(event: PointerEvent) => this.handleOverlayClick(event)}>
        {this.hasOverlay && !this.isCollapsed && <div class="tds-side-panel__overlay" />}
        <div
          class={{
            'tds-side-panel__arrow': true,
            'tds-side-panel__arrow--collapsed': this.isCollapsed,
          }}
        >
          <button
            class="tds-side-panel__collapse-button"
            type="button"
            onClick={(event: PointerEvent) => this.handleReferenceElementClick(event)}
          >
            <tds-icon
              slot="icon"
              size="20px"
              name={`${this.isCollapsed ? 'arrow_left' : 'arrow_right'}`}
            ></tds-icon>
          </button>
          {this.isCollapsed && <div class="tds-collapsed-side-panel" />}
        </div>
        <div
          role="dialog"
          aria-modal={this.hasOverlay && this.prevent ? true : false}
          class={{
            'tds-side-panel--collapsed': this.isCollapsed,
            'tds-side-panel': true,
          }}
          tabindex="-1"
        >
          <div class="tds-side-panel__top-content">
            {this.header && (
              <h1 id={this.headerId} class="header-text">
                {this.header}
              </h1>
            )}
            {this.subheader && (
              <span id={this.subheaderId} class="subheader-text">
                {this.subheader}
              </span>
            )}

            <button
              class="tds-side-panel__close"
              aria-label="close"
              onClick={(event: PointerEvent) => this.handleClose(event)}
            >
              <tds-icon name="cross" size="16px" />
            </button>
          </div>
          <slot name="content"></slot>
        </div>
      </Host>
    );
  }
}
