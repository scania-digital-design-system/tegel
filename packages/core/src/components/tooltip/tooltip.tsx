import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';
import type { Placement } from '@popperjs/core';
import { Attributes } from '../../types/Attributes';
import inheritAttributes from '../../utils/inheritAttributes';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the tooltip contents.
 */
@Component({
  tag: 'tds-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: false, // Shadow false so you can put a global class directly on the element
  scoped: true,
})
export class TdsTooltip {
  @Element() host: HTMLTdsTooltipElement;

  /** In case Tooltip contains only text, no HTML, a text can be passed by this prop */
  @Prop() text: string = '';

  /** The CSS-selector for an element that will trigger the Tooltip */
  @Prop() selector: string;

  /** Element that will trigger the Tooltip (takes priority over selector) */
  @Prop() referenceEl?: HTMLElement | null;

  /** Decides if the component should be visible from the start. */
  @Prop() defaultShow: boolean = false;

  /** Allow mouse over Tooltip. Useful when Tooltip contains clickable elements like link or button. */
  @Prop() mouseOverTooltip: boolean = false;

  /** What triggers the popover to show */
  @Prop() trigger: 'click' | 'hover' = 'hover';

  /** Prop in control of showing and hiding prop. Takes precedence over `defaultOpen` prop. */
  @Prop({ mutable: true }) show: boolean = null;

  /** Placement of Tooltip. */
  @Prop() placement: Placement = 'bottom';

  /** Sets the offset skidding */
  @Prop() offsetSkidding: number = 0;

  /** Sets the offset distance */
  @Prop() offsetDistance: number = 8;

  /** Sets the aria-describedby attribute */
  @Prop() tdsAriaDescribedby: string;

  @Listen('keydown', { target: 'window' })
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.show) {
      this.show = false;
    }
  }

  border: string;

  popperjsExtraModifiers = [
    {
      name: 'positionCalc',
      enabled: true,
      phase: 'main',

      fn: ({ state }) => {
        if (state.placement === 'bottom-start' || state.placement === 'right-start') {
          this.border = 'top-left';
        } else if (state.placement === 'bottom-end' || state.placement === 'left-start') {
          this.border = 'top-right';
        } else if (state.placement === 'top-end' || state.placement === 'left-end') {
          this.border = 'bottom-right';
        } else if (state.placement === 'top-start' || state.placement === 'right-end') {
          this.border = 'bottom-left';
        } else if (state.placement === 'bottom' || state.placement === 'top') {
          this.border = 'default';
        }
      },
    },
  ];

  inheritedAttributes: Attributes = [];

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.host, ['style', 'class']);
  }

  determineTrigger() {
    if (this.trigger === 'hover') {
      return this.mouseOverTooltip ? 'hover-popover' : 'hover';
    }
    return this.trigger;
  }

  render() {
    return (
      <Host role="tooltip" aria-describedby={this.tdsAriaDescribedby} aria-label={this.text}>
        <tds-popover-core
          {...this.inheritedAttributes}
          class={{
            'tds-tooltip': true,
            [`tds-tooltip-${this.border}`]: true,
            [this.inheritedAttributes.class ?? '']: true,
            'tds-tooltip-show': this.show,
          }}
          selector={this.selector}
          referenceEl={this.referenceEl}
          trigger={this.determineTrigger()}
          modifiers={this.popperjsExtraModifiers}
          offsetSkidding={this.offsetSkidding}
          offsetDistance={this.offsetDistance}
          show={this.show}
          placement={this.placement}
          autoHide={false}
          // @ts-ignore
          onInternalTdsShow={() => {
            this.show = true;
          }}
          // @ts-ignore
          onInternalTdsClose={() => {
            this.show = false;
          }}
          defaultShow={this.defaultShow}
        >
          {this.text}
          {/* Slot is added to support adding HTML elements to component */}
          <slot></slot>
        </tds-popover-core>
      </Host>
    );
  }
}
