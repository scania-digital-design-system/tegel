import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { Placement } from '../../types/Tooltip';

@Component({
  tag: 'tds-tooltip-beta',
  styleUrl: 'tooltip-beta.scss',
  shadow: false, // Set shadow to false to allow global classes
  scoped: true,
})
export class TdsTooltipBeta {
  @Element() host: HTMLElement;

  @Prop() text: string = '';

  @Prop() selector: string;

  @Prop() referenceEl?: HTMLElement | null;

  @Prop() defaultShow: boolean = false;

  @Prop() mouseOverTooltip: boolean = false;

  @Prop() trigger: 'click' | 'hover' = 'hover';

  @Prop({ mutable: true }) show: boolean = null;

  @Prop() placement: Placement = 'bottom';

  @Prop() offsetSkidding: number = 0;

  @Prop() offsetDistance: number = 8;

  @State() isVisible: boolean = this.defaultShow;

  private tooltipEl: HTMLElement;

  private resizeObserver: ResizeObserver;

  componentDidLoad() {
    if (!this.referenceEl && this.selector) {
      this.referenceEl = document.querySelector(this.selector) as HTMLElement;
    }

    if (this.referenceEl) {
      this.bindEvents();
    }
  }

  connectedCallback() {
    this.resizeObserver = new ResizeObserver(() => this.updateTooltipPosition());
    if (this.referenceEl) {
      this.resizeObserver.observe(this.referenceEl);
    }
    window.addEventListener('resize', this.updateTooltipPosition);
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
    window.removeEventListener('resize', this.updateTooltipPosition);
  }

  private bindEvents() {
    if (this.trigger === 'hover') {
      this.referenceEl.addEventListener('mouseenter', this.showTooltip);
      this.referenceEl.addEventListener('mouseleave', this.hideTooltip);

      if (this.mouseOverTooltip) {
        this.tooltipEl?.addEventListener('mouseenter', this.showTooltip);
        this.tooltipEl?.addEventListener('mouseleave', this.hideTooltip);
      }
    } else if (this.trigger === 'click') {
      this.referenceEl.addEventListener('click', this.toggleTooltip);
    }
  }

  private debounce =
    (func: () => void, delay: number) =>
    (...args: any[]) => {
      let debounceTimer: NodeJS.Timeout;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };

  private showTooltip = this.debounce(() => {
    this.isVisible = true;
    this.updateTooltipPosition();
  }, 100);

  private hideTooltip = this.debounce(() => {
    this.isVisible = false;
  }, 100);

  private toggleTooltip = () => {
    this.isVisible = !this.isVisible;
    this.updateTooltipPosition();
  };

  private updateTooltipPosition() {
    if (!this.tooltipEl || !this.referenceEl) return;

    requestAnimationFrame(() => {
      const rect = this.referenceEl.getBoundingClientRect();

      const { height, width, bottom } = rect;
      let { top, left } = rect;

      switch (this.placement) {
        case 'top':
          top -= this.tooltipEl.offsetHeight + this.offsetDistance;
          left += width / 2 - this.tooltipEl.offsetWidth / 2;
          break;
        case 'bottom':
          top += height + this.offsetDistance;
          left += width / 2 - this.tooltipEl.offsetWidth / 2;
          break;
        case 'left':
          top += height / 2 - this.tooltipEl.offsetHeight / 2;
          left -= this.tooltipEl.offsetWidth + this.offsetDistance;
          break;
        case 'right':
          top += height / 2 - this.tooltipEl.offsetHeight / 2;
          left += width + this.offsetDistance;
          break;
        // Handle more complex placements like 'top-start', 'bottom-end', etc.
        default:
          top = bottom + this.offsetDistance;
          left = left + width / 2 - this.tooltipEl.offsetWidth / 2;
          break;
      }

      // Additional offsets
      left += this.offsetSkidding;
      this.tooltipEl.style.top = `${top}px`;
      this.tooltipEl.style.left = `${left}px`;
    });
  }

  private setTooltipRef = (element: HTMLElement) => {
    this.tooltipEl = element;
  };

  render() {
    return (
      <Host>
        <div
          class={{
            'tds-tooltip': true,
            'tds-tooltip-show': this.isVisible,
          }}
          ref={this.setTooltipRef}
        >
          {this.text}
          <slot></slot>
        </div>
      </Host>
    );
  }
}
