import { Component, Host, h, Prop, Element, State, Method } from '@stencil/core';
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
  @Prop() selector: string;

  /** Element that will trigger the pop-over (takes priority over selector) */
  @Prop() referenceEl?: HTMLElement | null;

  /** Controls whether the Popover is shown or not. If this is set hiding and showing
   * will be decided by this prop and will need to be controlled from the outside. This
   * also means that clicking outside of the popover won't close it. Takes precedence over `defaultShow` prop.
   */
  @Prop() show: boolean = null;

  /** Decides if the component should be visible from the start. */
  @Prop() defaultShow: boolean = false;

  /** Decides the placement of the Popover Menu */
  @Prop() placement: Placement = 'auto';

  /** Whether the popover should animate when being opened/closed or not */
  @Prop() animation: 'none' | 'fade' | string = 'none';

  /** Sets the offset skidding */
  @Prop() offsetSkidding: number = 0;

  /** Sets the offset distance */
  @Prop() offsetDistance: number = 8;

  /** If true this unsets the width (160px) of the Popover Menu */
  @Prop() fluidWidth: boolean = false;

  /** Property for closing popover programmatically */
  @Method() async close() {
    this.childRef?.close();
  }

  @State() childRef?: HTMLTdsPopoverCoreElement;

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
          ref={(el) => {
            this.childRef = el;
          }}
          defaultShow={this.defaultShow}
          animation={this.animation}
        >
          <div role="menu">
            <slot></slot>
          </div>
        </tds-popover-core>
      </Host>
    );
  }
}
