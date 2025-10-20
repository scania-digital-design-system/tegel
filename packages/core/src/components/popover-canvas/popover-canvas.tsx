import { Component, Host, h, Prop, Element, Method, State } from '@stencil/core';
import type { Placement } from '@popperjs/core';
import { Attributes } from '../../types/Attributes';
import inheritAttributes from '../../utils/inheritAttributes';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the contents of the popover.
 */
@Component({
  tag: 'tds-popover-canvas',
  styleUrl: 'popover-canvas.scss',
  shadow: false, // Shadow false so you can put a global class directly on the element
  scoped: true,
})
export class TdsPopoverCanvas {
  @Element() host: HTMLTdsPopoverCanvasElement;

  /** The CSS-selector for an element that will trigger the Popover */
  @Prop() selector: string;

  /** Element that will trigger the Popover (takes priority over selector) */
  @Prop() referenceEl?: HTMLElement | null;

  /** Decides if the component should be visible from the start. */
  @Prop() defaultShow: boolean = false;

  /** Controls whether the Popover is shown or not. If this is set hiding and showing
   * will be decided by this prop and will need to be controlled from the outside. This
   * also means that clicking outside of the popover won't close it. Takes precedence over `defaultShow` prop.
   */
  @Prop() show: boolean = null;

  /** Decides the placement of the Popover Canvas. See https://popper.js.org/docs/v2/constructors/#placement */
  @Prop() placement: Placement = 'auto';

  /** Sets the offset skidding */
  @Prop() offsetSkidding: number = 0;

  /** Whether the popover should animate when being opened/closed or not */
  @Prop() animation: 'none' | 'fade' | string = 'none';

  /** Sets the offset distance */
  @Prop() offsetDistance: number = 8;

  /** Array of modifier objects to pass to popper.js. See https://popper.js.org/docs/v2/modifiers/ */
  @Prop() modifiers: object[] = [];

  /** Role of the popover canvas component. Can be either 'alertdialog' for important messages that require immediate attention, or 'dialog' for regular messages. */
  @Prop() tdsAlertDialog: 'alertdialog' | 'dialog' = 'dialog';

  /** Mode variant of the component, based on current mode. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

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
      <Host
        class={{
          [`tds-mode-variant-${this.modeVariant}`]: Boolean(this.modeVariant),
        }}
      >
        <tds-popover-core
          role={this.tdsAlertDialog}
          {...this.inheritedAttributes}
          class={{
            'tds-popover-canvas': true,
            [this.inheritedAttributes.class ?? '']: true,
          }}
          selector={this.selector}
          referenceEl={this.referenceEl}
          show={this.show}
          placement={this.placement}
          offsetSkidding={this.offsetSkidding}
          offsetDistance={this.offsetDistance}
          modifiers={this.modifiers}
          trigger={'click'}
          ref={(el) => {
            this.childRef = el;
          }}
          defaultShow={this.defaultShow}
          animation={this.animation}
        >
          <div>
            {/* (@stencil/core@3.3.0): This div is somehow needed to keep the slotted children in a predictable order */}
            <slot></slot>
          </div>
        </tds-popover-core>
      </Host>
    );
  }
}
