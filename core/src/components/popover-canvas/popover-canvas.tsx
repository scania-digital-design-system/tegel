import { Component, Host, Element, Listen, h, Prop, State, Watch } from '@stencil/core';
import { createPopper } from '@popperjs/core';
import type { Placement, Instance } from '@popperjs/core';

@Component({
  tag: 'tds-popover-canvas',
  styleUrl: 'popover-canvas.scss',
  shadow: true,
})
export class TdsPopoverCanvas {
  @Element() host!: HTMLTdsPopoverCanvasElement;

  /** The CSS-selector for an element that will trigger the Popover */
  @Prop() selector: string = '';

  /** Element that will trigger the Popover (takes priority over selector) */
  @Prop() referenceEl?: HTMLElement | null;

  /** Controls whether the Popover is shown or not. If this is set hiding and showing
   * will be decided by this prop and will need to be controlled from the outside.
   */
  @Prop() show: boolean = null;

  /** Decides the placement of the Popover Canvas. See https://popper.js.org/docs/v2/constructors/#placement */
  @Prop() placement: Placement = 'auto';

  /** Sets the offset skidding */
  @Prop() offsetSkidding: number = 0;

  /** Sets the offset distance */
  @Prop() offsetDistance: number = 8;

  /** Array of modifier objects to pass to popper.js. See https://popper.js.org/docs/v2/modifiers/ */
  @Prop() modifiers: Object[] = [];

  @State() renderedShowValue: boolean = false;

  @State() popperInstance: Instance;

  @State() target: any;

  @State() isShown: boolean = false;

  @Watch('show')
  onShowChange(newValue: boolean) {
    this.isShown = newValue;
  }

  @Watch('referenceEl')
  onReferenceElChange(newValue: HTMLElement, oldValue: HTMLElement) {
    if (newValue !== oldValue) {
      this.popperInstance?.destroy();

      if (newValue) {
        this.initialize(newValue);
      }
    }
  }

  @Listen('click', { target: 'window' })
  onAnyClick(event: MouseEvent) {
    if (this.isShown && this.show === null) {
      // Source: https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component/
      const isClickOutside = !event.composedPath().includes(this.host as any);
      if (isClickOutside) {
        this.isShown = false;
      }
    }
  }

  initialize = (referenceEl) => {
    this.popperInstance = createPopper(referenceEl, this.host, {
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
    });

    if (this.show === null) {
      referenceEl.addEventListener('click', (event) => {
        event.stopPropagation();
        this.isShown = !this.isShown;
      });
    }
  };

  connectedCallback() {
    if (this.show !== null) {
      this.isShown = this.show;
    }
  }

  componentDidLoad() {
    if (this.selector || this.referenceEl) {
      const referenceEl = this.referenceEl ?? document.querySelector(this.selector);

      if (referenceEl) {
        this.initialize(referenceEl);
      } else {
        console.error(
          `Could not initialize popover-canvas: element with selector '${this.selector}' not found.`,
        );
      }
    }
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
    this.popperInstance?.destroy();
  }

  render() {
    return (
      <Host class={`tds-popover-canvas ${this.isShown ? 'tds-popover-canvas-show' : ''}`}>
        <slot></slot>
      </Host>
    );
  }
}
