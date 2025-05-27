import {
  Component,
  Element,
  Host,
  Listen,
  h,
  Prop,
  State,
  Watch,
  EventEmitter,
  Event,
  Method,
} from '@stencil/core';
import { generateClassList } from '../../utils/classList';

type Placement =
  | 'auto'
  | 'auto-end'
  | 'auto-start'
  | 'bottom'
  | 'bottom-end'
  | 'bottom-start'
  | 'left'
  | 'left-end'
  | 'left-start'
  | 'right'
  | 'right-end'
  | 'right-start'
  | 'top'
  | 'top-end'
  | 'top-start';

@Component({
  tag: 'tds-popover-core',
  styleUrl: 'tds-popover-core.scss',
  shadow: false,
  scoped: true,
})
export class TdsPopoverCore {
  @Element() host!: HTMLTdsPopoverCoreElement;

  /** The CSS-selector for an element that will trigger the pop-over */
  @Prop() selector: string;

  /** Element that will trigger the pop-over (takes priority over selector) */
  @Prop() referenceEl?: HTMLElement | null;

  /** Decides if the component should be visible from the start. */
  @Prop() defaultShow: boolean = false;

  /** Whether the popover should animate when being opened/closed or not */
  @Prop() animation: 'none' | 'fade' | string = 'none';

  /** Controls whether the Popover is shown or not. If this is set hiding and showing
   * will be decided by this prop and will need to be controlled from the outside. This
   * also means that clicking outside of the popover won't close it. Takes precedence over `defaultShow` prop.
   */
  @Prop() show: boolean = null;

  /** Decides the placement of the Popover Menu */
  @Prop() placement: Placement = 'auto';

  /** Sets the offset skidding */
  @Prop() offsetSkidding: number = 0;

  /** Sets the offset distance */
  @Prop() offsetDistance: number = 8;

  /** Array of modifier objects (legacy prop, not used with native popover) */
  @Prop() modifiers: Object[] = [];

  /** What triggers the popover to show */
  @Prop() trigger: 'click' | 'hover' | 'hover-popover' = 'click';

  /** Decides if the popover should hide automatically.
   * Alternatevly it can be hidden externally based on emitted events. */
  @Prop() autoHide: boolean = true;

  @State() renderedShowValue: boolean = false;

  @State() target?: HTMLElement | null;

  @State() isShown: boolean = false;

  @State() disableLogic: boolean = false;

  @State() hasShownAtLeastOnce: boolean = false;

  @State() openedByKeyboard: boolean = false;

  /** Property for closing popover programmatically */
  @Method() async close() {
    this.setIsShown(false);
  }

  private uuid: string = generateUniqueId();

  /** @internal Show event. */
  @Event({
    eventName: 'internalTdsShow',
    composed: false,
    cancelable: false,
    bubbles: true,
  })
  internalTdsShow: EventEmitter<{}>;

  /** @internal Close event. */
  @Event({
    eventName: 'internalTdsClose',
    composed: false,
    cancelable: false,
    bubbles: false,
  })
  internalTdsClose: EventEmitter<{}>;

  @Listen('click', { target: 'window' })
  onAnyClick(event: MouseEvent) {
    if (this.trigger === 'click' && this.isShown && this.show === null) {
      // Source: https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component/
      const isClickOutside = !event.composedPath().includes(this.host as any);
      if (isClickOutside) {
        this.setIsShown(false);
      }
    }
  }

  @Listen('internalTdsShow', { target: 'window' })
  onTdsShow(event: Event) {
    if (this.show === null) {
      const target = event.target as HTMLElement;
      if (target.id !== `tds-popover-core-${this.uuid}`) {
        this.setIsShown(false);
      }
    }
  }

