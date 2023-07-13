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
} from '@stencil/core';
import { createPopper } from '@popperjs/core';
import type { Placement, Instance } from '@popperjs/core';

@Component({
  tag: 'tds-core-popover',
  shadow: false,
  scoped: true,
})
export class TdsCorePopover {
  @Element() host!: HTMLTdsCorePopoverElement;

  /** The CSS-selector for an element that will trigger the pop-over */
  @Prop() selector: string = '';

  /** Element that will trigger the pop-over (takes priority over selector) */
  @Prop() referenceEl?: HTMLElement | null;

  /** Decides if the Popover Menu should be visible from the start */
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

  /** @internal Show event. */
  @Event({
    eventName: 'internalTdsShow',
    composed: false,
    cancelable: false,
    bubbles: false,
  })
  tdsShow: EventEmitter<{}>;

  /** @internal Close event. */
  @Event({
    eventName: 'internalTdsClose',
    composed: false,
    cancelable: false,
    bubbles: false,
  })
  tdsClose: EventEmitter<{}>;

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

  @Watch('show')
  onShowChange(newValue: boolean) {
    this.setIsShown(newValue);
  }

  @Watch('referenceEl')
  onReferenceElChanged(newValue: HTMLElement, oldValue: HTMLElement) {
    if (newValue !== oldValue) this.initialize({ referenceEl: newValue, trigger: this.trigger });
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
      this.tdsShow.emit();
    } else {
      this.tdsClose.emit();
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

  private handleHide = function handleShow(event) {
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

  componentDidLoad() {
    this.initialize({
      referenceEl: this.referenceEl,
      trigger: this.trigger,
    });
  }

  componentDidRender() {
    if (this.isShown && !this.renderedShowValue) {
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
    let hostStyle = {};
    if (this.autoHide) {
      hostStyle = { display: this.isShown ? 'block' : 'none' };
    }

    return (
      <Host style={hostStyle}>
        <slot></slot>
      </Host>
    );
  }
}
