import { Component, h, Host, Prop } from '@stencil/core';
import type { Placement } from '@popperjs/core';

@Component({
  tag: 'tds-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: false,
  scoped: true,
})
export class TdsTooltip {
  /** In case Tooltip contains only text, no HTML, a text can be passed by this prop */
  @Prop() text: string = '';

  /** The CSS-selector for an element that will trigger the Tooltip */
  @Prop() selector: string = '';

  /** Element that will trigger the Tooltip (takes priority over selector) */
  @Prop() referenceEl?: HTMLElement | null;

  /** Allow mouse over Tooltip. Useful when Tooltip contains clickable elements like link or button. */
  @Prop() mouseOverTooltip: boolean = false;

  /** Prop in control of showing and hiding prop */
  @Prop({ mutable: true }) show: boolean = false;

  /** Placement of Tooltip. */
  @Prop() placement: Placement = 'bottom';

  border: string;

  offsetSkidding: number = 0;

  offsetDistance: number = 8;

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

  render() {
    return (
      <Host>
        <tds-core-popover
          class={`tds-tooltip tds-tooltip-${this.border} ${this.show ? 'tds-tooltip-show' : ''}`}
          selector={this.selector}
          referenceEl={this.referenceEl}
          trigger={this.mouseOverTooltip ? 'hover-popover' : 'hover'}
          modifiers={this.popperjsExtraModifiers}
          show={this.show}
          placement={this.placement}
        >
          {this.text}
          {/* Slot is added to support adding HTML elements to component */}
          <slot />
        </tds-core-popover>
      </Host>
    );
  }
}