  @Listen('keydown', { target: 'window' })
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isShown) {
      this.setIsShown(false);
    }
  }

  /* To observe any change of show prop after an initial load */
  @Watch('show')
  onShowChange(newValue: boolean) {
    this.setIsShown(newValue);
  }

  @Watch('referenceEl')
  onReferenceElChanged(newValue: HTMLElement, oldValue: HTMLElement) {
    if (newValue !== oldValue) {
      this.initialize({ referenceEl: newValue, trigger: this.trigger });
    }
  }

  @Watch('trigger')
  onTriggerChanged(newValue: 'click' | 'hover' | 'hover-popover') {
    this.initialize({
      referenceEl: this.referenceEl,
      trigger: newValue,
    });
  }

  @Watch('isShown')
  onIsShownChange(newValue: boolean) {
    if (newValue) {
      this.host.showPopover();
    } else {
      this.host.hidePopover();
    }
    if (newValue && this.openedByKeyboard) {
      // Wait for the next render cycle to ensure the popover is visible
      setTimeout(() => {
        this.focusFirstElement();
      }, 0);
    }
  }

  private focusFirstElement() {
    // Try to find a focusable element inside the popover
    const focusableElements = this.host.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    } else {
      // If no focusable elements found, make the popover itself focusable
      this.host.setAttribute('tabindex', '0');
      this.host.focus();
    }
  }

  private setIsShown = function setIsShown(isShown: boolean | ((s: boolean) => void)) {
    if (typeof isShown === 'function') {
      this.isShown = isShown(this.isShown);
    } else {
      this.isShown = isShown;
    }
    if (this.isShown) {
      this.hasShownAtLeastOnce = true;
      this.internalTdsShow.emit();
    } else {
      this.internalTdsClose.emit();
      this.openedByKeyboard = false;
    }
  }.bind(this);

  private onClickTarget = function onClickTarget(event: Event) {
    event.stopPropagation();
    // Check if event was triggered by keyboard (Enter or Space)
    this.openedByKeyboard =
      event.type === 'keydown' ||
      (event as KeyboardEvent).key === 'Enter' ||
      (event as KeyboardEvent).key === ' ';
    this.setIsShown((isShown: boolean) => !isShown);
  }.bind(this);

  private handleShow = function handleShow(event) {
    event.stopPropagation();
    // Check if event was triggered by keyboard (tab focus)
    this.openedByKeyboard = event.type === 'focusin';
    this.setIsShown(true);
  }.bind(this);

  private handleHide = function handleHide(event) {
    event.stopPropagation();
    this.setIsShown(false);
  }.bind(this);

  private initialize({
    referenceEl,
    trigger,
  }: {
    referenceEl: HTMLElement | null;
    trigger: 'click' | 'hover' | 'hover-popover';
  }) {
    this.cleanUp();

    if (typeof referenceEl !== 'undefined') {
      this.target = referenceEl;
    } else {
      this.target = this.selector ? document.querySelector(this.selector) : null;
    }

    if (!this.target) {
      console.error(`Could not initialize: reference element not found.`);
    } else {
      if (!this.target.id) {
        this.target.id = `tds-popover-anchor-${this.uuid}`;
      }
      this.host.setAttribute('anchor', this.target.id);
      this.host.setAttribute('popover', 'auto');
    }

    if (trigger === 'click' && this.show === null) {
      this.target.addEventListener('click', this.onClickTarget);
      // Also handle keyboard activation via Enter and Space
      this.target.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openedByKeyboard = true;
          this.onClickTarget(e);
        }
      });
    }

    if (trigger === 'hover' || trigger === 'hover-popover') {
      // For tabbing over element
      this.target.addEventListener('focusin', this.handleShow);
      this.target.addEventListener('focusout', this.handleHide);

      // For hovering over element with selector
      this.target.addEventListener('mouseenter', this.handleShow);
      this.target.addEventListener('mouseleave', this.handleHide);

      // For hovering over Popover itself
      if (trigger === 'hover-popover') {
        this.host.addEventListener('mouseenter', this.handleShow);
        this.host.addEventListener('mouseleave', this.handleHide);
      }
    }
  }

  private cleanUp() {
    this.target?.removeEventListener('click', this.onClickTarget);
    this.target?.removeEventListener('keydown', this.onClickTarget as any);
    this.target?.removeEventListener('focusin', this.handleShow);
    this.target?.removeEventListener('focusout', this.handleHide);
    this.target?.removeEventListener('mouseenter', this.handleShow);
    this.target?.removeEventListener('mouseleave', this.handleHide);
    this.host?.removeEventListener('mouseenter', this.handleShow);
    this.host?.removeEventListener('mouseleave', this.handleHide);
  }

  connectedCallback() {
    if (this.selector === undefined && this.referenceEl === undefined) {
      this.disableLogic = true;
      console.warn(
        'TDS-POPOVER-CORE: Popover internal logic disabled. Please provide a `selector` or `referenceEl` prop',
      );
      return;
    }

    this.initialize({
      referenceEl: this.referenceEl,
      trigger: this.trigger,
    });
  }

  /* To enable initial loading of a component if user controls show prop */
  componentWillLoad() {
    this.host.setAttribute('popover', 'auto');
    // Ensure initial visibility is handled properly
    if (this.show === true || this.defaultShow === true) {
      this.setIsShown(true);
    } else {
      this.setIsShown(false);
    }
  }

  componentDidRender() {
    this.renderedShowValue = this.isShown;
  }

  disconnectedCallback() {
    this.cleanUp();
  }

  render() {
    const classes = {
      'is-shown': (this.isShown && this.animation === 'none') || this.animation === undefined,
      'is-hidden': (!this.isShown && this.animation === 'none') || this.animation === undefined,
      'initially-hidden': !this.hasShownAtLeastOnce,
      'tds-animation-enter-fade': this.isShown && this.animation === 'fade',
      'tds-animation-exit-fade': !this.isShown && this.animation === 'fade',
    };

    const classList = generateClassList(classes);

    return (
      <Host
        role={this.host.getAttribute('role')}
        class={classList}
        id={`tds-popover-core-${this.uuid}`}
        popover="auto"
      >
        <slot></slot>
      </Host>
    );
  }
}
