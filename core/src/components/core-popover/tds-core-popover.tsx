import { Component, Element, Host, Listen, h, Prop, State, Watch } from '@stencil/core';
import { createPopper } from '@popperjs/core';
import type { Placement, Instance } from '@popperjs/core';

@Component({
  tag: 'tds-core-popover',
  shadow: true,
})
export class TdsPopoverMenu {
  @Element() host!: HTMLElement;

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

  @State() renderedShowValue: boolean = false;

  @State() popperInstance: Instance | null;

  @State() target?: HTMLElement | null;

  @State() isShown: boolean = false;

  @Listen('click', { target: 'window' })
  onAnyClick(event: MouseEvent) {
    if (this.trigger === 'click' && this.isShown && this.show === null) {
      // Source: https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component/
      const isClickOutside = !event.composedPath().includes(this.host as any);
      if (isClickOutside) {
        this.isShown = false;
      }
    }
  }

  @Watch('show')
  onShowChange(newValue: boolean) {
    this.isShown = newValue;
  }

  @Watch('referenceEl')
  onReferenceElChanged(newValue: HTMLElement, oldValue: HTMLElement) {
    if (newValue !== oldValue) this.initialize(newValue);
  }

  private onClickTarget = function onClickTarget(event) {
    event.stopPropagation();
    this.isShown = !this.isShown;
  }.bind(this);

  private handleShow = function handleShow(event) {
    event.stopPropagation();
    this.isShown = true;
  }.bind(this);

  private handleHide = function handleShow(event) {
    event.stopPropagation();
    this.isShown = false;
  }.bind(this);

  private initialize(referenceEl: HTMLElement | null) {
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

    if (this.trigger === 'click' && this.show === null) {
      this.target.addEventListener('click', this.onClickTarget);
    }

    if (this.trigger === 'hover' || this.trigger === 'hover-popover') {
      // For tabbing over element
      this.target.addEventListener('focusin', this.handleShow);
      this.target.addEventListener('focusout', this.handleHide);

      // For hovering over element with selector
      this.target.addEventListener('mouseenter', this.handleShow);
      this.target.addEventListener('mouseleave', this.handleHide);

      // For hovering over Popover itself
      if (this.trigger === 'hover-popover') {
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
    this.initialize(this.referenceEl);
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
    return (
      <Host style={{ display: this.isShown ? 'block' : 'none' }}>
        <slot></slot>
      </Host>
    );
  }
}
