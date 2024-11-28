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
import { createPopper } from '@popperjs/core';
import type { Placement, Instance } from '@popperjs/core';
import generateUniqueId from '../../utils/generateUniqueId';

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

  /** Array of modifier objects to pass to popper.js. See https://popper.js.org/docs/v2/modifiers/ */
  @Prop() modifiers: Object[] = [];

  /** What triggers the popover to show */
  @Prop() trigger: 'click' | 'hover' | 'hover-popover' = 'click';

  /** Decides if the popover should hide automatically.
   * Alternatevly it can be hidden externally based on emitted events. */
  @Prop() autoHide: boolean = true;

  @State() renderedShowValue: boolean = false;

  @State() popperInstance: Instance | null;

  @State() target?: HTMLElement | null;

  @State() isShown: boolean = false;

  @State() disableLogic: boolean = false;

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

  private setIsShown = function setIsShown(isShown: boolean | ((s: boolean) => void)) {
    if (typeof isShown === 'function') {
      this.isShown = isShown(this.isShown);
    } else {
      this.isShown = isShown;
    }
    if (this.isShown) {
      this.internalTdsShow.emit();
    } else {
      this.internalTdsClose.emit();
    }
  }.bind(this);

  private onClickTarget = function onClickTarget(event) {
    event.stopPropagation();
    this.setIsShown((isShown) => !isShown);
  }.bind(this);

  private handleShow = function handleShow(event) {
    event.stopPropagation();
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

    this.popperInstance = this.target
      ? createPopper(this.target, this.host, {
          strategy: 'fixed',
          placement: this.placement,
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [this.offsetSkidding, this.offsetDistance],
              },
            },
            ...this.modifiers,
          ],
        })
      : null;

    if (!this.popperInstance) {
      console.error(`Could not initialize: reference element not found.`);
    }

    if (trigger === 'click' && this.show === null) {
      this.target.addEventListener('click', this.onClickTarget);
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
    this.target?.removeEventListener('focusin', this.handleShow);
    this.target?.removeEventListener('focusout', this.handleHide);
    this.target?.removeEventListener('mouseenter', this.handleShow);
    this.target?.removeEventListener('mouseleave', this.handleHide);
    this.host?.removeEventListener('mouseenter', this.handleShow);
    this.host?.removeEventListener('mouseleave', this.handleHide);

    this.popperInstance?.destroy();
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
    // Ensure initial visibility is handled properly
    if (this.show === true || this.defaultShow === true) {
      this.setIsShown(true);
    } else {
      this.setIsShown(false);
    }
  }

  componentDidRender() {
    if (this.isShown && !this.renderedShowValue && !this.disableLogic) {
      // Here we update the popper position since its position is wrong
      // before it is rendered.
      this.popperInstance.update();
    }
    this.renderedShowValue = this.isShown;
  }

  disconnectedCallback() {
    this.cleanUp();
  }

  render() {
    const classes = {
      [`tds-popover-animation-${this.animation}`]: this.isShown && this.animation !== 'none',
      'is-shown': this.isShown,
    };

    return (
      <Host class={classes} id={`tds-popover-core-${this.uuid}`}>
        <slot></slot>
      </Host>
    );
  }
}
