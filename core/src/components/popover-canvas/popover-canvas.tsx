import { Component, Host, h, Prop, Element } from '@stencil/core';
import type { Placement } from '@popperjs/core';
import { Attributes, inheritAttributes } from '../../utils/utils';

@Component({
  tag: 'tds-popover-canvas',
  styleUrl: 'popover-canvas.scss',
  shadow: false,
  scoped: true,
})
export class TdsPopoverCanvas {
  @Element() host: HTMLTdsPopoverCanvasElement;

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

  inheritedAttributes: Attributes = [];

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.host, ['style', 'class']);
  }

  render() {
    return (
      <Host>
        <tds-core-popover
          {...this.inheritedAttributes}
          class={`tds-popover-canvas ${this.inheritedAttributes.class}`}
          selector={this.selector}
          referenceEl={this.referenceEl}
          show={this.show}
          placement={this.placement}
          offsetSkidding={this.offsetSkidding}
          offsetDistance={this.offsetDistance}
          modifiers={this.modifiers}
          trigger={'click'}
        >
          <slot></slot>
        </tds-core-popover>
      </Host>
    );
  }
}
