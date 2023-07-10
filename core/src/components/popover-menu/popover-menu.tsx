import { Component, Element, Host, Listen, h, Prop, State } from '@stencil/core';
import { createPopper } from '@popperjs/core';
import type { Placement, Instance } from '@popperjs/core';

@Component({
  tag: 'tds-popover-menu',
  styleUrl: 'popover-menu.scss',
  shadow: true,
})
export class TdsPopoverMenu {
  @Element() popoverMenuElement!: HTMLElement;

  /** The CSS-selector for an element that will trigger the pop-over */
  @Prop() selector: string = '';

  /** Element that will trigger the pop-over (takes priority over selector) */
  @Prop() referenceEl?: HTMLElement | null;

  /** Decides if the Popover Menu should be visible from the start */
  @Prop() show: boolean = false;

  /** Decides the placement of the Popover Menu */
  @Prop() placement: Placement = 'auto';

  /** Sets the offset skidding */
  @Prop() offsetSkidding: number = 0;

  /** Sets the offset distance */
  @Prop() offsetDistance: number = 8;

  @State() renderedShowValue: boolean = false;

  @State() popperInstance: Instance;

  @State() target: any;

  @Listen('mousedown', { target: 'window' })
  handleOutsideClick() {
    if (this.show) {
      this.show = false;
    }
  }

  componentDidLoad() {
    this.target = this.referenceEl ?? document.querySelector(this.selector);
    this.renderedShowValue = this.show;

    this.popperInstance = createPopper(this.target, this.popoverMenuElement, {
      strategy: 'fixed',
      placement: this.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [this.offsetSkidding, this.offsetDistance],
          },
        },
      ],
    });

    const showMenu = () => {
      this.show = true;
    };

    const hideMenu = () => {
      this.show = false;
    };

    this.target.addEventListener('mousedown', (event) => {
      event.stopPropagation();

      if (this.show) {
        hideMenu();
      } else {
        showMenu();
      }
    });

    this.popoverMenuElement.addEventListener('mousemove', (event) => {
      event.stopPropagation();
    });

    this.popoverMenuElement.addEventListener('mousedown', (event) => {
      event.stopPropagation();
    });
  }

  componentDidRender() {
    if (this.show && !this.renderedShowValue) {
      // Here we update the popper position since its position is wrong
      // before it is rendered.
      this.popperInstance.update();
    }
    this.renderedShowValue = this.show;
  }

  disconnectedCallback() {
    this.popperInstance?.destroy();
  }

  render() {
    return (
      <Host class={`tds-popover-menu ${this.show ? 'tds-popover-menu-show' : ''}`}>
        <slot></slot>
      </Host>
    );
  }
}
