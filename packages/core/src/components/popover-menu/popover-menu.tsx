import { Component, Host, h, Prop, Element, Listen } from '@stencil/core';
import type { Placement } from '@popperjs/core';
import { Attributes } from '../../types/Attributes';
import inheritAttributes from '../../utils/inheritAttributes';

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

  /** Controls whether the Popover is shown or not. If this is set hiding and showing
   * will be decided by this prop and will need to be controlled from the outside. This
   * also means that clicking outside of the popover won't close it.
   */
  @Prop() show: boolean = null;

  /** Decides the placement of the Popover Menu */
  @Prop() placement: Placement = 'auto';

  /** Sets the offset skidding */
  @Prop() offsetSkidding: number = 0;

  /** Sets the offset distance */
  @Prop() offsetDistance: number = 8;

  /** If true this unsets the width (160px) of the Popover Menu */
  @Prop() fluidWidth: boolean = false;

  // eslint-disable-next-line class-methods-use-this
  @Listen('internalTdsShow')
  handleInternalTdsShow(e: CustomEvent<void>) {
    e.stopPropagation();
  }

  // eslint-disable-next-line class-methods-use-this
  @Listen('internalTdsHide')
  handleInternalTdsHide(e: CustomEvent<void>) {
    e.stopPropagation();
  }

  inheritedAttributes: Attributes = [];

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.host, ['style', 'class']);
  }

  render() {
    return (
      <Host>
        <tds-popover-core
          class={{
            'tds-popover-menu': true,
            [this.inheritedAttributes.class ?? '']: true,
            'fluid-width': this.fluidWidth,
          }}
          selector={this.selector}
          referenceEl={this.referenceEl}
          show={this.show}
          placement={this.placement}
          offsetSkidding={this.offsetSkidding}
          offsetDistance={this.offsetDistance}
        >
          <div role="list">
            <slot></slot>
          </div>
        </tds-popover-core>
      </Host>
    );
  }
}
