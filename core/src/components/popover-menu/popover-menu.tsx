import { Component, Host, h, Prop, Element } from '@stencil/core';
import type { Placement } from '@popperjs/core';
import { Attributes, inheritAttributes } from '../../utils/utils';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the list of menu items.
 */
@Component({
  tag: 'tds-popover-menu',
  styleUrl: 'popover-menu.scss',
  shadow: false, // Shadow false so you can put a global class directly on the element
  scoped: true,
})
export class TdsPopoverMenu {
  @Element() host: HTMLTdsPopoverMenuElement;

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

  inheritedAttributes: Attributes = [];

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.host, ['style', 'class']);
  }

  render() {
    return (
      <Host>
        <tds-core-popover
          class={{
            'tds-popover-menu': true,
            [this.inheritedAttributes.class ?? '']: true,
          }}
          selector={this.selector}
          referenceEl={this.referenceEl}
          show={this.show}
          placement={this.placement}
          offsetSkidding={this.offsetSkidding}
          offsetDistance={this.offsetDistance}
        >
          <slot></slot>
        </tds-core-popover>
      </Host>
    );
  }
}
