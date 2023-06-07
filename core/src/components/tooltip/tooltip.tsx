import { Component, h, Prop, State, Method } from '@stencil/core';
import { createPopper } from '@popperjs/core';
import type { Placement, Instance } from '@popperjs/core';

@Component({
  tag: 'tds-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true,
})
export class TdsTooltip {
  /** In case Tooltip contains only text, no HTML, a text can be passed by this prop */
  @Prop() text: string = '';

  /** The CSS-selector for an element that will trigger the Tooltip */
  @Prop() selector: string = '';

  /** Element that will trigger the Tooltip (takes priority over selector) */
  @Prop() referenceEl: HTMLElement;

  /** Allow mouse over Tooltip. Useful when Tooltip contains clickable elements like link or button. */
  @Prop() mouseOverTooltip: boolean = false;

  /** Prop in control of showing and hiding prop */
  @Prop({ mutable: true }) show: boolean = false;

  /** Placement of Tooltip. */
  @Prop() placement: Placement = 'bottom';

  @State() popperInstance: Instance;

  @State() target: any;

  /** Method to update the Tooltip. Will reevaluate the Tooltips position. */
  @Method()
  async updateTooltip() {
    this.popperInstance?.update();
  }

  border: string;

  offsetSkidding: number = 0;

  offsetDistance: number = 8;

  tooltip!: HTMLInputElement;

  componentDidLoad() {
    this.target = this.referenceEl ?? document.querySelector(this.selector);

    const thisValue = this;
    this.popperInstance = createPopper(this.target, this.tooltip, {
      placement: thisValue.placement,
      modifiers: [
        {
          name: 'positionCalc',
          enabled: true,
          phase: 'main',
          fn({ state }) {
            if (state.placement === 'bottom-start' || state.placement === 'right-start') {
              thisValue.border = 'top-left';
            } else if (state.placement === 'bottom-end' || state.placement === 'left-start') {
              thisValue.border = 'top-right';
            } else if (state.placement === 'top-end' || state.placement === 'left-end') {
              thisValue.border = 'bottom-right';
            } else if (state.placement === 'top-start' || state.placement === 'right-end') {
              thisValue.border = 'bottom-left';
            } else if (state.placement === 'bottom' || state.placement === 'top') {
              thisValue.border = 'default';
            }
          },
        },
        {
          name: 'offset',
          options: {
            offset: [this.offsetSkidding, this.offsetDistance],
          },
        },
      ],
    });

    const showTooltip = () => {
      this.show = true;
    };

    const hideTooltip = () => {
      this.show = false;
    };

    // For tabbing over element
    this.target.addEventListener('focusin', () => {
      showTooltip();
    });

    this.target.addEventListener('focusout', () => {
      hideTooltip();
    });

    // For hovering over element with selector
    this.target.addEventListener('mouseenter', () => {
      showTooltip();
    });

    this.target.addEventListener('mouseleave', () => {
      hideTooltip();
    });

    // For hovering over Tooltip itself:
    if (this.mouseOverTooltip === true) {
      this.tooltip.addEventListener('mouseenter', () => {
        showTooltip();
      });

      this.tooltip.addEventListener('mouseleave', () => {
        hideTooltip();
      });
    }
  }

  disconnectedCallback() {
    this.popperInstance?.destroy();
  }

  /* Slot on line 118 is added to support adding HTML elements to component */
  render() {
    return (
      <span
        ref={(el) => {
          this.tooltip = el as HTMLInputElement;
        }}
        class={`tds-tooltip tds-tooltip-${this.border} ${this.show ? 'tds-tooltip-show' : ''}`}
      >
        {this.text}
        <slot />
      </span>
    );
  }
}
